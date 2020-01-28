import React from 'react'

import "./Notes.scss"

const Notes = (props) => {
    return <div className="notes">
            {props.data.title}
    </div>
}

export default Notes