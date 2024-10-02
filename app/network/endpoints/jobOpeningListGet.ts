import { JobPosting } from "@/app/list/page";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { serverInstance, serverResponseHandler } from "../common/server";

const getJobOpeningList = () =>
  {
    const list = JSON.parse(
      localStorage.getItem("JobPostings") ?? "[]"
    );
    return list;
    return (
      serverInstance
    .get(`/list`)
    .then(serverResponseHandler<JobPosting[]>)
    .then((res) => res)
  )
};

export const useGetJobsList = (
  props?: Partial<UseQueryOptions<JobPosting[]>>
) => {
  return useQuery({
    queryKey: ["getJobOpeningList"],
    queryFn: getJobOpeningList,
    ...props,
  });
};
