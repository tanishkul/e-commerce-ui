import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Card,
  Typography,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { Heading } from '.';
import { Menu } from '..';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const column = ['Name', 'Department', 'EmployeeId', 'Mobile Number', 'Experience(Year)', 'Actions'];

export default function SimpleTable({ data, menuItems }) {
  const classes = useStyles();
  const employeeData = data && data.length && data.map(({
    name, department, employeeId, mobileNumber, experience, actions,
  }) => ({
    name, department, employeeId, mobileNumber, experience, actions,
  }));

  return (
    <TableContainer component={Card}>
      <Table aria-label="simple table" className={classes.table}>
        <Heading column={column} />
        <TableBody>
          {employeeData && employeeData.length ? employeeData.map((row, index) => (
            <TableRow key={row.toString()}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.department}</TableCell>
              <TableCell align="right">{row.employeeId}</TableCell>
              <TableCell align="right">{row.mobileNumber}</TableCell>
              <TableCell align="right">{row.experience}</TableCell>
              <TableCell align="right">
                <Menu data={row} ids={index} menuItems={menuItems} />
              </TableCell>
            </TableRow>
          )) : <Typography gutterBottom variant="h5">No employee available for now please add employee ! </Typography>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SimpleTable.propTypes = {
  data: PropTypes.array.isRequired,
  menuItems: PropTypes.array.isRequired,
};
