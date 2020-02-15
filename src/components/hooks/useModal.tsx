import React, { useState } from "react";
import Modal from "../Modal";

interface IRenderProps {
  children?: React.ReactChild;
  id?: number;
}

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const RenderModal: React.FC<IRenderProps> = ({ children, id }) => {
    return (
      <React.Fragment>
        {isVisible && (
          <Modal id={id} setIsVisible={setIsVisible}>
            {children ? children : ""}
          </Modal>
        )}
      </React.Fragment>
    );
  };

  return {
    setIsVisible,
    RenderModal
  };
};

export default useModal;
