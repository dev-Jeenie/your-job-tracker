import type { JobPosting } from "@/app/list/page";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { serverInstance, serverResponseHandler } from "../common/server";

const postNewJobLink = (data: JobPosting) => {

  const list = JSON.parse(
    localStorage.getItem("JobPostings") ?? "[]"
  );
  list.push(data);
  localStorage.setItem("JobPostings", JSON.stringify(list));
  return list;

  return serverInstance
    .post(`/list`, data)
    .then(serverResponseHandler<JobPosting>)
    .then((res) => res);
};

export const useAddJobPosting = (
  props?: MutationOptions<JobPosting, unknown, JobPosting>
) => {
  return useMutation({
    mutationFn: postNewJobLink,
    ...props,
  });
};
