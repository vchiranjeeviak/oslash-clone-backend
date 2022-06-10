/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchShortcuts = /* GraphQL */ `
  query SearchShortcuts(
    $filter: SearchableShortcutFilterInput
    $sort: [SearchableShortcutSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableShortcutAggregationInput]
  ) {
    searchShortcuts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        userID
        shortlink
        url
        description
        tags
        createdAt
        updatedAt
        username
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getShortcut = /* GraphQL */ `
  query GetShortcut(
    $userID: String!
    $shortlink: String!
    $url: AWSURL!
    $description: String!
  ) {
    getShortcut(
      userID: $userID
      shortlink: $shortlink
      url: $url
      description: $description
    ) {
      id
      userID
      shortlink
      url
      description
      tags
      createdAt
      updatedAt
      username
    }
  }
`;
export const listShortcuts = /* GraphQL */ `
  query ListShortcuts(
    $userID: String
    $shortlinkUrlDescription: ModelShortcutPrimaryCompositeKeyConditionInput
    $filter: ModelShortcutFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listShortcuts(
      userID: $userID
      shortlinkUrlDescription: $shortlinkUrlDescription
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        userID
        shortlink
        url
        description
        tags
        createdAt
        updatedAt
        username
      }
      nextToken
    }
  }
`;
