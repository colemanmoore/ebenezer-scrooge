import React, {useState, useEffect} from 'react';
import EntryRow from './EntryRow';
import massage from '../util/entries';
import {useApi} from '../hooks/useApi';
import styled from 'styled-components';

function EntriesDisplay() {

  const api = useApi();
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (api.account) {
      setRows(massage(api.account, api.entries));
    }
  }, [api.account, api.entries]);

  const clickRow = rowIdx => setSelectedIdx(rowIdx);

  const doubleClickRow = async rowId => {
    await api.deleteEntry(rowId);
    await api.refreshEntries();
  };

  const keys = [
    'date', 'title', 'money', 'balance',
  ];

  return (
    <Container>
      {rows.map((row, idx) => {
        return <EntryRow
          key={idx}
          keys={keys}
          selected={selectedIdx === idx}
          onClick={clickRow.bind(null, idx)}
          onDoubleClick={doubleClickRow.bind(null, row.id)}
          data={row}
        />;
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

export default EntriesDisplay;
