import { JobPosting } from "@/app/list/page";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { serverInstance, serverResponseHandler } from "../common/server";
import { useSession } from "next-auth/react";
// import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/lib/configs/auth/authOptions";

const getJobOpeningList = async (userId?: string): Promise<JobPosting[]> => {
  if (userId) {
    return serverInstance
      .get(`/list?email=${userId}`) // Pass userId as a query parameter
      .then(serverResponseHandler<JobPosting[]>)
      .then((res) => res);
  }

  const list = JSON.parse(localStorage.getItem("JobPostings") ?? "[]");
  return list;
};

export const useGetJobsList = (
  props?: Partial<UseQueryOptions<JobPosting[]>>
) => {
  const { data: session } = useSession();
  const userId = session?.user?.email || ""; // Extract user ID from session

  return useQuery({
    queryKey: ["getJobOpeningList", userId], // Include userId in the query key
    queryFn: () => getJobOpeningList(userId), // Pass userId to the query function
    ...props,
  });
};