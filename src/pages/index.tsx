import React, { useContext, useState, useEffect } from 'react';
import { Progress, CSVUpload, Modal, AppContext } from 'components';
import { Flex, Card } from 'theme';
import { withAuth } from 'hocs';

/**
 * Homepage. Allows to upload a CSV file and displays the upload result.
 * @returns React component.
 */
const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isJobFinished } = useContext(AppContext);
  useEffect(() => {
    if (isJobFinished) {
      setIsModalOpen(true);
    }
  }, [isJobFinished]);
  return (
    <Flex>
      <Card pr={64}>
        <CSVUpload />
      </Card>
      <Progress />
      {isModalOpen && (
        <Modal close={() => setIsModalOpen(false)}>
          <Flex column center p={64} backgroundColor="white">
            The job has finished!
          </Flex>
        </Modal>
      )}
    </Flex>
  );
};

export default withAuth(Homepage);
