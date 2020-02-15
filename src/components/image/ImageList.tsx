import React from "react";
import styled from "styled-components";
import { ImageInterface } from "../hoc/withApi";
import Image from "./Image";
import useModal from "../hooks/useModal";

const ImageBlockWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1100px;
  margin: 0 auto;
`;

interface IProps {
  images: ImageInterface[];

  setCurrentImg: (id: number) => void;
}

const ImageList: React.FC<IProps> = ({ images, setCurrentImg }) => {
  return (
    <ImageBlockWrapper>
      {images &&
        images.map((image: ImageInterface) => {
          return (
            <Image
              setCurrentImg={setCurrentImg}
              id={image.id}
              key={image.id}
              url={image.url}
            />
          );
        })}
    </ImageBlockWrapper>
  );
};

export default ImageList;
