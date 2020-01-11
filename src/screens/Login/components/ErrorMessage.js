import React from 'react'
import Warning from '@material-ui/icons/Warning';

const ErrorMessage = (props) => {
    return <span style={{marginTop: '38px', fontSize: '14px', color: 'red'}}>{props.message}</span>
    
}

export default ErrorMessage