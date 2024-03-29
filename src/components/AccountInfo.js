import React from 'react';
import styled from 'styled-components';
import {useAuth} from '../hooks/useAuth';

const AccountInfo = () => {
  const {user, logout} = useAuth();

  return (
    <Container>
      {user.photoURL
        ? <img alt="avatar" style={Image} src={user.photoURL}/>
        : null
      }
      <span>{user.displayName}</span>
      <LogoutLink onClick={logout}>Logout</LogoutLink>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
`;

const Image = {
  height: '1.2em',
  marginRight: '0.7em',
  marginBottom: '-3px',
};

const LogoutLink = styled.span`
  display: block;
  text-align: right;
  margin-top: 6px;
  font-size: 12px;
  color: var(--grayDark);
  cursor: pointer;
`;

export default AccountInfo;
