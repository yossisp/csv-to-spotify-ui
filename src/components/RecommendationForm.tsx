import React, { useMemo } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Button,
  LinearProgress,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import MuiTextField from '@material-ui/core/TextField';
import { TextField } from 'formik-material-ui';
import Box from '@material-ui/core/Box';

interface Values {
  track: string;
  select: string;
}

interface Genres {
  genres: string[];
}

interface Props {
  setFormInput: (values: Values) => void;
  genres: Genres;
}

const RecommendationForm: React.FC<Props> = ({ setFormInput, genres }) => {
  const processedGenres: string[] = useMemo(
    () =>
      genres.genres.map((genre) => ({
        value: genre,
        label: genre,
      })),
    [genres]
  );
  return (
    <Formik
      initialValues={{
        track: '',
        select: 1,
      }}
      validate={(values: Partial<Values>) => {
        console.log('values', values);
        const errors: Partial<Values> = {};
        if (!values.track) {
          errors.track = 'Required';
        }

        return errors;
      }}
      onSubmit={(values: Values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          setFormInput(values);
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting, touched, errors }) => (
        <Form>
          <Box margin={1}>
            <Field
              component={TextField}
              type="text"
              label="Track"
              name="track"
            />
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              type="text"
              name="select"
              label="Select a Genre"
              select
              variant="standard"
              helperText="Please select a genre"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            >
              {processedGenres.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Field>
          </Box>
          <Box margin={1}>
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default RecommendationForm;
