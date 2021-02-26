import React, { useContext } from 'react';
import { Progress, Nav, CSVUpload, Modal, AppContext } from 'components';
import { Flex } from 'theme';

const NextAuth = () => {
  const { isModalOpen, setIsModalOpen } = useContext(AppContext);

  return (
    <>
      <CSVUpload />
      <Progress />
      {isModalOpen && (
        <Modal close={() => setIsModalOpen(false)}>
          <Flex column center p={64} backgroundColor="white">
            The job has finished!
          </Flex>
        </Modal>
      )}
    </>
  );
};

export default NextAuth;
