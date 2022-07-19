import React from 'react';
import styled from 'styled-components';
import {MONEY_KEY, BALANCE_KEY} from '../constants';

const EntryRow = ({keys, data, selected, onClick, onDoubleClick}) => {
  return (
    <Container selected={selected} onClick={onClick}
               onDoubleClick={onDoubleClick}>
      {keys.map(key => {
        return (
          <Cell
            key={key}
            debt={data.debt && key === MONEY_KEY}
            balance={key === BALANCE_KEY}
            negative={key === BALANCE_KEY && data[key] < 0}
          >
            {data[key]}
          </Cell>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  ${props => props.selected ? 'background-color: var(--selectionColor);' : ''}
`;

const Cell = styled.div`
  flex: 1;
  padding: 5px;
  ${props => (props.debt || props.negative) ? 'color: var(--redBright);' : ''}
  ${props => props.balance ? 'font-weight: bold;' : ''}
  cursor: pointer;
  &:not(:first-child) {
    border-left: 1px solid var(--grayLight);
  }
  &:first-child {
    text-align: right;
  }
  &:nth-child(2) {
    text-align: center;
  }
`;

export default EntryRow;
