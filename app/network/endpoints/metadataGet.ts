import {
    MutationOptions,
    useMutation
} from "@tanstack/react-query";
import { serverInstance, serverResponseHandler } from "../common/server";

type Props = { url: string };

export type MetaData = {
  title?: string;
  description?: string;
  headings?: { level: string; text: string }[];
  og?: {
    title?: string;
    description: string;
    image: string;
  };
  //   "og:title"?: string;
  //   "og:description"?: string;
  //   "og:image"?: string;
  //   "og:image:width"?: string;
  //   "og:image:height"?: string;
};

// TODO : 메타데이터 캐싱 처리
// 1. url과 유저가 직접 입력한 데이터만 서버에 저장. 메타태그는 그때그때 불러오는 방식
// 2. 해당 메타데이터를 캐시에 저장. 유효기간은 3일쯤?
// 3. 서버가 URL을 요청받으면 해당 URL의 메타데이터가 캐시에 존재하는지 확인
// 4. - 캐시가 있고 유효하면 캐시된 데이터를 반환. 없거나 만료됐다면 getMetadata 호출

const getMetadataByUrl = ({ url }: { url: string }) => {
  return serverInstance
    .post(`/metadata`, { url })
    .then(serverResponseHandler<MetaData>)
    .then((res) => res);
};

export const useGetMetadata = (
  props?: MutationOptions<MetaData, unknown, Props>
) => {
  return useMutation({
    mutationFn: getMetadataByUrl,
    ...props,
  });
  // 비동기적 호출을 위해 useMutaion 사용
};
