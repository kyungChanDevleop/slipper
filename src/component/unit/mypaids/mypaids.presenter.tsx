import * as S from "./mypaids.styles";
import { IMypaidsPresenter } from "./mypaids.types";
import InfiniteScroll from "react-infinite-scroller";
import { v4 as uuidv4 } from "uuid";
export default function MypaidsPresenter(props: IMypaidsPresenter) {
  return (
    <S.WrapperOut>
      <S.Head>이용권 결제 내역</S.Head>
      <S.BodyWrapper>
        <S.BodyHeadWrapper>
          <S.FlexBox>
            <S.BodyHeadFirst>이용권</S.BodyHeadFirst>
            <S.BodyHead>결제일시</S.BodyHead>
            <S.BodyHead>만료일시</S.BodyHead>
            <S.BodyHead>결제상태</S.BodyHead>
            <S.BodyHead>취소요청</S.BodyHead>
          </S.FlexBox>
        </S.BodyHeadWrapper>
        <S.Body>
          <InfiniteScroll
            key={uuidv4()}
            pageStart={0}
            loadMore={props.loadMore}
            hasMore={true}
            useWindow={false}
          >
            {props.data?.fetchPayments.map((el: any) => (
              <S.RowWrapper key={uuidv4()}>
                <S.FlexBox>
                  <S.RowFirst>{el.subType}</S.RowFirst>
                  <S.Row>{el.subStart.substring(0, 10)}</S.Row>
                  <S.Row>{el.subEnd.substring(0, 10)}</S.Row>
                  {el.paymentStatus === 1 ? (
                    <S.KeyDiv>
                      <S.Hi>{el.paymentStatus === 1 && "결제"}</S.Hi>
                      {props.afterDay < props.currentDay ? (
                        <S.refundPaymentButtonHidden
                          id={el.impUid}
                          onClick={props.cancelPayment}
                        >
                          환불
                        </S.refundPaymentButtonHidden>
                      ) : (
                        <S.Hi>환불요청 {Number(props.afterDay)}일까지</S.Hi>
                      )}
                    </S.KeyDiv>
                  ) : (
                    <>
                      <S.Row>취소완료</S.Row>
                      <S.Row>{el.subRefund.substring(0, 10)}</S.Row>
                    </>
                  )}
                </S.FlexBox>
              </S.RowWrapper>
            )) || <S.RowWrapper></S.RowWrapper>}
          </InfiniteScroll>
        </S.Body>
      </S.BodyWrapper>
    </S.WrapperOut>
  );
}
