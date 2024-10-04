import { MutationOptions, useMutation } from "@tanstack/react-query";
import { serverInstance } from "../common/server";
import { JobPosting } from "@/app/list/page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/lib/configs/auth/authOptions";

const deleteJobLink = async ({id, userEmail}: {id:JobPosting["id"], userEmail:JobPosting["userEmail"]}) => {
  if(userEmail) {
  return serverInstance.delete(`list/${id}`);
  }
    // 로컬 스토리지에서 데이터를 가져옴
    const list = JSON.parse(localStorage.getItem("JobPostings") ?? "[]");

    // 삭제할 데이터를 제외한 새로운 리스트를 만듦
    const updatedList = list.filter((job: JobPosting) => job.id !== id);
  
    // 업데이트된 리스트를 다시 로컬 스토리지에 저장
    localStorage.setItem("JobPostings", JSON.stringify(updatedList));

    return updatedList;
};

export const useDeleteJobLink = (
  props?: MutationOptions<unknown, unknown, {id:JobPosting["id"], userEmail:JobPosting["userEmail"]}>
) => {
  return useMutation({
    mutationFn: ({id, userEmail}: {id:JobPosting["id"], userEmail:JobPosting["userEmail"]}) => deleteJobLink({id,userEmail}),
    ...props,
  });
};
