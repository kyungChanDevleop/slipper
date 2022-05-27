import FindIdPresenter from "./findId.presenter";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
  SEARCH_USER_EMAIL,
  PROOF_TOKEN,
  USER_GET_TOKEN,
} from "./findId.querys";
import {
  IMutation,
  IMutationProofTokenArgs,
  IMutationUserGetTokenArgs,
  IQuery,
  IQueryFetchUserEmailArgs,
} from "../../../../commons/types/generated/types";
import { Modal } from "antd";

export default function FindIdContainer() {
  const router = useRouter();
  const [phoneNum, setPhoneNum] = useState("");
  const [proofNum, setProofNum] = useState("");
  const [flag, setFlag] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [email, setEamil] = useState("");

  // graphql 부분
  const [searchUserEmail] = useMutation<
    Pick<IQuery, "fetchUserEmail">,
    IQueryFetchUserEmailArgs
  >(SEARCH_USER_EMAIL);

  const [userGetToken] = useMutation<
    Pick<IMutation, "userGetToken">,
    IMutationUserGetTokenArgs
  >(USER_GET_TOKEN);

  const [proofToken] = useMutation<
    Pick<IMutation, "proofToken">,
    IMutationProofTokenArgs
  >(PROOF_TOKEN);

  // 핸드폰번호입력 함수
  const onChangePhoneNum = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNum(event.target.value);
    if (event.target.value.length === 11) {
      setIsActive(false);
    }
  };

  // 인증번호입력 함수
  const onChangeProofNum = (event: ChangeEvent<HTMLInputElement>) => {
    setProofNum(event.target.value);
  };

  // 인증번호 요청 기능
  const onClickGetToken = async () => {
    try {
      await userGetToken({
        variables: {
          phone: phoneNum,
        },
      });
      alert("인증번호가 전송되었습니다");
    } catch (error) {
      alert(error);
    }
    setFlag(true);
  };
  // 인증완료 요청 기능
  const onClickCheckProof = async () => {
    if (proofNum === "") {
      Modal.error({ content: "인증번호를 입력해주세요" });
      return;
    }
    try {
      await proofToken({
        variables: {
          phone: phoneNum,
          mytoken: proofNum,
        },
      });
      Modal.success({ content: "인증이 완료되었습니다" });
      setFlag(false);
    } catch (error) {
      Modal.error({ content: "인증에 실패하였습니다" });
    }
  };

  // 아이디 찾기 버튼
  const onClickFindId = async () => {
    if (phoneNum && proofNum) {
      try {
        const result = await searchUserEmail({
          variables: {
            phone: phoneNum,
          },
        });
        setEamil(result.data?.searchUserEmail.email);
        Modal.success({ content: "이메일을 보여주겠다" });
      } catch (error) {
        Modal.error({ content: "이메일 찾기에 실패하였습니다" });
      }
    }
  };

  return (
    <FindIdPresenter
      flag={flag}
      isActive={isActive}
      onChangePhoneNum={onChangePhoneNum}
      onChangeProofNum={onChangeProofNum}
      onClickGetToken={onClickGetToken}
      onClickCheckProof={onClickCheckProof}
      onClickFindId={onClickFindId}
      email={email}
    />
  );
}
