import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Card, Button } from 'theme';
import { motion } from 'framer-motion';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const Content = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 6;
  border-radius: 5px;
`;

const Background = styled.div`
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface Props {
  close: () => void;
}

const Modal: React.FC<Props> = ({ children, close }) => {
  const [element, setElement] = useState<HTMLDivElement | null>();
  useEffect(() => {
    setElement(document.createElement('div'));
  }, []);

  useEffect(() => {
    if (element) {
      document.body.appendChild(element);
    }

    return () => {
      if (element) {
        document.body.removeChild(element);
      }
    };
  }, [element]);

  return element
    ? ReactDOM.createPortal(
        <Wrapper>
          <Content animate={{ scale: 2 }} transition={{ duration: 0.5 }}>
            <Card position="absolute" right={0} display="flex">
              <Button onClick={close}>X</Button>
            </Card>
            {children}
          </Content>
          <Background onClick={close} />
        </Wrapper>,
        element
      )
    : null;
};

export default Modal;
