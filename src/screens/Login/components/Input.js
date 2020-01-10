import React from 'react'
import ErrorMessage from './ErrorMessage'

const LoginInput = (props) => {
    return  <div className="input-group">
                <input type="text" />
                <span>{props.name}</span>
            </div>
}

export default LoginInput