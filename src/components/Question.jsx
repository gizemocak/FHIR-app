import React, { useEffect, useState } from 'react';
import { TextField, Input, Select, MenuItem } from '@material-ui/core';

const Question = ({ type, text, linkId, onChange, onError }) => {
  const [answer, setAnswer] = useState();
  const [stringError, setStringError] = useState(false);

  const regexString = new RegExp('[ \r\n\tS]+');

  useEffect(() => {
    if (answer || typeof answer === 'boolean') {
      onChange(answer, linkId, type);
    }
  }, [answer]);

  useEffect(() => {
    onError(stringError, linkId);
  }, [stringError]);
  if (type === 'boolean') {
    return (
      <div className="question-container">
        <span className="question-text">{text}</span>
        <Select
          onChange={({ target: { value } }) => {
            setAnswer(value);
          }}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </div>
    );
  } else if (type === 'date') {
    return (
      <div className="question-container">
        <span className="question-text">{text}</span>
        <Input
          type="date"
          onChange={ev => {
            setAnswer(ev.target.value);
          }}
        />
      </div>
    );
  } else {
    return (
      <div className="question-container">
        <span className="question-text">{text}</span>
        <TextField
          multiline={true}
          name={linkId}
          onChange={({ target: { value } }) => {
            setAnswer(value);
            setStringError(value && regexString.test(value));
          }}
          value={answer}
          error={stringError}
        />
      </div>
    );
  }
};

export default Question;
