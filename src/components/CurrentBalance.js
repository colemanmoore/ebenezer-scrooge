import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useApi} from '../hooks/useApi';
import styled from 'styled-components';

function CurrentBalance() {

  const api = useApi();

  const {register, handleSubmit, setValue, reset} = useForm({
    defaultValues: {
      balance: api.account ? api.account.balance : null,
    },
  });

  useEffect(() => {
    if (api.account) {
      setValue('balance', api.account.balance);
    }
  }, [api.account, setValue]);

  const onSubmit = data => {
    const val = +data.balance;
    if (isNaN(val)) {
      reset();
    } else {
      api.updateAccount({balance: val});
    }
  };

  return (
    <Container>
      <Label>balance?</Label>
      <form style={{display: 'inline'}} onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="balance"
          ref={register()}
          size={12}
          type="text"
        />
      </form>
    </Container>
  );
}

const Container = styled.div`
  padding: 10px;
  text-align: center;
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
