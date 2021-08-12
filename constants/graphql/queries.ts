import { gql } from '@apollo/client';
import { PRODUCT_CONNECTION_FRAGMENT } from './fragments';

export const GET_CURRENT_USER = gql`
  query currentUser {
    me {
      id
    }
  }
`;

export const GET_PRODUCTS = gql`
  ${PRODUCT_CONNECTION_FRAGMENT}

  query products(
    $first: Int
    $after: Binary
    $last: Int
    $before: Binary
    $filter: ProductsFilter
    $sort: ProductSortInput
  ) {
    products(first: $first, after: $after, last: $last, before: $before, filter: $filter, sort: $sort) {
      ...ProductConnectionFields
    }
  }
`;

export const GET_PRODUCTS_AND_USER = gql`
  ${PRODUCT_CONNECTION_FRAGMENT}

  query products(
    $first: Int
    $after: Binary
    $last: Int
    $before: Binary
    $filter: ProductsFilter
    $sort: ProductSortInput
  ) {
    me {
      id
    }
    products(first: $first, after: $after, last: $last, before: $before, filter: $filter, sort: $sort) {
      ...ProductConnectionFields
    }
  }
`;
