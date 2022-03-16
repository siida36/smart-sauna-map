/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Stack, Button, TextField } from '@mui/material';

function QueryForm({ query, onInput, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <Stack direction="row" spacing={1} margin={2}>
        <TextField label="keywords" variant="standard" value={query} onChange={onInput} fullWidth />
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
}

export default QueryForm;
