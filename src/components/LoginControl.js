import React from 'react';
import styled from 'styled-components';

const LoginControl = ({doLogin}) => (
  <Container onClick={doLogin}>
    with whom do I have the pleasure of speaking?
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
