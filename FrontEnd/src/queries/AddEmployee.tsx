import { gql } from "@apollo/client";
export const CREATE_EMPLOYEE = gql`
  mutation addEmployee(
    $id: ID!
    $name: String!
    $location: String!
    $designation: String!
  ) {
    addEmployee(
      id: $id
      name: $name
      location: $location
      designation: $designation
    ) {
      id
      name
      location
      designation
    }
  }
`;
