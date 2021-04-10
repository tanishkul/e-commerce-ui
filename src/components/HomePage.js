import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import store from '../store';
import { withSnackbar } from '../hoc/SnackBarHOC';

import { userActions } from '../view/user';
import Table from './Table';

class HomePage extends React.Component {
  componentDidMount() {
    const { getUsers } = this.props;
    getUsers();
  }

  handleDeleteUser(id) {
    const { deleteUser } = this.props;
    const { snackbarShowMessage } = this.props;

    const data = deleteUser(id).then((res) => {
      snackbarShowMessage('User deleted successfully!');
    }).catch((err) => {
      snackbarShowMessage('User deletion failed!', 'error');
    });
  }

  render() {
    const { user, users } = this.props;
    const items = [
      // {
      //   label: 'Edit',
      //   onClick: id => navigate(`/employee/edit/${id}`,
      //     { state: { employeeDetails: employee.filter((_, index) => index === id), id } }),
      // },
      {
        label: 'Delete',
        onClick: id => this.handleDeleteUser(id),
      },
    ];
    if (!users) {
      return (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <CircularProgress />
        </div>
      )
    }
    if (user && users) {
      const allUsers = users.filter(item => item.originalId !== user.originalId);
      return (
        <div className="col-md-6 col-md-offset-3">
          <h1>
            {`Hi ${user.name}!`}
          </h1>
          <p>You are logged in with React!!</p>
          {users?.error && (
            <span className="text-danger">
  ERROR:
              {users?.error}
            </span>
          )}
          {(user.role === 'ADMIN') && <Table data={allUsers} menuItems={items} />}
          <p>
            <Link to="/login">Logout</Link>
          </p>
        </div>
      );
    }
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>
          {'Hi!'}
        </h1>
        <p>You are not logged in with React!!</p>
        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer?.user,
  users: state.userReducer?.items,
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(userActions.getAll()),
  deleteUser: id => dispatch(userActions.delete(id)),
});

const connectedHomePage = withSnackbar(connect(mapStateToProps, mapDispatchToProps)(HomePage));
export { connectedHomePage as HomePage };
