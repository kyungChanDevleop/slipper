// 승현 22.5/25
import { useMutation, gql } from "@apollo/client";
import { ChangeEvent, useRef, useState } from "react";
import { Modal } from "antd";
import styled from "@emotion/styled";

const UPLOAD_BUSINESS_IMAGE = gql`
  mutation uploadBusinessImage($files: [Upload!]!) {
    uploadBusinessImage(files: $files)
  }
`;

const UploadImage = styled.img`
  width: 60%;
  cursor: pointer;
  margin-left: 20%;
`;

const UploadButton = styled.button`
  width: 70%;
  height: 70%;
  margin-left: 10%;
  background-color: none;
  background-color: white;
  outline: none;
  border: none;
  cursor: pointer;
`;

const UploadImageBox = styled.img`
  width: 100%;
`;
const UploadFileHidden = styled.input`
  display: none;
`;
interface IImageBossProps {
  onChangeBusinessFileUrl: (fileUrl: string) => void;
  businessfileUrl?: string[] | undefined;
  isButton?: boolean;
  isShow: boolean;
}
export default function ImageBoss(props: IImageBossProps) {
  const [uploadBusinessImage] = useMutation(UPLOAD_BUSINESS_IMAGE);

  const fileRef = useRef<HTMLInputElement>(null);

  const onChangeBusinessFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (!file) return;

    try {
      const result = await uploadBusinessImage({
        variables: { files: file },
      });

      props.onChangeBusinessFileUrl(result.data.uploadBusinessImage);
    } catch (error: any) {
      Modal.error({ content: error.message });
    }
  };

  const onClickImgUpload = () => {
    fileRef.current?.click();
  };

  const file = JSON.stringify(props.businessfileUrl);

  return (
    <>
      {file !== `[""]` ? (
        <UploadImage
          onClick={onClickImgUpload}
          src={`${props.businessfileUrl}`}
        />
      ) : (
        <UploadButton
          type="button"
          onClick={onClickImgUpload}
          disabled={props.isShow}
        >
          <UploadImageBox src="/image/check.png"></UploadImageBox>
        </UploadButton>
      )}
      <UploadFileHidden
        style={{ display: "none" }}
        type="file"
        onChange={onChangeBusinessFile}
        ref={fileRef}
      />
    </>
  );
}
