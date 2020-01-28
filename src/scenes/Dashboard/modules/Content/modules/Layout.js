import React from 'react'

import "./Layout.scss"

import { connect } from 'react-redux';

import { action } from "../../../../../store"

import Empty from '../../../../../components/Empty'

import Notes from '../../../../../components/Notes'

import Loading from '../../../../../components/Loading'

import { Card } from '../../../../../components';


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


    input() {
        return <div>
            <input type="text" placeholder={"Take a Note"} />

        </div>
    }


    UNSAFE_componentWillMount() {
        switch (this.props.name) {
            case "notes":
                this.fetchNotes()
                break;
            case "reminder":
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
        if (this.props.loading)
            return <Loading />
        
        
        return <div className="content">
            {this.input()}
            <div className="row">
                {
                    this.props.items && this.props.items.length === 0 
                        ? <Empty name={this.props.name} />
                        : this.props.items.map(item => <Notes key={item.title} data={item} />)
               }
            </div>
        </div>        
    }

}



const mapStateToProps = (state) => ({ items: state.layout.data,loading: state.layout.loading })


export default connect(mapStateToProps, null)(Layout)