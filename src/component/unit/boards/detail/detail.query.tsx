import { gql } from "@apollo/client";

// 게시글의 상세 정보를 불러오는 query
export const FETCH_BOARD = gql`
  query fetchBoard($boardId: String!) {
    fetchBoard(boardId: $boardId)
  }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: String!) {
    deleteBoard(boardId: $boardId)
  }
`;

// 좋아요 누르는 mutation
export const CLICK_LIKE = gql`
  mutation clickLike($boardId: String!) {
    clickLike(boardId: $boardId) {
      id
      likeCount
    }
  }
`;

// 유저가 좋아요 누른 갯수, boolean, board 정보를 불러오는 query
export const FETCH_USER_LIKE = gql`
  query fetchUserLike($boardId: String!) {
    fetchUserLike(boardId: $boardId) {
      isLike
      board {
        id
        likeCount
      }
    }
  }
`;

export const FETCH_BOARDS_PAGE = gql`
  query fetchBoardsPage(
    $page: Int
    $category: String
    $search: String
    $sortType: String
  ) {
    fetchBoardsPage(
      page: $page
      category: $category
      search: $search
      sortType: $sortType
    )
  }
`;
