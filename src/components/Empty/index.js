/**
 * @author Kowtha Saketh
 * @description Empty Component
 */

import React from 'react'

import './Empty.scss'

import geti18N from "../../strings"

const {emptyNotes, notificationsEmpty, emptyArchive, emptyTrash} = geti18N()

const Empty = (props) => {
    const feild = {
        "notes": {
            icon: "emoji_objects",
            text: emptyNotes
        },
        "reminders": {
            icon: "notifications",
            text: notificationsEmpty
        },
        "archive": {
            icon: "archive",
            text: emptyArchive
        },
        "trash": {
            icon: "delete",
            text: emptyTrash
        }
    }
    return <div className="empty-container">
        <i className="material-icons-outlined">{feild[props.name].icon}</i>
        <span>{feild[props.name].text}</span>
    </div>
}

export default Empty