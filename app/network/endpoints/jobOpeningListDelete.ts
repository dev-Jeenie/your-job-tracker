import { MutationOptions, useMutation } from "@tanstack/react-query";
import { serverInstance } from "../common/server";
import { UrlItem } from "@/app/list/page";

const deleteJobLink = async (id: UrlItem["id"]) => {
  console.log("id", id);
  return serverInstance.delete(`list/${id}`);
};

export const useDeleteJobLink = (
  props?: MutationOptions<unknown, unknown, UrlItem["id"]>
) => {
  return useMutation({
    mutationFn: (id: UrlItem["id"]) => deleteJobLink(id),
    ...props,
  });
};
