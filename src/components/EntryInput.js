import React from 'react'

class EntryInput extends React.Component {
    render() {
        const { type, name, placeholder, value } = this.props
        return (
            <input
                {...{type, name, placeholder, value}}
                onChange={this.onChange}
                style={{
                    lineHeight: '2rem',
                    fontSize: '1rem',
                    outline: 'none',
                    marginRight: '10px',
                    marginBottom: '20px',
                    padding: '0 5px',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderBottom: '2px solid #999999',
                    borderLeft: '2px solid #aaaaaa'
                }}
            />
        )
    }

    onChange = (event) => {
        // this.props.updateValue(this.props.name, event.target.value);
    }
}

export default EntryInput
