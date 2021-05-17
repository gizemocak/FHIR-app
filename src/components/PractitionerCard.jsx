import React from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { format, parse, isValid } from 'date-fns';

const PractitionerCard = props => {
  const { id, name, gender, dob, imgSrc, handleDelete } = props;

  let date = parse(dob, 'yyyy-MM-dd', new Date());

  return (
    <Card className="card">
      <CardContent>
        <img
          src={imgSrc}
          alt="avatar"
          style={{ height: 50, width: 50, borderRadius: '50%' }}
        />
        <Typography color="textSecondary">
          Name: {name === undefined ? 'N/A' : name}
        </Typography>
        <Typography color="textSecondary">
          Gender: {gender === undefined ? 'N/A' : gender}
        </Typography>
        <Typography color="textSecondary">
          Date of Birth: {!isValid(date) ? 'N/A' : format(date, 'yyyy/MM/dd')}
        </Typography>
        <Button onClick={() => handleDelete(id)}>Delete</Button>
      </CardContent>
    </Card>
  );
};

PractitionerCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  gender: PropTypes.string,
  imgSrc: PropTypes.string,
  dob: function(props) {
    if (!props.id) {
      return new Error('Function missing id parameter');
    }
  }
};

export default PractitionerCard;
