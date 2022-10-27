import React, { ReactNode } from "react";
import styled, {keyframes} from "styled-components";
import { Button } from "./controls/Button";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.6);
`;

const ModalPositioner = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  inset: 0;
  animation: ${fadeIn} 0.2s linear;
`;

const ModalBody = styled.div`
  background-color: white;
  z-index: 2;
  padding: 12px 16px;
  width: 90%;
  max-width: 300px;
  border-radius: 6px;
  max-height: 90%;
  overflow-y: auto;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;


interface ModalProps {
  onClose: () => void;
  children?: ReactNode;
}

export function Modal({ children, onClose }: ModalProps) {
  return (
    <ModalPositioner>
      <Backdrop onClick={onClose} />
      <ModalBody>
        <div>{children}</div>
      </ModalBody>
    </ModalPositioner>
  );
}
