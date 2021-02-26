import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { apiUrl } from 'config';
import { Span, Card, Button } from 'theme';
import { AppContext } from 'components';

function readCSVFile(
  file: any,
  userId: string,
  uploadFileName: string,
  setCSVFileName: (fileName: string) => void,
  addError: any
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

const UploadCSV = () => {
  const { addError, setCSVFileName, userSpotifyID: userId } = useContext(
    AppContext
  );
  const [uploadedFile, setUploadedFile] = useState();
  const [uploadFileName, setUploadFileName] = useState();

  return (
    <Card>
      <Card>
        Please upload a CSV (<Span bold>comma</Span>
        -separated) file with playlist data:
      </Card>
      <Card>
        <Card>
          <input
            accept="text/csv"
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => {
              const uploadFile = e.target.files[0];
              if (uploadFile) {
                setUploadFileName(uploadFile.name);
                setUploadedFile(uploadFile);
              }
            }}
          />
          <label htmlFor="contained-button-file" />
        </Card>
        <Card widht={300} pt={30}>
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
            <Button width={300} height={40} b={0} type="submit" fontSize={18}>
              Start Upload
            </Button>
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
