import { JobPosting } from "../list/page";

export const groupByDeadline = (
  postings: JobPosting[]
): Record<string, JobPosting[]> => {
  return postings.reduce((acc, item) => {
    const dateKey = new Date(item.deadline).toISOString().split("T")[0]; // 날짜 부분만 사용
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(item);
    return acc;
  }, {} as Record<string, JobPosting[]>);
};
