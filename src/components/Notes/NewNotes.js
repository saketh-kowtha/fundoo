import React, {useState, useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux'

import './NewNotes.scss'

import {NOTES_COLORS} from '../../constants.js'

import Card from '../Card'

import Dropdown from '../Dropdown/Dropdown'

import Colleborators from '../Colleborators'

import showToast from '../Toast'

import geti18N from '../../strings'

import {ERROR} from '../../constants'

import { action } from '../../store';

import http from '../../services/http';

const {inValidNotes} = geti18N()

const colorPlate = (props) =>{
    return <div className="dropdown labels" {...props.container}>
        <Card className="color-list">
            {
                NOTES_COLORS.map((color, index) => <div {...props.plate} value={color} style={{backgroundColor: color, border: `1px solid ${index === 0 ? "black" : color}`}}></div>)
            }
        </Card>
    </div>
}

const NewNote = (props) => {

    const formatDate = (date) => {
        const _date = new Date(date)
        const month = _date.toLocaleString('default', { month: 'long' }).slice(0,3)
        const day = _date.getDate().toLocaleString()
        const time = _date.toLocaleString('default', { hour: 'numeric', minute: 'numeric',hour12: true }).toLocaleUpperCase()
        return `${month} ${day}, ${time}`
    }

    const [isExpanded, _props, getItem, isArchived , showColorPlate, color, showColleborators, showLabels, showReminder, getReminder] = useNotes(props.type)

    const feilds = ["collaberators", "labelIdList"]

    const expandedContent = <React.Fragment>
        <input type="text" autoComplete="new-password" name="title" placeholder={"Title"} {..._props.title}/>
        <input type="text" autoComplete="new-password" name="description" placeholder={"Take a Note"} {..._props.description}/>
        {
            getReminder ?
                <div key={"reminder"} title={`Remonder ${formatDate(getReminder)}`}  className={`label-items reminder`}>
                    <i className="material-icons-outlined">{"query_builder"}</i>
                    {formatDate(getReminder)}
                    <span name={"reminder"} id={getReminder} {..._props.reminder}>&times;</span>
                </div>
                : null
        }
        {
                feilds.map(e => {
                    return getItem(e).labels ? getItem(e).labels.map(rem => 
                         <div key={rem} title={`${e} ${e === "collaberators" ? rem.email : rem.label}`}  className={`label-items ${e}`}>
                             {e !== "collaberators" ? <i className="material-icons-outlined">{"label"}</i> : null}
                             {e !== "collaberators" ? rem.label : rem.email[0].toLocaleUpperCase() }
                            <span name={rem} {...getItem(e).props}>&times;</span>
                    </div>)  : null
                })
        }
        <div className="action-items">
            <span>
                <i className="material-icons-outlined" title="Reminder" {..._props.reminderIcon} title={"Reminder"}>notifications_active</i>
                {
                    showReminder
                    ? <div className="dropdown labels">
                        <Dropdown {..._props.reminderItmes} /></div>
                    : null
                }
            </span>
            <span>
                <i className="material-icons-outlined" title="Add Collobarate" {..._props.collaberators}>person_add</i>
            </span>
            <span>
                <i className="material-icons-outlined" title="Add Color" {..._props.colorPlate.root}>color_lens</i>
                {showColorPlate ? colorPlate(_props.colorPlate) : null}
            </span>
            <span>
                <i className="material-icons-outlined" title="Add Image">panorama</i>
            </span>
            <span>
                <i className="material-icons-outlined" {..._props.archive} title={isArchived ? "Unarchive" : "archive"} >{isArchived ? "unarchive" : "archive"}</i>
            </span>
            <span>
                <i className="material-icons-outlined" {..._props.labels}>label</i>
                {
                    showLabels 
                        ? <div className="dropdown labels">
                            <Dropdown filter={true} {
                            ..._props.dropDown
                        } /></div>
                        : null
                }
            </span>
            <span>
                <i className="closeBtn" {..._props.save}>Close</i>
            </span>
        </div>
        {
            showColleborators 
                ? <Colleborators {..._props.collaberatorsModal} />
                : null
        }
    </React.Fragment>

    return <div name="NewNote" style={{backgroundColor: color}} className="new-notes " {..._props.root}>
        {
            isExpanded 
            ? expandedContent
            : <input type="text" name="description" placeholder={"Take a Note"} {..._props.description}/>
        }
    </div>
}


//Custom Hooks
const useNotes = (name) => {

    useEffect(() => {

    })

    const dispatch = useDispatch()


    const defaultNotes = {
        title: "", 
        description: "", 
        isPined: false, 
        color: "", 
        isArchived: false,
        labelIdList: [],
        reminder: null,
        collaberators: []
    }

    const [isExpanded, setExpandNotes] = useState(false)

    const [notes, setNotes] = useState(defaultNotes)

    const [showColorPlate, setColorPlate] = React.useState(false)
    
    const [showColleborators, setShowColleborators] = React.useState(false)
    
    const [showReminder, setShowReminder] = React.useState(false)

    const [showLabels, setShowLabels] = React.useState(false)

    const labels = useSelector(state => state.label.data) || []

    const [reminderInput, setReminderInput] = useState({})

    const reset = () => {
        setNotes(defaultNotes)
        setExpandNotes(false)
    }

    const inputHandkler = (e) => {
        const _notes = {...notes}
        _notes[e.target.name] = e.target.value
        setNotes(_notes)
    }

    const save = () => {
        //API CALLp = 
        const formData = new FormData()
        for(let i in notes){
            if(i === "collaberators")
                formData.append(i, JSON.stringify(notes[i]))
            else if(i === "reminder")
                formData.append(i, notes[i] ? notes[i] : "")
            else if(i === "labelIdList" )
            {
                const labeList = notes.labelIdList.map(e => e.id)
                formData.append(i, JSON.stringify(labeList))
            }
            else
                formData.append(i, notes[i])
        }
        if(!notes.title && !notes.description){
            showToast(inValidNotes)
            return setExpandNotes(false)
        }
        action("ADD_NOTES", {form: formData, type: name})
        reset()
    }

    const _props = {
        root:{
            // onBlur: () => reset()
        },
        description: {
            onClick: () => setExpandNotes(true),
            onChange: inputHandkler,
            value: notes.description
        }, 
        title:{
            onChange: inputHandkler,
            value: notes.title
        },
        reminderIcon:{
            onClick: () => setShowReminder(!showReminder)
        },
        archive:{
            onClick: () => setNotes({...notes, isArchived: !notes.isArchived})
        },
        collaberators: {
            onClick: () => setShowColleborators(true)
        },
        collaberatorsModal: {
            list: notes.collaberators,
            onClose: (list) => {
                setNotes({...notes, collaberators: [...list]})
                setShowColleborators(false)
            }
        },
        colorPlate: {
            root:{
                onClick: () => setColorPlate(!showColorPlate)
            },
            container:{
                onMouseLeave: () => setColorPlate(false)
            },
            plate: {
                onClick: (e) => setNotes({...notes, color: e.target.getAttribute("value")})
            }
        },
        save:{
            onClick: save
        },
        labels:{
            onClick: () => setShowLabels(!showLabels)
        },
        dropDown:{
            items: labels.filter(_e => notes.labelIdList.map(l => l.id).indexOf(_e.id) === -1).map(e => {
                return {...e,data: e.label, onClick: (e) => setNotes({...notes, labelIdList: [...notes.labelIdList, {label: e.target.parentNode.getAttribute("data"), id: e.target.parentNode.id}]})}
            })
        },
        reminder:{
            onClick : (e) => setNotes({...notes, reminder: e.target.parentNode.id})
        },
        reminderItmes:{
            items: [{
                id: new Date(new Date(new Date()).getTime() + 60 * 60 * 8 * 1000).toISOString().toString(),
                label: `Later Today`,
                onClick: (e) => setNotes({...notes, reminder: [e.target.parentNode.id]})
            },
            {
                id: new Date(new Date(new Date()).getTime() + 60 * 60 * 24).toLocaleDateString().toString(),
                label: `Tomorrow ${new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true })}`,
                onClick: (e) => setNotes({...notes, reminder: [e.target.parentNode.id]})
            },
            {
                id: new Date(new Date(new Date()).getTime() + 60 * 60 * 24 * 8000).toISOString().toString(),
                label: `Next Week ${new Date().toLocaleString('en-US', { hour: 'numeric', hour12: true })}`,
                onClick: (e) => setNotes({...notes, reminder: [e.target.parentNode.id]})
            },
            {
                label: "Custom",
                type: "menu",
                items: [
                    {label: "Select Custom Date", type: "input", format: "date", onChange: (e) => setReminderInput({...reminderInput,  date: e.target.value})},
                    {label: "Select Custom Time", type: "input", format: "Time", onChange: (e) => setReminderInput({...reminderInput,  time: e.target.value})},
                    {label: "SAVE", onClick: () => setNotes({...notes, reminder: new Date(`${reminderInput.date} ${reminderInput.time}`).toISOString()})}
                ]
            }]
        }
    }

    const getItem = (item) => ({
        labels: notes[item],
        props: {
            onClick: (e) => {
                const _items = {...notes}
                _items[item].splice(_items[item].indexOf(e.target.getAttribute('name')), 1)
                setNotes(_items)
            }
        }
    })

    return [isExpanded, _props, getItem, notes.isArchived, showColorPlate , notes.color, showColleborators, showLabels, showReminder, notes.reminder]

}


export default NewNote;