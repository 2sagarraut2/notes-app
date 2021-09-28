import { Button, Container, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRightIcon'
import { makeStyles } from '@material-ui/core';
import { FormLabel, FormControl } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    field: {
      marginBottom: '20px !important',
      display: 'block !important'
    },
});

const Create = () => {

  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("Money")

  const handleOnChange = (e) => {
    
  }

  const onSubmit = () => {
    console.log(title, details);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if(title === "") {
      setTitleError(true);
    }

    if(details === "") {
      setDetailsError(true);
    }

    if(title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ title, details, category })
      }).then(() => history.push('/'));
    }
  }

  return (
    <Container>
      <Typography
        variant="h6"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a new note
      </Typography>

      <form noValidate autoComplete="off">
        <TextField
          name="title"
          value={title}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          onChange={(e) => setTitle(e.target.value)}
          error={titleError}
        />
        <TextField
          name="details"
          value={details}
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          onChange={(e) => setDetails(e.target.value)}
          error={detailsError}
        />
      </form>

        <FormControl className={classes.field}>
          <FormLabel color="secondary">Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="Money" control={<Radio />} label="Money"></FormControlLabel>
            <FormControlLabel value="Todos" control={<Radio />} label="Todo"></FormControlLabel>
            <FormControlLabel value="Reminders" control={<Radio />} label="Reminder"></FormControlLabel>
            <FormControlLabel value="Work" control={<Radio />} label="Work"></FormControlLabel>
          </RadioGroup>
        </FormControl>

      <Button
        type="Submit"
        color="secondary"
        variant="contained"
        // endIcon={<KeyboardArrowRightIcon />}
        onClick={(e) => handleSubmit(e)}
      >
        SUBMIT
      </Button>
    </Container>
  )
}

export default Create;