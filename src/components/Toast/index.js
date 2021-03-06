/**
 * @author Kowtha Saketh
 * @description Toast Component
 */

import React from 'react'
import ReactDom from 'react-dom'
import './toast.scss'
import {SUCCESS, ERROR} from '../../constants'


/**
 * @name Toast 
 * @param {*} props 
 */
const Toast = (props) => {
    let className = ["toast"]
    className.push((props.type !== SUCCESS ? ERROR : SUCCESS))
    return <div className={className.join(" ")}>
        {props.message}
    </div>
}


/**
 * @name showToast 
 * @param {*} props 
 */
const showToast = (data, type=SUCCESS) => {
    let toast = document.getElementById("toast")
    if(toast)
        toast.remove()
    let div = document.createElement('div')
    div.id = "toast"
    ReactDom.render(<Toast message={data} type={type}/>, document.body.appendChild(div))
    setTimeout(() => {
        div.remove()
    }, 3000)
}

export default showToast
