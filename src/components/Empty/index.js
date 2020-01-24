import React from 'react'

import './Empty.scss'

const Empty = (props) => {
    const feild = {
        "notes": {
            icon: "emoji_objects",
            text: "Notes you add appear here"
        },
        "reminders": {
            icon: "notifications",
            text: "Notes with upcoming reminders appear here"
        },
        "archive": {
            icon: "archive",
            text: "Your archived notes appear here"
        },
        "trash": {
            icon: "delete",
            text: "No notes in Trash"
        }
    }
    return <div className="empty-container">
        <i className="material-icons-outlined">{feild[props.name].icon}</i>
        <span>{feild[props.name].text}</span>
    </div>
}

export default Empty