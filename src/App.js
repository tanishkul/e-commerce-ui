// /* eslint-disable react/display-name */
// /* eslint-disable react/prefer-stateless-function */
// import React, { Component, memo } from 'react';
// // import { BrowserRouter, Route, Switch } from 'react-router-dom'
// // import { Navbar } from './components';
// import { Provider } from 'react-redux';
// import { Container, CssBaseline } from '@material-ui/core';
// import store from './store';
// import Routes from './routes';

// // class App extends Component {
// //   render() {
// //     return (
// //       <BrowserRouter>
// //         <div className="App">
// //           <Navbar />
// //           {/* <Switch>
// //             <Route component={Home} exact path="/" />
// //             <Route component={Cart} path="/cart" />
// //           </Switch> */}
// //         </div>
// //       </BrowserRouter>

// //     );
// //   }
// // }

// // export default App;

// const App = memo(() => (
//   <>
//     <CssBaseline />
//     <Container>
//       <Provider store={store}>
//         <Routes />
//       </Provider>
//     </Container>
//   </>
// ));
// export default App;
// -----------------------------------------
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './helpers';
// import { alertActions } from './view/alert';
import { PrivateRoute } from './components/PrivateRoute';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import Alert from './components/Alert';

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      const { clearAlerts } = this.props;
      clearAlerts();
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            {alert?.message
                            && <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Router history={history}>
              <Switch>
                {/* <Alert /> */}
                <PrivateRoute component={HomePage} exact path="/" />
                {/* <Route component={HomePage} exact path="/" /> */}
                <Route component={LoginPage} exact path="/login" />
                <Route component={RegisterPage} path="/register" />
                <Redirect from="*" to="/" />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  // clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
