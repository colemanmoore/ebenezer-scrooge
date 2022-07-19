import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import EntryRow from './EntryRow';
import {massage} from '../util/entries';
import {ENTRY_KEYS} from '../constants';
import {useApi} from '../hooks/useApi';

function EntriesDisplay() {

  const {refreshEntries, entries, balance, deleteEntry} = useApi();
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!entries || !entries.length) {
      refreshEntries().catch(error => {
        console.error('Error fetching entries', error);
      });
    } else if (entries?.length && !!balance) {
      setRows(massage(balance, entries));
    }
  }, [balance, entries, refreshEntries]);

  const clickRow = rowIdx => setSelectedIdx(rowIdx);

  const doubleClickRow = async rowId => {
    await deleteEntry(rowId);
    refreshEntries();
  };

  console.log(rows);
  return (
    <Container>
      {rows.map((row, idx) => (
        <EntryRow
          key={row.id}
          keys={ENTRY_KEYS}
          data={row}
          selected={selectedIdx === idx}
          onClick={clickRow.bind(null, idx)}
          onDoubleClick={doubleClickRow.bind(null, row.id)}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

export default EntriesDisplay;
