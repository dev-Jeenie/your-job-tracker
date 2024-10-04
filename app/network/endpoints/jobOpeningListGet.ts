import { JobPosting } from "@/app/list/page";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { serverInstance, serverResponseHandler } from "../common/server";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

const getJobOpeningList = async () =>
  {
    const session = await getServerSession();
    const userId = session?.user?.email
  console.log("userId",userId)

    if(userId) {
      return (
        serverInstance
      .get(`/list`)
      .then(serverResponseHandler<JobPosting[]>)
      .then((res) => res)
    )
    }
    const list = JSON.parse(
      localStorage.getItem("JobPostings") ?? "[]"
    );
    return list;
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
