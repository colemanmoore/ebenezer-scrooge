import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import styled from 'styled-components';
import {BALANCE_LABEL} from '../constants';
import {useApi} from '../hooks/useApi';

function CurrentBalance() {

  const {balance, updateAccount} = useApi();
  const {register, handleSubmit, reset, setValue} = useForm();
  const balanceInput = register('balance', {
    defaultValues: {balance: balance}
  });

  useEffect(() => {
    setValue('balance', balance);
  }, [balance])

  const onSubmit = data => {
    console.log('submit', data)
    const val = +data.balance;
    if (isNaN(val)) {
      reset();
    } else {
      updateAccount({balance: val});
    }
  };

  return (
    <Container>
      <Label>{BALANCE_LABEL}</Label>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...balanceInput}
          size={12}
          type='text'
        />
      </form>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.h2`
  display: inline;
  margin-right: 15px;
  font-weight: 200;
`;

const Input = styled.input`
  display: inline;
  outline: none;
  font-size: 1.3rem;
  padding: 5px;
  background-color: #ebfaeb;
  border: none;
  text-align: center;
  border-radius: 9px;
  font-weight: bold;
`;

export default CurrentBalance;
