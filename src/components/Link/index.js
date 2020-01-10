import React from 'react'

import './link.scss'
const Link = (props) => {
    if(props.small)
        return <span className="link small" {...props}>{props.name}</span>
    return <span className="link" {...props}>{props.name}</span>
}

export default Link