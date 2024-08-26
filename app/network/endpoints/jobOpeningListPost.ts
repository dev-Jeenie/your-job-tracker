import { UrlItem } from "@/app/list/page";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { serverInstance, serverResponseHandler } from "../common/server";

const postNewJobLink = (data: UrlItem) =>
  serverInstance
    .post(`/list`, data)
    .then(serverResponseHandler<unknown>)
    .then((res) => res);

export const useAddNewJob = (
  props?: MutationOptions<unknown, unknown, UrlItem>
) => {
  return useMutation({
    mutationFn: postNewJobLink,
    ...props,
  });
};
