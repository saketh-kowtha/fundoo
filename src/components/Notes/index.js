import React from 'react'

import http from '../../services/http'

import showToast from '../Toast'

import "./Notes.scss"

import { action } from "../../store"

import {useSelector} from 'react-redux'

import Card from '../Card'
import List from '../List'

import {NOTES_COLORS, ERROR, FETCH_TRASH} from '../../constants.js'
import geti18N from '../../strings'

import { withRouter } from "react-router-dom";

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
            props.data.map(item => <Note history={props.history} key={item.title} item={item} type={props.type}/>)    
        }
    </div>
}


/**
 * @author Kowtha Saketh
 * @description Note Component Individual Notes Card
 */

export class Note extends React.Component{
    state = {
        pin: this.props.item.isPined || false,
        isArchived: this.props.item.isArchived || false,
        isDeleted: this.props.item.isDeleted || false,
        color: this.props.item.color || "",
        showColorPlate: false,
        showMoreOptions: false
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
                action("FETCH_" + this.props.type.toLocaleUpperCase())
                return this.setState({pin: !this.state.pin})                
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
                action("FETCH_" + this.props.type.toLocaleUpperCase())
                return this.setState({pin: !this.state.pin})                
            }
            return showToast(somethingWrong, ERROR)    
        })
        .catch(error => {
            console.log(error)
            showToast(somethingWrong, ERROR)
        })
    }

    moreOptions = () =>{
        return <div className="dropdown menu" onClick={() => this.setState({showMoreOptions: false})} onMouseLeave={() => this.setState({showMoreOptions: false})} >
            <Card className="more-menu">
                {
                    this.state.isDeleted 
                    ? <List data={[{label: recover, onClick: this.handleDelete}, {label: deletePeremently, onClick: this.handleForeverDelete}]} />
                    : <List data={[{label: deleteNotes, onClick: this.handleDelete}]} />
                }
            </Card>
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
            
                P1.removeChild(T1);
                P2.removeChild(T2);
            } 
        }

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
        return <div tabIndex="0" editable={this.props.edit ? true : false}  className={"note"}  style={{backgroundColor: this.state.color}} onDrop={()=>drop(event)} id={this.props.item.id} onDragOver={()=>allowDrop(event)} draggable={"true"} onDragStart={() => drag(event)}>
                <section onClick={this.props.edit ? ()=>{} : () => this.props.history.push("/Note/" + this.props.item.id)}>
                    <div contentEditable={this.props.edit ? true : false} name="title" className="title" onBlur={this.updatedContent} dangerouslySetInnerHTML={{__html: this.props.item.title}} />
                    <div contentEditable={this.props.edit ? true : false} name="description" onBlur={this.updatedContent} className="description" dangerouslySetInnerHTML={{ __html: this.props.item.description }} />
                </section>
                {
                    this.props.item.noteLabels.map(label => 
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
                    this.props.item.collaborators.map(user => {
                        return <div key={user.email} className="collaberator" title={`${user.firstName} ${user.lastName} (${user.email})`}>{user.firstName[0]}</div>
                    })
                }


                <span className="pin">
                    <i className="material-icons-outlined" onClick={this.handlePin} title={this.state.pin ? "Unpin" : "Pin"}>{ !this.state.pin ? "link" : "link_off"}</i>
                </span>
                <div className="actions">
                    <i className="material-icons-outlined" title="Reminder" title={"Reminder"}>notifications_active</i>
                    <i className="material-icons-outlined" title="Add Collobarate">person_add</i>
                    <i className="material-icons-outlined" title="Add Color" onClick={() => this.setState({showColorPlate: true})}>color_lens</i>
                    {this.state.showColorPlate ? this.colorPlate() : null}
                    <i className="material-icons-outlined" title="Add Image">panorama</i>
                    <i className="material-icons-outlined" title={this.state.isArchived ? "Unarchive" : archive} onClick={this.handleArchive}>{this.state.isArchived ? "unarchive" : "archive"}</i>
                    <i className="material-icons-outlined" onClick={() => this.setState({showMoreOptions: true})}>more_vert</i>
                    {
                        this.state.showMoreOptions ? this.moreOptions() : null
                    }
                    <span className="closeBtn" onClick={this.handleNotesUpdate}>Close</span>
                </div>
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



export default withRouter(Notes)