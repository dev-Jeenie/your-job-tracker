import { UrlItem } from "@/app/list/page";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { serverInstance, serverResponseHandler } from "../common/server";

const getJobOpeningList = () =>
  serverInstance
    .get(`/list`)
    .then(serverResponseHandler<UrlItem[]>)
    .then((res) => {
      console.log("res", res);
      return res;
    });

export const useGetJobsList = (props?: Partial<UseQueryOptions<UrlItem[]>>) => {
  return useQuery({
    queryKey: ["getJobOpeningList"],
    queryFn: getJobOpeningList,
    ...props,
  });
};
