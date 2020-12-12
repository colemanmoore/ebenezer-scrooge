import React from 'react'
import styles from './Grid.module.css'
import GridRow from './GridRow'
import GridHeader from './GridHeader'

function Grid({ children }) {

    return (
        <div className={styles.grid}>
            {children}
        </div>
    )
}

export default Grid