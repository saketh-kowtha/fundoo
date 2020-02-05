/**
 * @author Kowtha Saketh
 * @description Modal Component
 */


import React from 'react'

import "./modal.scss"

const Modal = (props) => {
    return <div className="modal">
                <div className={(props.className ? ` ${props.className}` : "modal-content")}>
                    <div>
                        {props.children}
                    </div>
                    {props.closeBtn ? <span className="close" onClick={props.onClose}>Close</span> : null}
                </div>
            </div> 
}


export default Modal