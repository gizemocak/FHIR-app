import React, { Component } from 'react';
import {
  Table as MTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

class Table extends Component {
  render() {
    const { patients } = this.props;
    return (
      <MTable>
        <TableHead>
          <TableRow>
            <TableCell>Profile Image</TableCell>
            <TableCell>FullName</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Date of Birth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map(patient => (
            <TableRow key={patient.id}>
              <TableCell>
                <img
                  src={patient.photo}
                  alt="Avatar"
                  style={{ height: 50, width: 50, borderRadius: '50%' }}
                />
              </TableCell>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.dob}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MTable>
    );
  }
}

export default Table;
