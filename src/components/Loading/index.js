import React from 'react'

import './Loading.scss'

const Loading = (props) => {
    return <section className={"loader" + (props.type==='small' ? " small-loader" : "")}>
      
    </section>
}

export default Loading