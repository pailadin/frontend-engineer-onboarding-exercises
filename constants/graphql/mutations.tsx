import { gql } from '@apollo/client';
import { PRODUCT_FRAGMENT } from './fragments';

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

export const PRODUCT_ADD = gql`
  ${PRODUCT_FRAGMENT}

  mutation createProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      ...ProductFields
    }
  }
`;
