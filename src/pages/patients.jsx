import React, { Component } from 'react';
import { format } from 'date-fns';
import { getPatients } from '../services';
import Table from '../components/Table';
import { Input, Button } from '@material-ui/core';

class Patients extends Component {
  state = {
    patients: [],
    name: '',
    dob: '',
    time: ''
  };

  compare = (a, b) => {
    if (a.dob < b.dob) {
      return -1;
    }
    if (a.dob > b.dob) {
      return 1;
    }
    return 0;
  };

  setTime() {
    this.setState({
      time: format(new Date(), "EEE d MMM yyyy 'at' kk:mm:ss")
    });
  }

  componentDidMount() {
    getPatients(this.props.name, this.props.dob).then(res => {
      this.setState({
        patients: this.flattenPatientsObj(res)
      });
    });

    this.setTime();
  }

  flattenPatientsObj = response => {
    return (response.data.entry || [])
      .map(item => {
        const name = item.resource.name || [];
        return {
          id: item.resource.id,
          name: `${((name[0] || {}).given || []).join(' ')} ${
            (name[0] || {}).family
          }`,
          gender: item.resource.gender,
          dob: item.resource.birthDate,
          photo:
            'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
        };
      })
      .sort(this.compare);
  };

  onSubmit() {
    getPatients(this.state.name, this.state.dob).then(res => {
      this.setState({
        patients: this.flattenPatientsObj(res)
      });
    });

    this.setTime();
  }

  render() {
    const { name, dob, patients, time } = this.state;

    return (
      <div className="main-container">
        <h1 className="title">Results as of {time}</h1>
        <div className="inputs-container">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            className="input"
            onChange={({ target: { value } }) => this.setState({ name: value })}
          />
          <Input
            type="date"
            value={dob}
            className="input"
            onChange={({ target: { value } }) => this.setState({ dob: value })}
          />
          <Button type="submit" onClick={() => this.onSubmit()}>
            Search
          </Button>
        </div>
        <Table name={name} dob={dob} patients={patients} />
      </div>
    );
  }
}

export default Patients;
