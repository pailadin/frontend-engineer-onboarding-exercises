import { gql } from '@apollo/client';

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFields on Product {
    id
    name
    description
    owner {
      id
      firstname
      lastname
      emailAddress
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
`;

export const PRODUCT_CONNECTION_FRAGMENT = gql`
  ${PRODUCT_FRAGMENT}

  fragment ProductConnectionFields on ProductConnection {
    edges {
      node {
        ...ProductFields
      }
    }
  }
`;
