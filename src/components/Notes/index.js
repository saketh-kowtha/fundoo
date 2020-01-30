import React from 'react'

import http from '../../services/http'

import showToast from '../Toast'

import "./Notes.scss"



const Note = ({ item, type }) => {
    let [pin, setPin] = React.useState(item.isPined)
    let [isArchived, setArchived] = React.useState(item.isArchived)

    const handleArchive = () => {
        http.archiveNotes(item).then(success => {
            console.log(success)
            if (success.data.success === true) {
                showToast("Updated Successfully")
                return setArchived(!isArchived)                
            }
            return showToast("Something Went Wrong", "error")
        })
        .catch(error => {
            console.log(error)
            showToast("Something Went Wrong", "error")
        })
    }

    const handlePin = () => {
        http.pinUnpinNotes(item).then(success => {
            if (success.data.success === true) {
                showToast("Updated Successfully")
                return setPin(!isArchived)                
            }
            return showToast("Something Went Wrong", "error")

        })
            .catch(error => {
            console.log(error)
            showToast("Something Went Wrong", "error")
        })
    }

  
}

const Notes = (props) => {
    return <div className="notes">
        {
            props.data.map(item => <Note key={item.title} item={item} type={props.type}/>)    
        }
    </div>
}


class Note extends React.Component{
    render() {
        return <div className="note" style={{backgroundColor: this.props.item.color}}>
            <span className="title" dangerouslySetInnerHTML={{__html: this.props.item.title}} />
            <span className="description" dangerouslySetInnerHTML={{ __html: this.props.item.description }} />
            <span className="pin">
                <i className="material-icons-outlined" onClick={handlePin} title={this.state.pin ? "Unpin" : "Pin"}>{ this.state.pin ? "link" : "link_off"}</i>
            </span>
            <span className="actions">
                <i className="material-icons-outlined" title="Reminder" title={"Reminder"}>notifications_active</i>
                <i className="material-icons-outlined" title="Add Collobarate">person_add</i>
                <i className="material-icons-outlined" title="Add Color">color_lens</i>
                <i className="material-icons-outlined" title="Add Image">panorama</i>
                <i className="material-icons-outlined" title={isArchived ? "Unarchive" : "Archive"} onClick={handleArchive}>archive</i>
                <i className="material-icons-outlined">more_vert</i>
            </span>
        </div>
    }
}

export default Notes