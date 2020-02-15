import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { apiUrl } from "../constants/default";

import ReactDOM from "react-dom";

interface IProps {
  children: React.ReactChild;
  setIsVisible: (el: boolean) => void;
  id?: number;
}

interface IComments {
  id: number;
  text: string;
  date: number;
}

interface ImageData {
  id: number;
  url: string;
  comments?: IComments[];
}

interface IStyled {
  height: number;
}

const ModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

const ModalBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding: 40px;
  background: white;
  flex-direction: column;
`;

const ImgBlock = styled.img`
  max-width: 400px;
`;

const ImgWrapper = styled.div`
  background: #eaeaea;
  margin-right: 15px;
  margin-bottom: 20px;
`;

const CommentsWrapper = styled.div`
  min-width: 200px;
`;

const CommentHeightWrap = styled.div`
  height: 100%;
  overflow-y: scroll;
  overflow-y: ${(props: IStyled) => (props.height > 200 ? "scroll" : "")};
`;

const CommentBlock = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const CommentTime = styled.span`
  color: #d0cdcd;
  font-size: 12px;
  margin-bottom: 5px;
`;

const CommentMessage = styled.span`
  font-size: 14px;
  color: #000;
`;

const CloseButton = styled.div`
  position: absolute;
  top: -7px;
  right: 38px;

  height: 55px;
  cursor: pointer;
  border-radius: 50%;

  border-radius: 50%;
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 30px;
    left: -3px;
    width: 30px;
    height: 1px;
    background: black;
  }
  &:before {
    webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  &:after {
    webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
`;

const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  border: 1px solid #cccccc;
  border-radius: 3px;
  outline: none;
  padding: 5px;
  font-size: 14px;
  margin-bottom: 20px;
  &:focus {
    border: 1px solid #4997d0;
  }
`;

const FormButton = styled.button`
  padding: 5px;
  background: #4997d0;
  border-radius: 3px;
  color: #fff;
  font-size: 14px;
  outline: none;
`;

const TopBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Modal: React.FC<IProps> = ({ children, setIsVisible, id }) => {
  const modalRoot = document.getElementById("modal");

  let name: HTMLInputElement | null;
  let message: HTMLInputElement | null;

  const [commentHeight, setCommentHeight] = useState(0);
  const [img, setImg] = useState<ImageData | null>(null);
  const [preloader, setPreloader] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${apiUrl}/images/${id}`);
      if (data) {
        setImg(data);
        setPreloader(!preloader);
      }
    })();
  }, [id]);

  function dateFormatter(date: number) {
    const format = new Date(date);
    return `${format.toLocaleDateString()}`;
  }

  function __handleClose() {
    setIsVisible(false);
    setCommentHeight(0);
  }

  async function __handleSendComments() {
    const requestData = {
      name: name!.value,
      comment: message!.value
    };

    const data = await axios.post(
      `${apiUrl}/images/${id}/comments`,
      requestData
    );
    if (data.status) {
      const newComment: IComments = {
        id: +new Date(),
        text: message!.value,
        date: Date.now()
      };

      img &&
        setImg({
          ...img,
          comments: [...img.comments!, newComment]
        });
    }
  }

  useEffect(() => {
    console.log(commentHeight);
  }, [commentHeight]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <ModalWrapper>
      <ModalBlock>
        {img ? (
          <>
            <TopBlock>
              <ImgWrapper>
                <ImgBlock src={img.url} alt="" />
              </ImgWrapper>
              {img.comments!.length > 0 ? (
                <CommentsWrapper>
                  <CommentHeightWrap
                    height={commentHeight}
                    ref={(node: HTMLDivElement) =>
                      node && setCommentHeight(node.clientHeight)
                    }
                  >
                    {img.comments &&
                      img.comments.map((comment: IComments) => {
                        return (
                          <CommentBlock key={comment.id}>
                            <CommentTime>
                              {dateFormatter(comment.date)}
                            </CommentTime>
                            <CommentMessage>{comment.text}</CommentMessage>
                          </CommentBlock>
                        );
                      })}
                  </CommentHeightWrap>
                </CommentsWrapper>
              ) : (
                <div>"No comments"</div>
              )}
              <CloseButton onClick={() => __handleClose()} />
            </TopBlock>

            <div>
              <FormBlock>
                <FormInput
                  ref={(node: HTMLInputElement) => (name = node)}
                  type="text"
                  placeholder="Name"
                />
                <FormInput
                  ref={(node: HTMLInputElement) => (message = node)}
                  type="text"
                  required
                  placeholder="Message"
                />
                <FormButton onClick={() => __handleSendComments()}>
                  Send Message
                </FormButton>
              </FormBlock>
            </div>
          </>
        ) : (
          <div>Loading</div>
        )}
      </ModalBlock>
    </ModalWrapper>,
    modalRoot
  );
};

export default Modal;
