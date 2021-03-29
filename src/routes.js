import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch as SwitchRoutes } from 'react-router-dom';
import NavBar from './components/Navbar';

// const CountHooks = lazy(() => import('./view/count/CountHooks'));
// const CountWithClass = lazy(() => import('./view/count/CountWithClass'));
// const EmployeeList = lazy(() => import('./view/employee/List'));
// const AddEmployeeDetail = lazy(() => import('./view/employee/Add'));
// const EditEmployeeDetail = lazy(() => import('./view/employee/Edit'));

const Routes = () => (
  <Router>
    <NavBar />
    <SwitchRoutes>
      <Route
        element={(
          <Suspense fallback={<p>Loading</p>}>
            {/* <EmployeeList name="" /> */}
          </Suspense>
        )}
        path="/"
      />
      <Route
        element={(
          <Suspense fallback={<p>Loading</p>}>
            {/* <CountHooks heading="" /> */}
          </Suspense>
        )}
        path="/hooks"
      />
      <Route
        element={(
          <Suspense fallback={<p>Loading</p>}>
            {/* <CountWithClass heading="" /> */}
          </Suspense>
        )}
        path="/class"
      />

      <Route
        element={(
          <Suspense fallback={<p>Loading</p>}>
            {/* <EditEmployeeDetail /> */}
          </Suspense>
        )}
        exact
        path="employee/edit/:id"
      />
      <Route
        element={(
          <Suspense fallback={<p>Loading</p>}>
            {/* <AddEmployeeDetail /> */}
          </Suspense>
        )}
        exact
        path="employee/add"
      />
    </SwitchRoutes>
  </Router>
);

export default Routes;
