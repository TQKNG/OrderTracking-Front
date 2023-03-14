import React from 'react';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import {useSelector} from 'react-redux';
import { Container, Row, Spinner } from 'react-bootstrap';

const Admin = () => {
  const isLogin = useSelector(state=>state.admin.isLogin);
  const isLoading = useSelector(state=>state.admin.isLoading)
  return (
    <Container>
    {
      (isLogin)?
        <Dashboard/>
      :
      <Login/>
    }
    {
      isLoading&&
        <Row style={{alignItems:"center", justifyContent:"center"}}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Row>
    }
    </Container>
  )
}

export default Admin