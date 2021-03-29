import {
  EMPLOYEE_LIST,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  EDIT_EMPLOYEE_DETAIL,
} from './actionType';

export const employeeListAction = () => ({
  type: EMPLOYEE_LIST,
});

export const addEmployeeAction = newEmployee => ({
  type: ADD_EMPLOYEE,
  payload: newEmployee,
});

export const deleteEmployeeAction = id => ({
  type: DELETE_EMPLOYEE,
  payload: id,
});

export const editEmployeeAction = (id, updatedEmployeeDetail) => ({
  type: EDIT_EMPLOYEE_DETAIL,
  payload: { id, updatedEmployeeDetail },
});
