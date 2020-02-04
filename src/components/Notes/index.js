import React from 'react'

import http from '../../services/http'

import showToast from '../Toast'

import "./Notes.scss"

import { action } from "../../store"

import {useSelector} from 'react-redux'

import Card from '../Card'
import List from '../List'


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
            color: this.props.item.color || "",
            showColorPlate: false,
            showMoreOptions: false
        }
    }

    handleArchive = () => {
        http.archiveNotes(this.props.item).then(success => {
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

    handleForeverDelete = () => {
        http.deleteForeverNotes(this.props.item.id).then(success => {
            if (success.data.success === true) {
                showToast("Deleted Successfully")
                return action("FETCH_TRASH")
            }
            return showToast("Something Went Wrong", "error")
        })
        .catch(error => {
            console.log(error)
            showToast("Something Went Wrong", "error")
        })
    }

    handleDelete = () => {
        http.trashNotes(this.props.item).then(success => {
            if (success.data.success === true) {
                showToast(!this.props.item.isDeleted ? "Moved To Trash..." : "Recovered Successfully...")
                return this.setState({isDeleted: !this.state.isDeleted})                
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

    handleColorPlateClick = (e) => {
        const COLOR = e.target.getAttribute("value")
        this.setState({color: COLOR}, () => {
            http.changesColorNotes(this.props.item,COLOR)
            .then(success => {
                showToast("Updated Successfully")
            })
            .catch(error => {
                console.log(error)
                showToast("Something Went Wrong", "error")
            })
        })
    }


    moreOptions = () =>{
        return <div className="dropdown menu" onClick={() => this.setState({showMoreOptions: false})} onMouseLeave={() => this.setState({showMoreOptions: false})} >
            <Card className="more-menu">
                {
                    this.state.isDeleted 
                    ? <List data={[{label: "Recover", onClick: this.handleDelete}, {label: "Delete Forever", onClick: this.handleForeverDelete}]} />
                    : <List data={[{label: "Delete Notes", onClick: this.handleDelete}]} />
                }
            </Card>
        </div>
    }

    colorPlate = () =>{
        return <div className="dropdown color" onClick={() => this.setState({showColorPlate: false})} onMouseLeave={() => this.setState({showColorPlate: false})} >
            <Card className="color-list">
                {
                    [
                        "#ffffff",
                        "#e59086",
                        "#f2bd42",
                        "#fef388",
                        "#d7fc9d",
                        "#bbfdec",
                        "#d2eff7",
                        "#b3cbf6",
                        "#d1b2f6",
                        "#f6d1e7",
                        "#e2caac",
                        "#e9eaed"
                    ].map((color, index) => <div onClick={this.handleColorPlateClick} value={color} style={{backgroundColor: color, border: `1px solid ${index === 0 ? "black" : color}`}}></div>)
                }
            </Card>
        </div>
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
        return <div className={"note"} style={{backgroundColor: this.state.color}} onDrop={()=>drop(event)} id={this.props.item.id} onDragOver={()=>allowDrop(event)} draggable={"true"} onDragStart={() => drag(event)}>
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
                    <i className="material-icons-outlined" title="Add Color" onClick={() => this.setState({showColorPlate: true})}>color_lens</i>
                    {this.state.showColorPlate ? this.colorPlate() : null}
                    <i className="material-icons-outlined" title="Add Image">panorama</i>
                    <i className="material-icons-outlined" title={this.state.isArchived ? "Unarchive" : "Archive"} onClick={this.handleArchive}>{this.state.isArchived ? "unarchive" : "archive"}</i>
                    <i className="material-icons-outlined" onClick={() => this.setState({showMoreOptions: true})}>more_vert</i>
                    {
                        this.state.showMoreOptions ? this.moreOptions() : null
                    }
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
            case 'trash':
                if (!this.state.isDeleted)
                    return null
                break

        }
        return this.getNotesView()
    }
}




export default Notes