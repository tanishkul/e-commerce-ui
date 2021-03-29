/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../view/user';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        password: ''
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { register } = this.props;
    if (user.firstName && user.lastName && user.username && user.password) {
      register(user);
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={`form-group${submitted && !user.firstName ? ' has-error' : ''}`}>
            <label htmlFor="firstName">First Name</label>
            <input
              className="form-control"
              name="firstName"
              onChange={this.handleChange}
              type="text"
              value={user.firstName}
            />
            {submitted && !user.firstName
                            && <div className="help-block">First Name is required</div>
            }
          </div>
          <div className={`form-group${submitted && !user.lastName ? ' has-error' : ''}`}>
            <label htmlFor="lastName">Last Name</label>
            <input
              className="form-control"
              name="lastName"
              onChange={this.handleChange}
              type="text"
              value={user.lastName}
            />
            {submitted && !user.lastName
                            && <div className="help-block">Last Name is required</div>
            }
          </div>
          <div className={`form-group${submitted && !user.username ? ' has-error' : ''}`}>
            <label htmlFor="username">Username</label>
            <input
              className="form-control"
              name="username"
              onChange={this.handleChange}
              type="text"
              value={user.username}
            />
            {submitted && !user.username
                            && <div className="help-block">Username is required</div>
            }
          </div>
          <div className={`form-group${submitted && !user.password ? ' has-error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              name="password"
              onChange={this.handleChange}
              type="password"
              value={user.password}
            />
            {submitted && !user.password
                            && <div className="help-block">Password is required</div>
            }
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
            {registering
                            && (
                              <img
                                alt=""
                                src=""
                              />
                            )
            }
            <Link className="btn btn-link" to="/login">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapState(state) {
  if (state && state.registration) {
    const { registering } = state.registration;
    return { registering };
  }
}

const actionCreators = {
  register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
