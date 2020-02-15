import React, { useState } from "react";
import styled from "styled-components";
import ImageList from "./image/ImageList";
import withApi, { ImageInterface } from "./hoc/withApi";
import Modal from "./Modal";

const ContentTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;
const ContentTitle = styled.h1`
  color: #4a4a4;
  font-weight: normal;
  text-transform: uppercase;
`;

const MainContentWrapper = styled.div`
  position: relative;
`;

interface IProps {
  images: ImageInterface[];
}

const MainContent: React.FC<IProps> = ({ images }) => {
  const [currentImg, setCurrentImg] = useState(0);

  return (
    <MainContentWrapper>
      <ContentTitleWrapper>
        <ContentTitle>Test app</ContentTitle>
      </ContentTitleWrapper>

      <ImageList images={images} setCurrentImg={setCurrentImg} />
    </MainContentWrapper>
  );
};

export default withApi(MainContent);
