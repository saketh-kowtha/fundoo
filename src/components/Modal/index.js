/**
 * @author Kowtha Saketh
 * @description Modal Component
 */


import React from 'react'

import "./modal.scss"

const Modal = (props) => {
    return <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={props.onClose}>&times;</span>
                    <div>
                        {props.children}
                    </div>
                </div>
            </div> 
}


export default Modal