// 예원작업 5/16

import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import {
  IMutation,
  IMutationDeleteBoardArgs,
  IQuery,
  IQueryFetchBoardArgs,
  IQueryFetchUserLikeArgs,
} from "../../../../commons/types/generated/types";
import { FETCH_USER } from "../../login/login.queries";
import { CLICK_LIKE } from "../list/list.query";
import DetailPresenter from "./detail.presenter";
import { DELETE_BOARD, FETCH_BOARD, FETCH_USER_LIKE } from "./detail.query";
import { request } from "graphql-request";

export default function DetailContainer() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(0);

  // 게시글 상세 내용 가져오기 Query
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoard">,
    IQueryFetchBoardArgs
  >(FETCH_BOARD, {
    variables: { boardId: String(router.query.boardId) },
  });

  const { data: likeData } = useQuery<
    Pick<IQuery, "fetchUserLike">,
    IQueryFetchUserLikeArgs
  >(FETCH_USER_LIKE, {
    variables: {
      boardId: String(router.query.boardId),
    },
  });

  // 유저 정보 가져오기 Query
  const { data: userDate } = useQuery(FETCH_USER);

  // 게시글 삭제 Mutation
  const [deleteBoard] = useMutation<
    Pick<IMutation, "deleteBoard">,
    IMutationDeleteBoardArgs
  >(DELETE_BOARD);

  // 게시글 좋아요 Mutation
  const [clicklike] = useMutation(CLICK_LIKE);

  // 게시글 삭제 함수
  const onClickDeleteBoard = async (event: MouseEvent<HTMLImageElement>) => {
    await deleteBoard({
      variables: {
        boardId: String((event.target as HTMLImageElement).id),
      },
      update(cache, { data }) {
        const deleteBoard = data?.deleteBoard;
        cache.modify({
          fields: {
            deleteBoard: (prev, { readField }) => {
              const filteredPrev = prev.filter(
                (el: any) => readField("id", el) !== deleteBoard
              );
              return [...filteredPrev];
            },
          },
        });
      },
    });
    Modal.success({ content: "게시글 삭제에 성공하였습니다" });
    router.push("/boards");
  };

  // 수정하기로 이동
  const onClickMoveToBoardEdit = () => {
    router.push(`/boards/${router.query.boardId}/edit`);
  };

  // 좋아요 함수
  const onClickLike = async (event: MouseEvent<HTMLImageElement>) => {
    try {
      const result = await clicklike({
        variables: {
          boardId: String((event.target as HTMLImageElement).id),
        },
        refetchQueries: [
          {
            query: FETCH_USER_LIKE,
            variables: {
              boardId: String((event.target as HTMLImageElement).id),
            },
          },
        ],
      });
      setIsActive(result.data?.clickLike);
    } catch (error) {
      Modal.error({ content: "다시 시도해주세요" });
    }
  };

  return (
    <DetailPresenter
      onClickDeleteBoard={onClickDeleteBoard}
      data={data}
      likeData={likeData}
      onClickMoveToBoardEdit={onClickMoveToBoardEdit}
      onClickLike={onClickLike}
      isActive={isActive}
      refetch={refetch}
      userData={userDate}
    />
  );
}

// export const getServerSideProps = async (context: any) => {
//   // 데이터를 요청할 것
//   // const { data } = useQuery(FETCH_BOARD) - 이건 안됨
//   const result = await request(
//     "https://backend06.codebootcamp.co.kr/graphql",
//     FETCH_BOARD,
//     {
//       boardId: context.query.boardid,
//     }
//   );

//   return {
//     props: {
//       myboardData: {
//         title: result.fetchBoard.title,
//         contents: result.fetchBoard.contents,
//         images: result.fetchBoard.images,
//       },
//     },
//   };
// };
