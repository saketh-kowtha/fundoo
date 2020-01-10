import React from 'react'
import Warning from '@material-ui/icons/Warning';

const ErrorMessage = (props) => {
    return <span style={{ fontSize: '12px', marginLeft: '10px' }}><Warning style={{ fontSize: '10px' }} /> <span style={{ lineHeight: '10px' }}>{props.message}</span></span>
}

export default ErrorMessage