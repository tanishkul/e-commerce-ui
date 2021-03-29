/* eslint-disable react/display-name */
import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editEmployeeAction } from './actions';
import Form from './components';

const Edit = memo(() => {
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <div>
      <Form
        buttonName="Update"
        employeeData={location.state.employeeDetails[0]}
        onSubmit={updatedEmployeeDetail => dispatch(editEmployeeAction(location.state.id,
          updatedEmployeeDetail))}
        type="Edit Employee Detail"
      />
    </div>
  );
});

export default Edit;
