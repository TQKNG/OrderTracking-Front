import React from 'react';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import {useSelector} from 'react-redux';
import { Container } from 'react-bootstrap';

const Admin = () => {
  const isLogin = useSelector(state=>state.admin.isLogin);
  return (
    <Container>
    {
      (isLogin)?
      <Dashboard/>
      :
      <Login/>
    }
    </Container>
  )
}

export default Admin