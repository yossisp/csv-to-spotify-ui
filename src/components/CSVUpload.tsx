import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { apiUrl } from 'config';
import { Span, Card, Flex, ButtonMui } from 'theme';
import { AppContext, Modal } from 'components';
import styled from 'styled-components';

const LearnMore = styled.span`
  font-style: italic;
  color: blue;
  role: button;
  cursor: pointer;
`;

/**
 * Reads uploaded file and sends it to the server.
 * @param file file uploaded by the user
 * @param userId user Spotify id
 * @param uploadFileName uploaded file name
 * @param setCSVFileName function which sets csv file name
 * @param addError function which adds an error to global errors array
 */
function readCSVFile(
  file: any,
  userId: string,
  uploadFileName: string,
  setCSVFileName: (fileName: string) => void,
  addError: (error: string) => void
): void {
  try {
    if (file && userId) {
      const reader = new FileReader();
      reader.onerror = (error) => console.error(error);
      reader.readAsText(file, 'utf8');
      reader.onload = async (event) => {
        try {
          const csvFile = reader.result;
          const response = await fetch(`${apiUrl}/csv`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, csvFile, uploadFileName }),
          });
          if (response.status >= 400) {
            const errorMessage = (await response.json())?.errorMessage;
            if (errorMessage) {
              console.error('server errorMessage: ', errorMessage);
              addError(errorMessage);
            }
          } else {
            setCSVFileName(uploadFileName.replace('.csv', ''));
          }
        } catch (error) {
          console.error(error);
        }
      };
    }
  } catch (err) {
    console.error(err);
  }
}

/**
 * Contains the input element which allows to upload a CSV file.
 * @returns React component.
 */
const UploadCSV = () => {
  const [isExplanationModalOpen, setIsExplanationModalOpen] = useState<boolean>(
    false
  );
  const { addError, setCSVFileName, userSpotifyID: userId, isJobFinished } = useContext(
    AppContext
  );
  const [uploadedFile, setUploadedFile] = useState();
  const [uploadFileName, setUploadFileName] = useState();
  const [isJobInProgress, setIsJobInProgress] = useState<boolean>(false);

  return (
    <Card>
      {isExplanationModalOpen && (
        <Modal close={() => setIsExplanationModalOpen(false)}>
          <Flex column center backgroundColor="white" p={16} width={250}>
            <Span width={200} fontSize={10} lineHeight="0.7rem">
              The format of the CSV file should contain at least two columns:
              first column should be song name and the second - artist. The first row is reserved for column headers. <br /><br /> If
              you're using Apple Music your playlists can be exported to a 
              text file which can then be converted to CSV using Microsoft Excel (as of Itunes 12.8: File -> Library -> Export Playlist).
            </Span>
          </Flex>
        </Modal>
      )}
      <Card pb={32}>
        <Card>
        Please upload a CSV (<Span bold>comma</Span>
        -separated) file with playlist data:</Card>
        <Card><LearnMore onClick={() => setIsExplanationModalOpen(true)}>
          {' '}
          (learn more on playlist format)
        </LearnMore></Card>
      </Card>

      <Card>
        <Card>
          <input
            accept="text/csv"
            id="contained-button-file"
            type="file"
            onChange={(e) => {
              const uploadFile = e.target.files[0];
              if (uploadFile) {
                setUploadFileName(uploadFile.name);
                setUploadedFile(uploadFile);
              }
            }}
            style={{ display: 'none'}}
          />
          {uploadedFile ? (
            <Card fontSize={18}>File chosen: {uploadFileName}</Card>
          ) : (
            <ButtonMui>
              <label htmlFor="contained-button-file" style={{
                cursor: 'pointer'
              }}>Choose a file</label>
            </ButtonMui>
          )}
        </Card>
        <Card width={400} pt={200}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              readCSVFile(
                uploadedFile,
                userId,
                uploadFileName,
                setCSVFileName,
                addError
              );
            }}
          >
          {!isJobInProgress && !isJobFinished && (
            <ButtonMui type="submit" onClick={() => {
              if (uploadedFile) {
                const timer = setTimeout(() => {
                  setIsJobInProgress(true);
                  clearTimeout(timer);
                }, 0)
              }
            }}><Span fontSize={24}>Start Upload</Span></ButtonMui>
          )}
          {isJobFinished && (
            <ButtonMui onClick={() => {
              window.location.reload()
            }}><Span fontSize={24}>Start New Upload</Span></ButtonMui>
          )}
          {isJobInProgress && null}
          </form>
        </Card>
      </Card>
    </Card>
  );
};

UploadCSV.propTypes = {
  userId: PropTypes.string,
  setCSVFileName: PropTypes.func,
};

export default UploadCSV;
