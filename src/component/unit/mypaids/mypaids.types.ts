import {
  FetchMoreOptions,
  FetchMoreQueryOptions,
  OperationVariables,
} from "@apollo/client";
import { IQuery } from "../../../commons/types/generated/types";
import { MouseEvent } from "react";
export interface IMypaidsPresenter {
  data: any; // 예원 수정 6/9
  // data?: Pick<IQuery, "fetchUser">;
  loadMore: () => void;
  cancelPayment: (eveent: MouseEvent<HTMLDivElement>) => void;
  afterDay: number;
  currentDay: number;
}

export interface IMyPaymentHistory {
  data?: Pick<IQuery, "fetchPayments"> | undefined;
  fecthMore?: (
    fetchMoreOptions: FetchMoreQueryOptions<OperationVariables, any> &
      FetchMoreOptions<any, OperationVariables>
  ) => void;

  // loadMore: () => void;
}
