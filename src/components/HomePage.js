/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../view/user';

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
    console.log('this props-------------', this.props)
    const { users } = this.props;
    const { location: { state: { user } } } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>
          {`Hi ${user?.firstName}!`}
        </h1>
        <p>You are logged in with React!!</p>
        <h3>All registered users:</h3>
        {users?.loading && <em>Loading users...</em>}
        {users?.error && (
          <span className="text-danger">
ERROR:
            {users?.error}
          </span>
        )}
        {users?.items
                    && (
                      <ul>
                        {users.items.map((userDetails, index) => (
                          <li key={userDetails.id}>
                            {`${userDetails.firstName} ${userDetails.lastName}`}
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
        }
        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  if (authentication) {
    const { user } = authentication;
    return { user, users };
  }
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
