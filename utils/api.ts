import {
  DocumentNode,
  OperationVariables,
  QueryResult,
  TypedDocumentNode,
  useLazyQuery as useLazyQueryBase,
  useMutation,
  useQuery as useQueryBase,
} from '@apollo/client';
import { NextApiRequest } from 'next';

interface CacheFlag {
  inCache?: boolean;
}

interface QueryResultWithCacheFlag extends QueryResult, CacheFlag {}

// type LazyQueryResultWithCacheFlag = [
//   (...args: unknown[]) => unknown,
//   QueryResultWithCacheFlag,
// ]

// Should act the same as the regular "useQuery", but with an extra flag
// "inCache" for cases where we are waiting for a new response but we have old data to show:
export const useQuery = (
  query: DocumentNode | TypedDocumentNode,
  options: OperationVariables = {}
): QueryResultWithCacheFlag => {
  const result = useQueryBase(query, {
    notifyOnNetworkStatusChange: true,
    ...options,
  });

  return {
    ...result,
    inCache: checkIfInCache(query, result),
  };
};

// Not fully working with TS
// export const useLazyQuery = (
//   query: DocumentNode | TypedDocumentNode,
//   options: OperationVariables = {}
// ): LazyQueryResultWithCacheFlag => {
//   const [getData, result] = useLazyQueryBase(query, {
//     notifyOnNetworkStatusChange: true,
//     ...options,
//   });

//   if (result.client) {
//     return [
//       getData,
//       {
//         ...result,
//         inCache: checkIfInCache(query, result),
//       },
//     ]
//   } else {
//     return [getData, result];
//   }
// }

export { useMutation, useLazyQueryBase as useLazyQuery }; // just to we can do something like "import { useQuery, useMutation } from '@utils/api"

const checkIfInCache = (query: DocumentNode | TypedDocumentNode, result: QueryResult): boolean => {
  try {
    const read = result.client.readQuery({ query, variables: result.variables });
    // console.log({ query, read: { ...read } });

    return Boolean(read);
  } catch (error) {}

  return false;
};

// Unused currently, was used in pages/api:
export const getBodyFromReq = (req: NextApiRequest): Record<string, unknown> => {
  try {
    if (req.method === 'POST') {
      return JSON.parse(req.body);
    }
  } catch (e) {}

  return {};
};
