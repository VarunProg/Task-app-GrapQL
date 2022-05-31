/* eslint-disable */

import {
  ValueTypes,
  GraphQLTypes,
  InputType,
  Chain,
  OperationOptions,
  chainOptions,
} from "./index";
import { useMutation, useQuery } from "react-query";
import type { UseMutationOptions, UseQueryOptions } from "react-query";
import { API_URL, fetchOptions } from "../config";

// post and put req kind of
export function useTypedMutation<
  O extends "Mutation",
  TData extends ValueTypes[O],
  TResult = InputType<GraphQLTypes[O], TData>
>(
  mutationKey: string | unknown[],
  mutation: TData | ValueTypes[O],
  options?: Omit<UseMutationOptions<TResult>, "mutationKey" | "mutationFn">,
  zeusOptions?: OperationOptions,
  host = API_URL,
  hostOptions: chainOptions[1] = fetchOptions
) {
  return useMutation<TResult>(
    mutationKey,
    () =>
      Chain(host, hostOptions)("mutation")(
        mutation,
        zeusOptions
      ) as Promise<TResult>,
    options
  );
}
// GET REQUEST kind of
export function useTypedQuery<
  O extends "Query",
  TData extends ValueTypes[O],
  TResult = InputType<GraphQLTypes[O], TData>
>(
  queryKey: string | unknown[],
  query: TData | ValueTypes[O],
  options?: Omit<UseQueryOptions<TResult>, "queryKey" | "queryFn">,
  zeusOptions?: OperationOptions,
  // TODO: Update the config accordingly
  host = API_URL,
  hostOptions: chainOptions[1] = fetchOptions
) {
  return useQuery<TResult>(
    queryKey,
    () =>
      Chain(host, hostOptions)("query")(query, zeusOptions) as Promise<TResult>,
    options
  );
}
