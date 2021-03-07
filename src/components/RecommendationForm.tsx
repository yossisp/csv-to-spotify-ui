import React, { useMemo } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, MenuItem } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import Box from '@material-ui/core/Box';

interface Values {
  artist: string;
  song: string;
  select: string;
}

interface Genres {
  genres: string[];
}

interface Props {
  setFormInput: (values: Values) => void;
  genres: Genres;
}

/**
 *
 * @param setFormInput function which saves input values
 * @param genres available music genres in Spotify
 */
const RecommendationForm: React.FC<Props> = ({ setFormInput, genres }) => {
  const processedGenres = useMemo(
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
        artist: '',
        song: '',
        genre: 'rock',
      }}
      validate={(values: Partial<Values>) => {
        console.log('values', values);
        const errors: Partial<Values> = {};
        if (!values.artist) {
          errors.artist = 'Required';
        }

        if (!values.song) {
          errors.song = 'Required';
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
              label="Artist"
              name="artist"
            />
          </Box>
          <Box margin={1}>
            <Field component={TextField} type="text" label="Song" name="song" />
          </Box>
          <Box margin={1}>
            <Field
              component={TextField}
              type="text"
              name="genre"
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
