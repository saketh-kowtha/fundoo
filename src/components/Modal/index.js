/**
 * @author Kowtha Saketh
 * @description Modal Component
 */


import React from 'react'

import "./modal.scss"

const Modal = (props) => {
    return <div className="modal">
                <div className="modal-content">
                    <div>
                        {props.children}
                    </div>
                    <span className="close" onClick={props.onClose}>Close</span>        
                </div>
            </div> 
}


export default Modal