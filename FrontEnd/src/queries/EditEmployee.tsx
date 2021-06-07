import { gql } from "@apollo/client";
export const EDIT_EMPLOYEE = gql`
  mutation editEmployee(
    $id: ID!
    $name: String!
    $location: String!
    $designation: String!
  ) {
    editEmployee(
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
