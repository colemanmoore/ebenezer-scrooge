import React from 'react'
import classNames from 'classnames'
import style from './Grid.module.css'

function GridRow({ keys, data, selected, onClick, onDoubleClick }) {

    return (
        <div className={classNames(style.row, {[style.selectedRow]: selected})}
             onClick={onClick} onDoubleClick={onDoubleClick}
        >
            {keys.map(key => <div key={key} className={style.cell}>{data[key]}</div>)}
        </div>
    )
}

export default GridRow