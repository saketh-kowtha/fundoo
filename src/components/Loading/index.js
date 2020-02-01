import React from 'react'

import './Loading.scss'

const Loading = (props) => {
    return <div className={"loader" + (props.type==='small' ? " small-loader" : "")}>
      
    </div>
}

export default Loading