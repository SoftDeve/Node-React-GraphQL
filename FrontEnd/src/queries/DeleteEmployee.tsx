import { gql } from "@apollo/client";
export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
      name
      location
      designation
    }
  }
`;
