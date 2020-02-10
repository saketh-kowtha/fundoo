import React from 'react'

import http from '../../services/http'

import showToast from '../Toast'

import "./Notes.scss"

import { action } from "../../store"

import {useSelector, connect} from 'react-redux'

import Card from '../Card'

import Colleborators from '../Colleborators'

import {NOTES_COLORS, ERROR, FETCH_TRASH} from '../../constants.js'

import geti18N from '../../strings'

import {getRandomColor} from '../../helper'

import { withRouter } from "react-router-dom";
import Dropdown from '../Dropdown/Dropdown'

const {updatedSuccessfullyMsg, somethingWrong, movedToTrash, recoverSuccessfully, deletedSuccessfully, recover, deletePeremently, deleteNotes, notes, trash, archive} = geti18N()
/**
 * @author Kowtha Saketh
 * Notes Root Component
 * @param {*} props List of notes
 */
const Notes = (props) => {
    const store = useSelector(store => store)
    return <div className={"notes" + (store.layout.grid === "column" ? " grid-column" : " grid-row")}>
        {
            props.data.map(item => <Note  history={props.history} key={item.id} item={item} type={props.type}/>)    
        }
    </div>
}


/**
 * @author Kowtha Saketh
 * @description Note Component Individual Notes Card
 */

class NoteCard extends React.Component{
    state = {
        pin: this.props.item.isPined || false,
        isArchived: this.props.item.isArchived || false,
        isDeleted: this.props.item.isDeleted || false,
        color: this.props.item.color || "",
        showColorPlate: false,
        showMoreOptions: false,
        showReminder: false,
        colleboartorModal: false,
        collaborators: this.props.item.collaborators || [],
        noteLabels: this.props.item.noteLabels || [],
        reminder: this.props.item.reminder
    }

    /**
     * @name handleArchive
     * @description Handles Notes Archive Action
     */

     //sagas
    // handleArchive = () => {
    //     action("UPDATE_ARCHIVE", this.props.item)
    // }
    handleArchive = () => {
        http.archiveNotes(this.props.item).then(success => {
            if (success.data.success === true) {
                showToast(updatedSuccessfullyMsg)
                return this.setState({isArchived: !this.state.isArchived})                
            }
            return showToast(somethingWrong, ERROR)
        })
        .catch(error => {
            console.log(error)
            showToast(somethingWrong, ERROR)
        })
    }

    /**
     * 
     */
    handleForeverDelete = () => {
        http.deleteForeverNotes(this.props.item.id).then(success => {
            if (success.data.success === true) {
                showToast(deletedSuccessfully)
                return action(FETCH_TRASH)
            }
            return showToast(somethingWrong, ERROR)
        })
        .catch(error => {
            console.log(error)
            showToast(somethingWrong, ERROR)
        })
    }

    handleDelete = () => {
        http.trashNotes(this.props.item).then(success => {
            if (success.data.success === true) {
                showToast(!this.props.item.isDeleted ? movedToTrash : recoverSuccessfully)
                return this.setState({isDeleted: !this.state.isDeleted})                
            }
            return showToast(somethingWrong, ERROR)
        })
        .catch(error => {
            console.log(error)
            showToast(somethingWrong, ERROR)
        })
    }

    handlePin = () => {
        http.pinUnpinNotes(this.props.item).then(success => {
            if (success.data.success === true) {
                showToast(updatedSuccessfullyMsg)
                return this.setState({pin: !this.state.pin})                

            }
            return showToast(somethingWrong, ERROR)

        })
            .catch(error => {
            console.log(error)
            showToast(somethingWrong, ERROR)
        })
    }

    handleLabelDelete = (labelId) => {
        http.removeLabel(this.props.item.id, labelId)
        .then(success => {
            if (success.data.success === true) {
                showToast(updatedSuccessfullyMsg)
                return this.setState({noteLabels: [...this.state.noteLabels.filter(e => e.id !== labelId)]})
            }
            return showToast(somethingWrong, ERROR)    
        })
        .catch(error => {
            console.log(error)
            showToast(somethingWrong, ERROR)
        })
    }

    handleColorPlateClick = (e) => {
        const COLOR = e.target.getAttribute("value")
        this.setState({color: COLOR}, () => {
            http.changesColorNotes(this.props.item,COLOR)
            .then(success => {
                showToast(updatedSuccessfullyMsg)
            })
            .catch(error => {
                console.log(error)
                showToast(somethingWrong, ERROR)
            })
        })
    }

    handleReminderDelete = () => {
        http.removeReminderNotes(this.props.item.id)
        .then(success => {
            if (success.data.success === true) {
                showToast(updatedSuccessfullyMsg)
                return action("FETCH_" + this.props.type.toLocaleUpperCase())                        
            }
            return showToast(somethingWrong, ERROR)    
        })
        .catch(error => {
            console.log(error)
            showToast(somethingWrong, ERROR)
        })
    }

    handleAddLabel = (e) => {
        const labelId = e.target.parentNode.id
        const value = e.target.parentNode.getAttribute("data")
        http.addLabel(this.props.item.id, labelId)
        .then(success => {
            if (success.data.success === true) {
                showToast(updatedSuccessfullyMsg)
                return this.setState({noteLabels: [...this.state.noteLabels, {label: value, id: labelId}]})
            }
            return showToast(somethingWrong, ERROR)    
        })
        .catch(error => {
            console.log(error)
            showToast(somethingWrong, ERROR)
        })
    }

    moreOptions = () =>{
        return <div className="dropdown menu" onMouseLeave={() => this.setState({showMoreOptions: false})}>
            {
            !this.state.isDeleted ?
                <Dropdown items={[{label: deleteNotes, onClick: this.handleDelete}, {
                            label:"Add Labels", 
                            type: "menu",
                            filter: true, 
                            items: [...this.props.labels.filter(({label}) => !this.state.noteLabels.some(ele => ele.label === label)).map(e => ({...e,data: e.label, onClick: this.handleAddLabel}))]}
                    ]}/>
                : <Dropdown  items={[{label: recover, onClick: this.handleDelete}, {label: deletePeremently, onClick: this.handleForeverDelete}]} />
            }
            </div>
    }

    colorPlate = () =>{
        return <div className="dropdown color" onClick={() => this.setState({showColorPlate: false})} onMouseLeave={() => this.setState({showColorPlate: false})} >
            <Card className="color-list">
                {
                    NOTES_COLORS.map((color, index) => <div onClick={this.handleColorPlateClick} value={color} style={{backgroundColor: color, border: `1px solid ${index === 0 ? "black" : color}`}}></div>)
                }
            </Card>
        </div>
    }

    updatedContent = (e) => {
        this.setState({
            [e.currentTarget.getAttribute("name")]: e.currentTarget.textContent
        })
    }

    handleNotesUpdate = () => {
        if(!this.state.title && !this.state.description)
            return this.props.history.go(-1)
        else if((this.state.title && this.state.title === this.props.item.title) || (this.state.description && this.state.description === this.props.item.description))
            return this.props.history.go(-1)
        action("UPDATE_NOTES", {
            title: this.state.title || this.props.item.title, 
            description: this.state.description || this.props.item.description, 
            type: this.props.type,
            noteId: this.props.item.id
        })
        this.props.history.go(-1)
    }

    handleAddReminder = () =>{
        const payLoad = {reminder: new Date(this.state.rdate + " " + this.state.rtime).toISOString(), noteIdList: [this.props.item.id]}
        http.addUpdateReminder(payLoad)
        .then(success => {
            if (success.data.success === true) {
                showToast(updatedSuccessfullyMsg)
                return this.setState({reminder: [payLoad.reminder]})
            }
            return showToast(somethingWrong, ERROR)    
        })
        .catch(error => {
            console.log(error)
            showToast(somethingWrong, ERROR)
        })
    }

    getNotesView = () => {
        const allowDrop = (ev) => ev.preventDefault();
          
        const drag = (ev) => ev.dataTransfer.setData("id", ev.target.id);
          
        const drop = (ev) =>  {
            ev.preventDefault()
            SwapNode(ev.target.id, ev.dataTransfer.getData("id"));
        }

        const SwapNode = (N1, N2) => {
            N1 = document.getElementById(N1);
            N2 = document.getElementById(N2);
            
            if (N1 && N2) {
                const P1 = N1.parentNode;
                const T1 = document.createElement("span");    
                P1.insertBefore(T1, N1);
        
                const P2 = N2.parentNode;
                const T2 = document.createElement("span");
                P2.insertBefore(T2, N2);
        
                P1.insertBefore(N2, T1);
                P2.insertBefore(N1, T2);
            2
                P1.removeChild(T1);
                P2.removeChild(T2);
            } 
        }

        const handleCollobratorClose = (list) => {
            this.setState({collaborators: list})
            this.setState({colleboartorModal: false})
        }

        let reminder = []
        if(this.props.item.reminder.length > 0){
            reminder = this.state.reminder.map(date => {
                const _date = new Date(date)
                const month = _date.toLocaleString('default', { month: 'long' }).slice(0,3)
                const day = _date.getDate().toLocaleString()
                const time = _date.toLocaleString('default', { hour: 'numeric', minute: 'numeric',hour12: true }).toLocaleUpperCase()
                return `${month} ${day}, ${time}`
            })
        }
        return <div tabIndex="0" editable={this.props.edit ? true : false}  className={"note"}  style={{backgroundColor: this.state.color}} onDrop={()=>drop(event)} id={this.props.item.id} onDragOver={()=>allowDrop(event)} draggable={"true"} onDragStart={() => drag(event)}>
                <section onClick={this.props.edit ? ()=>{} : () => this.props.history.push("/Note/" + this.props.item.id)}>
                    <div contentEditable={this.props.edit ? true : false} name="title" className="title" onBlur={this.updatedContent} dangerouslySetInnerHTML={{__html: this.props.item.title}} />
                    <div contentEditable={this.props.edit ? true : false} name="description" onBlur={this.updatedContent} className="description" dangerouslySetInnerHTML={{ __html: this.props.item.description }} />
                </section>
                {
                    this.state.noteLabels.map(label => 
                        <div key={label.label} title={"Label: " + label.label} className="labels" >
                            <i className="material-icons-outlined">label</i> 
                            {label.label}
                            <span onClick={() => this.handleLabelDelete(label.id)}>&times;</span>
                        </div>)
                }
                {
                    reminder.map(rem => 
                        <div key={rem} title={"Reminder: " + rem} className="reminder">
                            <i className="material-icons-outlined">query_builder</i> 
                            {rem}
                            <span onClick={this.handleReminderDelete}>&times;</span>
                        </div>)
                }
                {
                    this.state.collaborators.map(user => {
                        return <div key={user.email} className={`collaberator ${getRandomColor(user.email[0])}`} title={`${user.firstName} ${user.lastName} (${user.email})`}>{user.firstName[0]}</div>
                    })
                }


                <span className="pin">
                    <i className="material-icons-outlined" onClick={this.handlePin} title={this.state.pin ? "Unpin" : "Pin"}>{ !this.state.pin ? "link" : "link_off"}</i>
                </span>
                <div className="actions">
                    <span style={{position: "relative"}}>
                        <i className="material-icons-outlined" title="Reminder" onClick={() => this.setState({showReminder: !this.state.showReminder})} title={"Reminder"}>notifications_active</i>
                        {
                            this.state.showReminder ? 
                                <Dropdown items={[{
                                    id: new Date(new Date(new Date()).getTime() + 60 * 60 * 8 * 1000).toISOString().toString(),
                                    label: `Later Today`,
                                    onClick: (e) => this.setState({reminder: [e.target.parentNode.id]})
                                },
                                {
                                    id: new Date(new Date(new Date()).getTime() + 60 * 60 * 24).toLocaleDateString().toString(),
                                    label: `Tomorrow ${new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true })}`,
                                    onClick: (e) =>  this.setState({reminder: [e.target.parentNode.id]})
                                },
                                {
                                    id: new Date(new Date(new Date()).getTime() + 60 * 60 * 24 * 8000).toISOString().toString(),
                                    label: `Next Week ${new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true })}`,
                                    onClick: (e) =>  this.setState({reminder: [e.target.parentNode.id]})
                                },
                                {
                                    label: "Custom",
                                    type: "menu",
                                    items: [
                                        {label: "Select Custom Date", type: "input", format: "date", onChange: (e) => this.setState({rdate: e.target.value})},
                                        {label: "Select Custom Time", type: "input", format: "Time", onChange: (e) => this.setState({rtime: e.target.value})},
                                        {label: "SAVE", onClick: this.handleAddReminder }
                                    ]
                                }]} />
                            : null
                        }
                    </span>
                        <i className="material-icons-outlined" title="Add Collobarate" onClick={() => this.setState({colleboartorModal: true})}>person_add</i>
                    <span>
                        <i className="material-icons-outlined" title="Add Color" onClick={() => this.setState({showColorPlate: !this.state.showColorPlate})}>color_lens</i>
                        {this.state.showColorPlate ? this.colorPlate() : null}
                    </span>
                    <i className="material-icons-outlined" title="Add Image">panorama</i>
                    <i className="material-icons-outlined" title={this.state.isArchived ? "Unarchive" : archive} onClick={this.handleArchive}>{this.state.isArchived ? "unarchive" : "archive"}</i>
                    <i className="material-icons-outlined" onClick={() => this.setState({showMoreOptions: !this.state.showMoreOptions})}>more_vert</i>
                    {
                        this.state.showMoreOptions ? this.moreOptions() : null
                    }
                    <span className="closeBtn" onClick={this.handleNotesUpdate}>Close</span>
                </div>
                {
                        this.state.colleboartorModal 
                        ? <Colleborators list={this.state.collaborators} notesId={this.props.item.id} onClose={handleCollobratorClose} />
                        : null
                    }
            </div>
    }

    render() {
        switch (this.props.type) {
            case notes:
                if (this.state.isArchived || this.state.isDeleted) {
                    return null                    
                }
                break
            case archive:
                if (!this.state.isArchived || this.state.isDeleted)
                    return null   
                break
            case trash:
                if (!this.state.isDeleted)
                    return null     
                break

        }
        return this.getNotesView()
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        openCollaborator: (colleboartors) => dispatch({type: "OPEN_COLLABORATOR", data: colleboartors})
    }
}

const mapStateToProps = (state) => {
    return {labels: state.label.data}
}
export const Note = connect(mapStateToProps,mapDispatchToProps)(NoteCard)


export default withRouter(Notes)