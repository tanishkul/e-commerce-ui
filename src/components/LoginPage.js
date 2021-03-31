/* eslint-disable react/button-has-type */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withSnackbar } from '../hoc/SnackBarHOC';
import { userActions } from '../view/user';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    const { logout } = this.props;
    // reset login status
    logout();

    this.state = {
      username: '',
      password: '',
      email: '',
      submitted: false
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (e) => {
    try {
      e.preventDefault();

      this.setState({ submitted: true });
      const { username, password, email } = this.state;
      const { login, history } = this.props;
      if ((username || email) && password) {
        const data = await login(username, email, password);
        console.log('data-------------', data, sessionStorage.getItem('user'))
        const user = localStorage.getItem('user');
        history.push('/', { user });
      }
    } catch (error) {
      console.log('11111111111111111111', error);
    }
  }

  render() {
    console.log('props------=++++++++', this.props)
    const { loggingIn } = this.props;
    const {
      username,
      email,
      password,
      submitted,
    } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={`form-group${submitted && !username ? ' has-error' : ''}`}>
            <label htmlFor="username">Username</label>
            <input className="form-control" name="username" onChange={this.handleChange} type="text" value={username} />
            {submitted && !username
                            && <div className="help-block">Username is required</div>
            }
          </div>
          <div className={`form-group${submitted && !email ? ' has-error' : ''}`}>
            <label htmlFor="email">Email</label>
            <input className="form-control" name="email" onChange={this.handleChange} type="text" value={email} />
            {submitted && !email
                            && <div className="help-block">Email is required</div>
            }
          </div>
          <div className={`form-group${submitted && !password ? ' has-error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              name="password"
              onChange={this.handleChange}
              type="password"
              value={password}
            />
            {submitted && !password
                            && <div className="help-block">Password is required</div>
            }
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
            {loggingIn && (
              <img
                alt=""
                src=""
              />
            )
            }
            <Link className="btn btn-link" to="/register">Register</Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggingIn: state.authentication?.loggingIn,
});

const mapDispatchToProps = dispatch => ({
  login: (username, email, password) => dispatch(userActions.login(username, email, password)),
  logout: () => dispatch(userActions.logout()),
});

const connectedLoginPage = withSnackbar(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
export { connectedLoginPage as LoginPage };
