/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { userActions } from '../view/user';
import Table from './Table';

class HomePage extends React.Component {
  componentDidMount() {
    const { getUsers } = this.props;
    getUsers();
  }

  handleDeleteUser(id) {
    const { deleteUser } = this.props;
    return e => deleteUser(id);
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
      return (
        <div className="col-md-6 col-md-offset-3">
          <h1>
            {`Hi ${user.name}!`}
          </h1>
          <p>You are logged in with React!!</p>
          <h3>All registered users:</h3>
          {/* {users?.loading && <em>Loading users...</em>} */}
          {users?.error && (
            <span className="text-danger">
  ERROR:
              {users?.error}
            </span>
          )}
          {/* {users
                      && (
                        <ul>
                          {users.map((userDetails, index) => (
                            <li key={userDetails.id}>
                              {`${userDetails.name} ${userDetails.email}`}
                              {
                                userDetails.deleting ? <em> - Deleting...</em>
                                  : (userDetails.deleteError) ? (
                                    <span className="text-danger">
                                      {' '}
  - ERROR:
                                      {userDetails.deleteError}
                                    </span>
                                  )
                                    : (
                                      <span>
                                        {' '}
  -
                                        <a onClick={this.handleDeleteUser(userDetails.id)}>Delete</a>
                                      </span>
                                    )
                              }
                            </li>
                          ))}
                        </ul>
                      )
          } */}
          <Table data={users} menuItems={items} />
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
});

const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export { connectedHomePage as HomePage };
