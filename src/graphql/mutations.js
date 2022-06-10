/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      email
      createdAt
      updatedAt
    }
  }
`;
export const createShortcut = /* GraphQL */ `
  mutation CreateShortcut(
    $input: CreateShortcutInput!
    $condition: ModelShortcutConditionInput
  ) {
    createShortcut(input: $input, condition: $condition) {
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
export const updateShortcut = /* GraphQL */ `
  mutation UpdateShortcut(
    $input: UpdateShortcutInput!
    $condition: ModelShortcutConditionInput
  ) {
    updateShortcut(input: $input, condition: $condition) {
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
export const deleteShortcut = /* GraphQL */ `
  mutation DeleteShortcut(
    $input: DeleteShortcutInput!
    $condition: ModelShortcutConditionInput
  ) {
    deleteShortcut(input: $input, condition: $condition) {
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
