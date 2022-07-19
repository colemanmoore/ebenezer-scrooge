import React from 'react';
import {useForm} from 'react-hook-form';
import {useApi} from '../hooks/useApi';
import {validateDate, validateMoney, createDate} from '../util/util';
import styled from 'styled-components';
import Plus from './Plus';

const EntryForm = () => {

  const {addEntry} = useApi();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {date: '', title: '', money: ''},
  });

  const onSubmit = data => {
    const date = createDate(data.date);
    const title = data.title;
    const money = parseInt(data.money);

    if (date && title && money) {
      addEntry({date, title, money}).then(() => {
        reset();
      }).catch(() => {
        console.log('Error adding entry');
        reset();
      });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('date', {
            validate: value => validateDate(value)
          })}
          placeholder="Date"
        />
        <input
          {...register('title', {
            validate: value => !!value
          })}
          placeholder="Title"
        />
        <input
          {...register('money', {
            validate: value => validateMoney(value)
          })}
          placeholder="Income/Debt"
        />
        <button disabled={!isValid}>
          <Plus height={'2rem'} disabled={!isValid} />
        </button>
      </Form>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Form = styled.form`
  --fieldSize: 10rem;
  @media screen and (min-width: 600px) {
    --fieldSize: 15rem;
  }
  
  display: grid;
  grid-template-columns: repeat(2, var(--fieldSize));
  grid-template-rows: repeat(2, 1fr);

  > * {
    max-width: var(--fieldSize);
  }
  
  & > input {
    line-height: 2rem;
    font-size: 1rem;
    outline: none;
    margin-right: 40px;
    margin-bottom: 20px;
    padding: 0 5px;
    border-top: none;
    border-right: none;
    border-bottom: 1px solid var(--grayLight);
    border-left: none;
    transition: color 0.5s, border-bottom-color 0.5s;

    &::placeholder {
      color: var(--greenMoney);
    }
  }
  
  button {
    border: none;
    background: transparent;
    width: 3em;
    height: 3em;
    display: inline;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  button[disabled] {
    cursor: auto;
  }
`;

export default EntryForm;
