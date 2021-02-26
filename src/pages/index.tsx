import React, { useContext } from 'react';
import {
  Progress,
  Nav,
  CSVUpload,
  Modal,
  NewReleases,
  AppContext,
} from 'components';
import { Flex } from 'theme';

const NextAuth = () => {
  const { isModalOpen, setIsModalOpen } = useContext(AppContext);

  return (
    <>
      <Nav />
      <NewReleases />
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
