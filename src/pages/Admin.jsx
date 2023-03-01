import React from 'react';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import {useSelector} from 'react-redux';

const Admin = () => {
  const isLogin = useSelector(state=>state.admin.isLogin);
  return (
    <>
    {
      isLogin?
      <Dashboard/>
      :
      <Login/>
    }
    </>
  )
}

export default Admin