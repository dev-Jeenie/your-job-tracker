import { MutationOptions, useMutation } from "@tanstack/react-query";
import { serverInstance } from "../common/server";
import { JobPosting } from "@/app/list/page";

const deleteJobLink = async (id: JobPosting["id"]) => {
  return serverInstance.delete(`list/${id}`);
};

export const useDeleteJobLink = (
  props?: MutationOptions<unknown, unknown, JobPosting["id"]>
) => {
  return useMutation({
    mutationFn: (id: JobPosting["id"]) => deleteJobLink(id),
    ...props,
  });
};
