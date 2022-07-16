import { useMutation, gql } from "@apollo/client";
import { ChangeEvent, useRef } from "react";
import { Modal } from "antd";
import styled from "@emotion/styled";

const UPLOAD_PROFILE_IMAGE = gql`
  mutation uploadProfileImage($files: [Upload!]!) {
    uploadProfileImage(files: $files)
  }
`;

const UploadImage = styled.img`
  width: 30%;
  cursor: pointer;
`;

const UploadButton = styled.div`
  width: 25%;
  height: 25%;
  background-color: none;
  margin-top: 20px;
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

interface IImageProfileProps {
  onChangeFileUrl: (fileUrl: string) => void;
  fileUrl?: string[];
  userImage?: string;
}

export default function ImageProfile(props: IImageProfileProps) {
  const [uploadProfileImage] = useMutation(UPLOAD_PROFILE_IMAGE);
  const fileRef = useRef<HTMLInputElement>(null);

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (!file) return;
    try {
      const result = await uploadProfileImage({
        variables: { files: file },
      });
      props.onChangeFileUrl(result.data.uploadProfileImage);
    } catch (error: any) {
      Modal.error({ content: error.message });
    }
  };

  const onClickImgUpload = () => {
    fileRef.current?.click();
  };

  const file = JSON.stringify(props.fileUrl);

  return (
    <>
      {file !== `[""]` ? (
        <UploadImage onClick={onClickImgUpload} src={`${props.fileUrl}`} />
      ) : (
        <UploadButton onClick={onClickImgUpload}>
          <UploadImageBox src="/image/profile.png"></UploadImageBox>
        </UploadButton>
      )}
      <UploadFileHidden type="file" onChange={onChangeFile} ref={fileRef} />
    </>
  );
}

{
  /* <a target="_blank" href="https://icons8.com/icon/9hyTizhOTdix/업로드">업로드</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */
}
