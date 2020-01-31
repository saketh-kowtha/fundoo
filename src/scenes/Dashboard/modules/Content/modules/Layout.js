import React from 'react'

import "../Content.scss"

import { connect } from 'react-redux';

import { action } from "../../../../../store"

import Empty from '../../../../../components/Empty'

import Notes, {Note} from '../../../../../components/Notes'

import Loading from '../../../../../components/Loading'


class Layout extends React.PureComponent{

    constructor(props) {
        super(props)
    }


    fetchNotes() {
        action("FETCH_NOTES")
    }

    fetchReminders() {
        action("FETCH_REMINDERS")
    }

    fetchArchive() {
        action("FETCH_ARCHIVE")
    }

    fetchTrash() {
        action("FETCH_TRASH")
    }

    fetchLabel(name) {
        action("FETCH_LABEL", name)
    }


    


    UNSAFE_componentWillMount() {
        switch (this.props.name) {
            case "notes":
                this.fetchNotes()
                break;
            case "reminders":
                this.fetchReminders()
                break;
            case "trash":
                this.fetchTrash()
                break;
            case "archive":
                this.fetchArchive()
                break;
        }
    }



    render() {
        if (!this.props.items || this.props.loading)
            return <Loading />
        
        return <React.Fragment>
                {
                    this.props.items && this.props.items.length === 0 
                        ? <Empty name={this.props.name} />
                    : <Notes data={this.props.items} type={this.props.name}/>
               }
        </React.Fragment>        
    }

}



const mapStateToProps = (state) => ({ items: state.layout.data, loading: state.layout.loading })


export default connect(mapStateToProps, null)(Layout)