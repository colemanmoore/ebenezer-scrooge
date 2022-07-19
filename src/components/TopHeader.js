import React from 'react'
import {TITLE} from '../constants';

const TopHeader = () => (
  <div style={{
    textAlign: 'center',
    fontSize: '34px',
    fontFamily: 'Times, serif',
    letterSpacing: '5px',
    marginTop: '2.2em',
    marginBottom: '1em'
  }}>
    {TITLE}
  </div>
)

export default TopHeader
