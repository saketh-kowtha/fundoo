import React from 'react'

import http from '../../services/http'

import showToast from '../Toast'

import "./Notes.scss"

import {useSelector} from 'react-redux'



const Notes = (props) => {
    const store = useSelector(store => store)
    return <div className={"notes" + (store.layout.grid === "column" ? " grid-column" : " grid-row")}>
        {
            props.data.map(item => <Note key={item.title} item={item} type={props.type}/>)    
        }
    </div>
}


export class Note extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            pin: this.props.item.isPined || false,
            isArchived: this.props.item.isArchived || false,
            isDeleted: this.props.item.isDeleted || false,
            color: this.props.item.color || ""
        }
    }
    handleArchive = () => {
        http.archiveNotes(this.props.item).then(success => {
            console.log(success)
            if (success.data.success === true) {
                showToast("Updated Successfully")
                return this.setState({isArchived: !this.state.isArchived})                
            }
            return showToast("Something Went Wrong", "error")
        })
        .catch(error => {
            console.log(error)
            showToast("Something Went Wrong", "error")
        })
    }

    handlePin = () => {
        http.pinUnpinNotes(this.props.item).then(success => {
            if (success.data.success === true) {
                showToast("Updated Successfully")
                return this.setState({pin: !this.state.pin})                

            }
            return showToast("Something Went Wrong", "error")

        })
            .catch(error => {
            console.log(error)
            showToast("Something Went Wrong", "error")
        })
    }

    getNotesView = () => {
        let reminder = []
        if(this.props.item.reminder.length > 0){
            reminder = this.props.item.reminder.map(date => {
                const _date = new Date(date)
                const month = _date.toLocaleString('default', { month: 'long' }).slice(0,3)
                const day = _date.getDate().toLocaleString()
                const time = _date.toLocaleString('default', { hour: 'numeric', minute: 'numeric',hour12: true }).toLocaleUpperCase()
                return `${month} ${day}, ${time}`
            })
        }
        return <div className={"note"} style={{backgroundColor: this.state.color}}>
                <span className="title" dangerouslySetInnerHTML={{__html: this.props.item.title}} />
                <span className="description" dangerouslySetInnerHTML={{ __html: this.props.item.description }} />
                {
                    reminder.map(rem => <span key={rem} title={"Reminder: " + rem} className="reminder"><i className="material-icons-outlined">query_builder</i> {rem}</span>)
                }
                {
                    this.props.item.collaborators.map(user => {
                        return <span key={user.email} className="collaberator" title={`${user.firstName} ${user.lastName} (${user.email})`}>{user.firstName[0]}</span>
                    })
                }


                <span className="pin">
                    <i className="material-icons-outlined" onClick={this.handlePin} title={this.state.pin ? "Unpin" : "Pin"}>{ !this.state.pin ? "link" : "link_off"}</i>
                </span>
                <span className="actions">
                    <i className="material-icons-outlined" title="Reminder" title={"Reminder"}>notifications_active</i>
                    <i className="material-icons-outlined" title="Add Collobarate">person_add</i>
                    <i className="material-icons-outlined" title="Add Color">color_lens</i>
                    <i className="material-icons-outlined" title="Add Image">panorama</i>
                    <i className="material-icons-outlined" title={this.state.isArchived ? "Unarchive" : "Archive"} onClick={this.handleArchive}>{this.state.isArchived ? "unarchive" : "archive"}</i>
                    <i className="material-icons-outlined">more_vert</i>
                </span>
            </div>
    }

    render() {
        switch (this.props.type) {
            case 'notes':
                if (this.state.isArchived || this.state.isDeleted) {
                    return null                    
                }
                break
            case 'archive':
                if (!this.state.isArchived || this.state.isDeleted)
                    return null
                break

        }
        return this.getNotesView()
    }
}




export default Notes