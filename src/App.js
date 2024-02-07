import { useEffect } from 'react';
import './App.css';
import AdminLayout from './components/adminLayout/AdminLayout';
import { Switch, Route } from "react-router-dom";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { generateUserTokenAPI } from './redux/actions/user-login-api';
import ErrorPage from './components/pages/error';

function App() {
  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    verifyUserToken();
  }, [])

  const verifyUserToken = async () => {
    if (true) {
      dispatch(generateUserTokenAPI({ CustId: "JAY123" }))
      // dispatch(generateUserTokenAPI({ CustId: "TAX541" }))
      history.push('holiday');
      return
    }
  }

  return (
    <Switch>
      <Route path="/userprofile" >
        <AdminLayout />
      </Route>
      <Route path="/404" >
        <ErrorPage />
      </Route>
      <Route path="/holiday" >
        <AdminLayout />
      </Route>
      <Route path="/employee" >
        <AdminLayout />
      </Route>
      <Route path="/attendance" >
        <AdminLayout />
      </Route>
      <Route path="/payroll" >
        <AdminLayout />
      </Route>
      <Route path="/payrollitems" >
        <AdminLayout />
      </Route>
      <Route path="/event" >
        <AdminLayout />
      </Route>
      <Route path="/leavemanagement" >
        <AdminLayout />
      </Route>
      <Route path="/assetmanagement" >
        <AdminLayout />
      </Route>
      <Route path="/recruitmentmanagement" >
        <AdminLayout />
      </Route>
      <Route path="/announcement" >
        <AdminLayout />
      </Route>
      <Route path="/policies" >
        <AdminLayout />
      </Route>
    </Switch >
  );
}

export default App;