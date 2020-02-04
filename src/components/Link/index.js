/**
 * @author Kowtha Saketh
 * @description Link Component
 */

import React from 'react'

import './link.scss'

/**
 * @name Link
 * @param {*} props 
 */
const Link = (props) => {
    if(props.small)
        return <span tabindex="0" onKeyDown={(event) => event.keyCode === 13 ? props.onClick() : null} className="link small" {...props}>{props.name}</span>
    return <span tabindex="0"  className="link" {...props}>{props.name}</span>
}

export default Link