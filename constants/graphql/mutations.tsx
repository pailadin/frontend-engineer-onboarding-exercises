import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation authenticate($input: AuthenticateInput!) {
    authenticate(input: $input) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      token
    }
  }
`;
