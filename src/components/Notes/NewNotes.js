import React, {useState, useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux'

import './NewNotes.scss'

import {NOTES_COLORS} from '../../constants.js'

import Card from '../Card'

import Colleborators from '../Colleborators'

import showToast from '../Toast'

import geti18N from '../../strings'

import {ERROR} from '../../constants'

import { action } from '../../store';

const {inValidNotes} = geti18N()

const colorPlate = (props) =>{
    return <div className="dropdown color" {...props.container}>
        <Card className="color-list">
            {
                NOTES_COLORS.map((color, index) => <div {...props.plate} value={color} style={{backgroundColor: color, border: `1px solid ${index === 0 ? "black" : color}`}}></div>)
            }
        </Card>
    </div>
}

const NewNote = (props) => {


    const [isExpanded, _props, getItem, isArchived , showColorPlate, color, showColleborators] = useNotes()

    const feilds = ["reminder", "collaberators", "labelIdList"]

    const expandedContent = <React.Fragment>
        <input type="text" name="title" placeholder={"Title"} {..._props.title}/>
        <input type="text" name="description" placeholder={"Take a Note"} {..._props.description}/>
        {
                feilds.map(e => {
                    return getItem(e).labels.map(rem => 
                        <div key={rem} title={`${e} ${e === "collaberators" ? rem.email : rem}`}  className={`label-items ${e}`}>
                             {e !== "collaberators" ? <i className="material-icons-outlined">{e === "labelIdList" ? "label" : "query_builder" }</i> : null}
                             {e !== "collaberators" ? rem : rem.email[0].toLocaleUpperCase() }
                            <span name={rem} {...getItem(e).props}>&times;</span>
                    </div>)
                })
        }
        <div className="action-items">
                    <i className="material-icons-outlined" title="Reminder" title={"Reminder"}>notifications_active</i>
                    <i className="material-icons-outlined" title="Add Collobarate" {..._props.collaberators}>person_add</i>
                    <i className="material-icons-outlined" title="Add Color" {..._props.colorPlate.root}>color_lens</i>
                    {showColorPlate ? colorPlate(_props.colorPlate) : null}
                    <i className="material-icons-outlined" title="Add Image">panorama</i>
                    <i className="material-icons-outlined" {..._props.archive} title={isArchived ? "Unarchive" : "archive"} >{isArchived ? "unarchive" : "archive"}</i>
                    <i className="closeBtn" {..._props.save}>Close</i>
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
const useNotes = () => {

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
        reminder: [],
        collaberators: []
    }

    const [isExpanded, setExpandNotes] = useState(false)

    const [notes, setNotes] = useState(defaultNotes)

    const [showColorPlate, setColorPlate] = React.useState(false)
    
    const [showColleborators, setShowColleborators] = React.useState(false)

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
        if(!notes.title && !notes.description)
            return showToast(inValidNotes, ERROR)
        const temp = {...notes}
        temp.reminder = JSON.stringify(temp.reminder)
        temp.labelIdList = JSON.stringify(temp.labelIdList)
        temp.collaberators = JSON.stringify(temp.collaberators)
        action("ADD_NOTES", temp)
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
        archive:{
            onClick: () => setNotes({...notes, isArchived: !notes.isArchived})
        },
        collaberators: {
            onClick: () => setShowColleborators(true)
        },
        collaberatorsModal: {
            list: notes.collaberators,
            onClose: (list) => {
                console.log(list, notes.collaberators)
                setNotes({...notes, collaberators: [...list]})
                setShowColleborators(false)
            }
        },
        colorPlate: {
            root:{
                onClick: () => setColorPlate(true)
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

    return [isExpanded, _props, getItem, notes.isArchived, showColorPlate , notes.color, showColleborators]

}


export default NewNote;