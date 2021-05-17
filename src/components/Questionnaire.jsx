import React from 'react';
import { TextField, Button, Input } from '@material-ui/core';
import questionnaire from '../assets/questionnaire';

const question = (type, text) => {
  if (type === 'boolean') {
    return (
      <div className="question-container">
        <span className="question-text">{text}</span>
        <Button value={true}>Yes</Button>
        <Button value={false}>No</Button>
      </div>
    );
  } else if (type === 'date') {
    return (
      <div className="question-container">
        <span className="question-text">{text}</span>
        <Input type="date" />
      </div>
    );
  } else {
    return (
      <div className="question-container">
        <span className="question-text">{text}</span>
        <TextField multiline={true} />
      </div>
    );
  }
};

const Questionnaire = () => {
  return (
    <div>
      <h1 className="title">Questionnaire</h1>
      <form validate>
        {questionnaire.item.map(i =>
          i.item
            ? i.item.map(q => question(q.type, q.text))
            : question(i.type, i.text)
        )}
      </form>
    </div>
  );
};

export default Questionnaire;
