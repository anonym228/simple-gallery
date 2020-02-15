import React from "react";
import styled from "styled-components";
import useModal from "../hooks/useModal";

const ImageBLock = styled.div`
  margin: 30px;
  cursor: pointer;
`;

const ImageItem = styled.img`
  width: 250px;
  height: 150px;
`;

interface IProps {
  url: string;
  id: number;

  setCurrentImg: (id: any) => any;
}

const Image: React.FC<IProps> = ({ url, id, setCurrentImg }) => {
  const { setIsVisible, RenderModal } = useModal();
  return (
    <>
      <ImageBLock onClick={() => setIsVisible(true)}>
        <ImageItem src={url} />
      </ImageBLock>
      <RenderModal id={id} />
    </>
  );
};

export default Image;
