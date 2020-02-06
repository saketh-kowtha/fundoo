import React from 'react'

import "../Content.scss"

import { connect } from 'react-redux';

import { action } from "../../../../../store"

import Empty from '../../../../../components/Empty'

import Notes, {Note} from '../../../../../components/Notes'

import NewNote from '../../../../../components/Notes/NewNotes'

import Loading from '../../../../../components/Loading'

import geti18N from '../../../../../strings'

const {notes, trash, archive, reminders} = geti18N()

import {FETCH_NOTES, FETCH_REMINDERS, FETCH_ARCHIVE, FETCH_TRASH} from '../../../../../constants'

class Layout extends React.PureComponent{

    constructor(props) {
        super(props)
    }


    fetchNotes() {
        action(FETCH_NOTES)
    }

    fetchReminders() {
        action(FETCH_REMINDERS)
    }

    fetchArchive() {
        action(FETCH_ARCHIVE)
    }

    fetchTrash() {
        action(FETCH_TRASH)
    }



    UNSAFE_componentWillMount() {
        switch (this.props.name) {
            case notes:
                this.fetchNotes()
                break;
            case reminders:
                this.fetchReminders()
                break;
            case trash:
                this.fetchTrash()
                break;
            case archive:
                this.fetchArchive()
                break;
        }
    }



    render() {
        const empty = {
            isPined: false,
            title:"Hello",
            description: "world",
            isArchived: false,
            isDeleted: false,
            reminder: [],
            noteLabels: [],
            collaborators: []
        }

        if (!this.props.items || this.props.loading)
            return <Loading small/>

        return <React.Fragment>  
            <NewNote />         
            {
                this.props.items && this.props.items.length === 0 
                    ? <Empty name={this.props.name} />
                    : <Notes data={this.props.items} type={this.props.name}/>
            }
        </React.Fragment>        
    }

}



const mapStateToProps = (state) => ({ items: state.notes.data, loading: state.notes.loading })


export default connect(mapStateToProps, null)(Layout)
