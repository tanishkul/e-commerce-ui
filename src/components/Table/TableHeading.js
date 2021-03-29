import React from 'react';
import { TableHead, TableCell, TableRow } from '@material-ui/core';
import { PropTypes } from 'prop-types';

const TableHeading = ({ column }) => (
  <TableHead>
    <TableRow>
      {column
        && column.length
        && column.map((heading, index) => (index === 0
          ? <TableCell>{heading}</TableCell> : <TableCell align="right">{heading}</TableCell>))}
    </TableRow>
  </TableHead>
);
TableHeading.propTypes = {
  column: PropTypes.array.isRequired,
};

export default TableHeading;
