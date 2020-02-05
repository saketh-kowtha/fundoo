import React from 'react'

import {withRouter} from 'react-router-dom'

import { useSelector } from 'react-redux'

import Notes from './../../../../../components/Notes'

const Search = withRouter((props) => {
    const query = props.match.params.query
    const items = (!query || query.trim() === "" ) ? useSelector(state => state.notes.data) : useSelector(state => state.notes.data).filter(item => item.title.indexOf(query) > -1 || item.description.indexOf(query) > -1 )
    return <div>
        <Notes data={items} type={"Notes"}/>
    </div>
})


export default Search