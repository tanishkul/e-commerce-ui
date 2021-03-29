import {
  EMPLOYEE_LIST, DELETE_EMPLOYEE, ADD_EMPLOYEE, EDIT_EMPLOYEE_DETAIL,
} from './actionType';

const initialState = {
  employees: [],
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_LIST: return {
      ...state,
      employees: state.employees,
    };
    case DELETE_EMPLOYEE: return {
      ...state,
      employees: state.employees.filter((_, index) => index !== action.payload),
    };
    case ADD_EMPLOYEE: return {
      ...state,
      employees: [...state.employees, action.payload],
    };
    case EDIT_EMPLOYEE_DETAIL: return {
      ...state,
      employees: state.employees.map((item, index) => (index !== action.payload.id
        ? item : action.payload.updatedEmployeeDetail)),
    };
    default: return state;
  }
};

export const getEmployeeList = state => state.employeeReducer.employees;
