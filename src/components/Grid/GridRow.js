import React from 'react'
import classNames from 'classnames'
import style from './Grid.module.css'

function GridRow({ key, keys, data, selected, onClick }) {

    const deleteRow = () => {
        console.log('delete')
    }

    return (
        <div className={classNames(style.row, {[style.selectedRow]: selected})}
             onClick={onClick} onDoubleClick={deleteRow}
        >
            {keys.map(key => <div key={key} className={style.cell}>{data[key]}</div>)}
        </div>
    )
}

export default GridRow