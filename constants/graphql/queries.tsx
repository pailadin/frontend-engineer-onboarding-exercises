import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query products(
    $first: Int
    $after: Binary
    $last: Int
    $before: Binary
    $filter: ProductsFilter
    $sort: ProductSortInput
  ) {
    products(first: $first, after: $after, last: $last, before: $before, filter: $filter, sort: $sort) {
      edges {
        node {
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
      }
    }
  }
`;

// A version of the "products" query with all the fields
// Going to fetch as little as I need, but handy having a reference here
// as some of these might be needed later on
// TODO Remove commented out code when feels safe to do so:
// export const GET_PRODUCTS = gql`
//   query products(
//   $first: Int
//   $after: Binary
//   $last: Int
//   $before: Binary
//   $filter: ProductsFilter
//   $sort: ProductSortInput
// ) {
//     products(
//       first: $first
//       after: $after
//       last: $last
//       before: $before
//       filter: $filter
//       sort: $sort
//     ) {
//       edges {
//         cursor
//         node {
//           id
//           name
//           description
//           owner {
//             id
//             firstname
//             lastname
//             emailAddress
//             createdAt
//             updatedAt
//           }
//           createdAt
//           updatedAt
//         }
//       }
//     	pageInfo {
//         hasNextPage
//         hasPreviousPage
//         startCursor
//         endCursor
//       }
//     }
//   }
// `
