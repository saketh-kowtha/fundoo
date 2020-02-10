import React from 'react'

import "../Content.scss"

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { action } from "../../../../../store"

import Empty from '../../../../../components/Empty'

import Notes from '../../../../../components/Notes'

import NewNote from '../../../../../components/Notes/NewNotes'

import Loading from '../../../../../components/Loading'

import geti18N from '../../../../../strings'

const {notes, trash, archive, reminders} = geti18N()

import {FETCH_NOTES, FETCH_REMINDERS, FETCH_ARCHIVE, FETCH_TRASH} from '../../../../../constants'

class Layout extends React.PureComponent{

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

    fetchByLabel(){
        const labelName = (this.props.match.params && this.props.match.params.name)
        if(labelName === "") 
            return
        action("FETCH_BY_LABEL", labelName)
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
                break
            case 'Label':
                this.fetchByLabel()
                break;
        }
    }

    render() {
        if (!this.props.items || this.props.loading)
            return <Loading small/>
            
        return <React.Fragment>  
            {this.props.name === archive || this.props.name ===trash || this.props.name === "Label" ? null : <NewNote type={this.props.name}/>  }
            {
                this.props.items && this.props.items.length === 0 
                    ? <Empty name={this.props.name} />
                    : <Notes data={this.props.items} type={this.props.name}/>
            }
        </React.Fragment>        
    }

}



const mapStateToProps = (state) => ({ items: state.notes.data, loading: state.notes.loading })



export default withRouter(connect(mapStateToProps, null)(Layout))
