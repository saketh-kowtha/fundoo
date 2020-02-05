import React, {useEffect, useState} from 'react'

import Modal from '../Modal'

import Loading from '../Loading'

import {Note} from './index.js'

import http from '../../services/http'

import "./Notes.scss"

import {withRouter} from 'react-router-dom'

const updateNotesView = withRouter((props) => {
    const ID = props.match.params.id
    if(!ID)
        return null
    
    const [item, setItem] = useState(false)
    useEffect( () => {
            http.getNoteById(ID).then(success =>{
                setItem(success.data.data[0])
            })
            .catch(error => {
                console.log(err)
            })

    }, [])

    return  !item 
                ? <Loading />
                : <Modal closeBtn={false} className="notes grid-row"><Note item={item} history={props.history} edit={true}/></Modal>
})

export default updateNotesView