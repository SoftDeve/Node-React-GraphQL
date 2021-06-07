import {gql} from '@apollo/client';
export const LOAD_EMPLOYEES= gql `
{
    employees {
      id
      location
      name
      designation
    }
  }
  
`