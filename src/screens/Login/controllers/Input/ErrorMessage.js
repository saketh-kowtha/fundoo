import React from 'react'

const ErrorMessage = (props) => {
    return <span style={{marginTop: '60px', fontSize: '14px', color: 'red'}}>{props.message}</span>
    
}

export default ErrorMessage