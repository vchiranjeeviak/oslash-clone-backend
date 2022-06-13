# oslash-clone-backend

## Design Choices

 ### 1. API server
    
   Options available: gRPC, GraphQL, RestAPI
   
   Chosen option: GraphQL

 #### Reasons:
   - gRPC is an ideal  option if we are designing microservices. Our task is not as large and separable to split it into microservices.
   
   - RestAPIs are good to have if the output format is going to be the same for every request. It constraints on having multiple endpoints for multiple pieces of data and combines them to have a complex response from the API.
   
   - GraphQL provides the flexibilty to have a single API endpoint and still have the response in whatever form the client specifies.

   So, we go ahead with GraphQL API architecture.


### 2. Database
   Options available: Relational databases, NoSQL databases
   
   Chosen option: NoSQL (DynamoDB)

#### Reason: 

   - Since the schema of the data is going to be complex with many number of shortcuts to a user and attributes which are inconsistent with each shortcut, it is ideal to use a NoSQL database.

   - There are multiple options for NoSQL databases like MongoDB, DynamoDB etc.
    
   - The main reason to choose DynamoDB is its ability to scale due to the advantage of being on cloud. There are near to zero chances to have performance issues due to increase in data in case of DynamoDB.

  So, we go ahead with the DynamoDB database.

 ### 3. Backend Infrastructure
   Options available: server, serverless
   
   Chosen option: serverless

 #### Reason: 
   - We know the risks involved with having physical servers during downtime or any other issue.
   - It's better not to worry about one less thing by using serverless architecture.
   - Serverless is also cost effective when compared to having physical servers.
   - Most of all, the database DynamoDB combines well with the serverless infrastructure provider like AWS.

  So, we go ahead with Serverless infrastructure.

 ### 4. Backend Framework
   Options available: Serverless framework, Amplify framework
   
   Chosen option: Amplify framework

 #### Reason: 
   - Instead of writing entire backend code using pure GraphQL is a hectic time consuming task.
   
   - It's recommended to use a framework which reduces our work to a great extent by providing abstraction which can be controlled if required.
   
   - Reason behind choosing Amplify over Serverless is its less complexity. Amplify provides a lot of features out of the box through its Command Line Interface (CLI) which makes the development process faster.
   
   - Serverless consumes a lot of time even at the stage of configuration as we have to configure everything using YAML.
   
   - Amplify being the product of AWS, it integrates well with the other parts of our infrastructure.

  So, we go ahead with the Amplify framework.
    
 ### 5. Authentication mechanism
   Options available: API_KEY, JWT auth and refresh tokens, AWS Cognito.
   
   Chosen option: AWS Cognito

 #### Reason: 
   - API_KEY method of authentication is provided by the Amplify framework out of the box. But it is not safe to use for protected routes. It can be used for accessing the API without needing to be signed in.
   
   - We can create a JWT auth token whenever a user signs in and store it in the database and keep sending the refresh tokens to the client at regular intervals. This method is actually considered as secure and efficient when compared to other techniques like sessions.
   
   - But using JWT is hard to implement especially in GraphQL implementation and for that we need to use subscriptions to keep sending refresh tokens at every interval. It is easier in the case of RestAPI to implement JWT when compared to GraphQL.
   
   - Amplify under the hood of AWS provides an option called Cognito which performs the above mentioned JWT process on its own. We just need to include it in our backend. This makes our system secure.

So, we go ahead with the Cognito authentication.


  ### 6.	Tables design
   
   - Two tables are chosen in which one stores the user data and other stores the shortcuts data.
		
		User table:
     - ID
     - Username : String
     - Email : AWSEmail
     - createdAt : AWSDateTime

   - Cognito pool takes the user details originally. We wrote a special lambda trigger function which triggers post-confirmation (post - signup). This trigger function automatically populates these fields in the user table whenever a new user is signed up and details come into the Cognito user pool.

		Shortcuts table:
     - ID
     - UserID : String (primary)
     - shortlink (unique for each user) : String (SortKey)
     - url (according to URL standards) : AWSURL (SortKey)
     - description : String (SortKey)
     - tags : [String]
     - createdAt : AWSDateTime

   - To make sure a shortlink is unique for each user, the primary key for the shortcuts table is (userID, shortlink, url, description). A primary key should be unique for a table. Here, userID is the partition key and shortlink, description, url are the sort keys.


 ## Testing the GraphQL API:

API : https://3s2uxxjywfgb5lrzoes2frlqaa.appsync-api.ap-south-1.amazonaws.com/graphql 

Tool: Postman

Authorization configuration:
In postman, after going into the “Authorization” tab, we need to add some details so that it can access the AWS cognito pool. Please do set the below configuration in your postman before testing.

Type: OAuth 2.0

Add authorization data to: Request headers

Header Prefix: None/Empty

Token name: Any name

Grant Type: Implicit

Callback URL: https://oauth.pstmn.io/v1/callback

Uncheck “Authorize using browser” option

Auth URL: https://oslashclonebackend.auth.ap-south-1.amazoncognito.com/login

Client ID: 170im5cvl7gteh47nlfi2895le

Scope: phone email openid profile aws.cognito.signin.user.admin

Client Authentication: Send client credentials in body
 
After setting all these details, on clicking the “Get new access token” button, a new window is opened which lets us sign in. Use below test credentials for this.

Test account username: chiru

Test account password: test@123

Test account id: 2d52a21c-b5d7-4b8a-8664-4e6fa51c2ce2

Other account id for testing: 23dc60c9-0e29-4072-982e-8eccfa80da2f

After logging in, it shows two tokens namely “access token” and “id_token”. Copy “id_token” from there and paste it in the “Access token” field in the Authorization tab.

### Getting user details

#### Query: Pass id as argument since id is the primary key of User table and specify the attributes we want in the response

```
query MyQuery {
  getUser(id: "b611da00-cab5-4f90-a1e3-8d6fd68e697d") {
    id
    email
    username
    createdAt
  }
}
```

#### Response: Trying to get other user (user who is not logged in) details would result in error for this query.

```
{
  "data": {
    "getUser": {
      "id": "b611da00-cab5-4f90-a1e3-8d6fd68e697d",
      "email": "chiru.tirunagari@gmail.com",
      "username": "chiru"
      "createdAt": "2022-06-10T17:51:57.278Z"
    }
  }
}
```

### Creating a shortcut

#### Query: Passing userID, url, shortlink and description is must since they all form the primary key for Shortcuts table.

```
mutation MyMutation {
  createShortcut (input: userID: "b611da00-cab5-4190-ale3-8d6fd68e697d", url: "https://www.youtube.com, shortlink: "ytube", description: "A shortcut to open youtube", tags: ["entertainment"])) {
    id
    shortlink
  }
}
```

#### Response: Would return an error if used repeated shortlink name for a user. Using repeated shortlink name for other users is valid.

```
{
  "data": {
    "createShortcut": {
    "id": "e5383e63-d15c-4111-8325-c68135438f4e",
    "shortlink": "ytube"
    }
  }
}
```

### Listing all shortcuts of a user

#### Query: We can also apply sorting on an attribute by using sort direction.

```
query MyQuery {
  listShortcuts (userID: "2d52a21c-b5d7-4b8a-8664-4e6fa51c2ce2"){
    items{
      id
      shortlink
      description
      url
      tags
    }
  }
}
```

#### Response

```
{
  "data": {
    "listShortcuts": {
      "items": [
        {
          "id": 
}
```

### Deleting a shortcut

#### Query: Need to pass all these arguments as they all are sort keys.

```
mutation MyMutation {
  deleteShortcut(input: {userID: "2d52a21c-b5d7-4b8a-8664-4e6fa51c2ce2", url: "https://www.google.com", shortlink: "google", description: "A shortcut for google"}) {
    id
    shortlink
    url
    description
  }
}
```

#### Response

```
{
  "data": {
    "deleteShortcut": {
      "id": "2d52a21c-b5d7-4b8a-8664-4e6fa51c2ce2",
      "shortlink": "google",
      "url": "https://www.google.com",
      "description": "A shortcut for google",
    }
  }
}
```

### Searching for a shortcut

#### Query: We are searching in description in the below example. Similarly we can search in shortlink, url by replacing description with them in below code

```
query MyQuery {
  searchShortcuts(filter: {description: {matchPhrasePrefix: "you"}}) {
    items {
      id
      shortlink
      url
      description
    }
  }
}
```

#### Response

```
{
    "data": {
        "searchShortcuts": {
            "items": [
                {
                    "id": "cdf94a7f-2992-43ea-9111-5efa38e79df1",
                    "shortlink": "utube",
                    "url": "https://www.youtube.com",
                    "description": "A shortcut for youtube"
                }
            ]
        }
    }
}
```
