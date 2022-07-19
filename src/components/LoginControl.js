import React from 'react';
import styled from 'styled-components';
import {LOGIN_PROMPT} from '../constants';

const LoginControl = ({doLogin}) => (
  <Container onClick={doLogin}>
    {LOGIN_PROMPT}
  </Container>
);

const Container = styled.div`
  background-color: #eeedfe;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.1s ease-out;
`;

export default LoginControl;
