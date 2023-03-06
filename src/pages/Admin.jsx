import React from 'react';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import {useSelector} from 'react-redux';
import { Container } from 'react-bootstrap';

const Admin = () => {
  const isLogin = useSelector(state=>state.admin.isLogin);
  const isLoading = useSelector(state=>state.tracking.status);
  return (
    <Container>
    {
      (isLogin && isLoading==="updated")?
      <Dashboard/>
      :
      <Login/>
    }
    </Container>
  )
}

export default Admin