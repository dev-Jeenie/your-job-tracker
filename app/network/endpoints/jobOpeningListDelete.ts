import { MutationOptions, useMutation } from "@tanstack/react-query";
import { serverInstance } from "../common/server";
import { JobPosting } from "@/app/list/page";
import { getServerSession } from "next-auth";

const deleteJobLink = async (id: JobPosting["id"]) => {

  const session = await getServerSession();
  const userId = session?.user?.email
  if(userId){
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
  props?: MutationOptions<unknown, unknown, JobPosting["id"]>
) => {
  return useMutation({
    mutationFn: (id: JobPosting["id"]) => deleteJobLink(id),
    ...props,
  });
};
