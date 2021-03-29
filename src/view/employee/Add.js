/* eslint-disable react/display-name */
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import Form from './components';
import { addEmployeeAction } from './actions';

const Add = memo(() => {
  const dispatch = useDispatch();

  return (
    <div>
      <Form
        buttonName="Add"
        onSubmit={newEmployee => dispatch(addEmployeeAction(newEmployee))}
        type="Add Employee Detail"
      />
    </div>
  );
});

export default Add;
