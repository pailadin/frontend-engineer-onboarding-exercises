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
    # TEMP Awaiting info, so for now fetching ALL
    $first: Int = 9001
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
