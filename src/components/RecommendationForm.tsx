import * as React from 'react';
import { render } from 'react-dom';
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

const RecommendationForm = () => (
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
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        alert(JSON.stringify(values, null, 2));
      }, 500);
    }}
  >
    {({ submitForm, isSubmitting, touched, errors }) => (
      <Form>
        <Box margin={1}>
          <Field component={TextField} type="text" label="Track" name="track" />
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
            {[
              { value: 1, label: 'one' },
              { value: 2, label: 'two' },
            ].map((option) => (
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

export default RecommendationForm;
