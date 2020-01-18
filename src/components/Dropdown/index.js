import React from 'react'

import './dropdown.scss'

const Dropdown = (props) => {
    return <select className="dropdown" onChange={props.onChange}>
                {props.data.map(e => <option value={e}>{e}</option>)}
            </select>
}



export default Dropdown