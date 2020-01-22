/**
 * @author Kowtha Saketh
 * @description Button Component
 */

import React from 'react'

import './button.scss'
/**
 * @name Button
 * @param {*} props 
 * @description Button component
 */
const Button = (props) => {
    return <button className="btn" {...props}>
        {props.children}
    </button>
}

export default Button

