var aws = require("aws-sdk");
var ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
  let date = new Date(); // Creating a new data object

  if (event.request.userAttributes.sub) {
    // If we can find ID in the event request and ID is labelled as sub, only then we proceed to add user to user table in DB

    let params = {
      // Creating the object to insert
      Item: {
        id: { S: event.request.userAttributes.sub },
        __typename: { S: "User" },
        username: { S: event.userName },
        email: { S: event.request.userAttributes.email },
        createdAt: { S: date.toISOString() },
      },
      TableName: process.env.USERTABLE, // Table name is set to users table as an environment variable in AWS console
    };

    try {
      // Try putting item into DB

      await ddb.putItem(params).promise();
      console.log("Success");
    } catch (error) {
      // If got error while putting item into DB

      console.log("Error", error);
    }

    context.done(null, event);
  } else {
    console.log("Error");
    context.done(null, event);
  }
};
