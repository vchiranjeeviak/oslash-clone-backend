/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($username: String) {
    onCreateUser(username: $username) {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($username: String) {
    onUpdateUser(username: $username) {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($username: String) {
    onDeleteUser(username: $username) {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`;
export const onCreateShortcut = /* GraphQL */ `
  subscription OnCreateShortcut($username: String) {
    onCreateShortcut(username: $username) {
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
export const onUpdateShortcut = /* GraphQL */ `
  subscription OnUpdateShortcut($username: String) {
    onUpdateShortcut(username: $username) {
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
export const onDeleteShortcut = /* GraphQL */ `
  subscription OnDeleteShortcut($username: String) {
    onDeleteShortcut(username: $username) {
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
