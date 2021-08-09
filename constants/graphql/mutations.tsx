import { gql } from '@apollo/client';

export const SIGNUP = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      token
    }
  }
`;
