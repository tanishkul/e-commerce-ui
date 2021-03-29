/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Typography, TextField, Button,
} from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number';
import { useNavigate } from 'react-router-dom';

const Form = ({
  buttonName,
  type,
  onSubmit,
  employeeData = {},
}) => {
  const [name, setName] = useState(employeeData.name || '');
  const [department, setDepartment] = useState(employeeData.department || '');
  const [employeeId, setEmployeeId] = useState(employeeData.employeeId || '');
  const [mobileNumber, setMobileNumber] = useState(employeeData.mobileNumber || null);
  const [experience, setExperience] = useState(employeeData.experience || null);

  const navigate = useNavigate();

  const handleClick = () => {
    if (name && department && employeeId && mobileNumber && experience) {
      const employeeDetails = {
        name, department, employeeId, mobileNumber, experience,
      };
      onSubmit(employeeDetails);
      navigate('/');
    }
  };

  return (
    <Container maxWidth="sm">
      <br />
      <br />
      <Typography variant="h4">{type}</Typography>
      <br />
      <br />
      <TextField
        fullWidth
        id="outlined-full-width"
        InputLabelProps={{
          shrink: true,
        }}
        label="Name"
        onChange={e => setName(e.target.value)}
        placeholder="Enter name"
        style={{ margin: 8 }}
        value={name}
        variant="outlined"
      />
      <TextField
        fullWidth
        id="outlined-full-width"
        InputLabelProps={{
          shrink: true,
        }}
        label="Department"
        margin="normal"
        onChange={e => setDepartment(e.target.value)}
        placeholder="Enter department"
        style={{ margin: 8 }}
        value={department}
        variant="outlined"
      />
      <TextField
        fullWidth
        id="outlined-full-width"
        InputLabelProps={{
          shrink: true,
        }}
        label="Employee id"
        margin="normal"
        onChange={e => setEmployeeId(e.target.value)}
        placeholder="Enter employee id"
        style={{ margin: 8 }}
        value={employeeId}
        variant="outlined"
      />
      <MuiPhoneNumber
        data-cy="user-phone"
        defaultCountry="in"
        fullWidth
        label="Mobile Number"
        onChange={value => setMobileNumber(value)}
        style={{ margin: 8 }}
        value={mobileNumber}
        variant="outlined"
      />
      <TextField
        fullWidth
        id="outlined-full-width"
        InputLabelProps={{
          shrink: true,
        }}
        label="Experience"
        margin="normal"
        onChange={e => setExperience(e.target.value)}
        placeholder="Year of experience"
        style={{ margin: 8 }}
        type="number"
        value={experience}
        variant="outlined"
      />
      <Button
        align="right"
        color="primary"
        onClick={() => handleClick()}
        style={{ marginTop: 8, float: 'right' }}
        variant="contained"
      >
        {buttonName}
      </Button>
      <Button
        align="right"
        color="primary"
        onClick={() => navigate('/')}
        style={{ marginTop: 8, marginLeft: '60%' }}
        variant="contained"
      >
        Cancel
      </Button>
    </Container>
  );
};

Form.defaultProps = {
  onSubmit: () => {},
  type: 'Employee form',
};

Form.propTypes = {
  buttonName: PropTypes.string,
  department: PropTypes.string,
  employeeData: PropTypes.object,
  employeeId: PropTypes.string,
  experience: PropTypes.string,
  mobileNumber: PropTypes.string,
  name: PropTypes.string,
  onSubmit: PropTypes.func,
  type: PropTypes.string,
};

export default Form;
