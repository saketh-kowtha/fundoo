import React from 'react'
import './sidebar.scss'
import List from '../../../../components/List'
import { connect } from 'react-redux';
import { modifyTitle } from '../../../../actions/fundooTitleAction'

import {toggleSidebar} from '../../../../actions/layoutActions'

import { withRouter } from "react-router-dom";
import Modal from '../../../../components/Modal';

import showToast from '../../../../components/Toast';

import {action} from '../../../../store'

import http from "../../../../services/http"

import {primary, secondary} from '../../../../config/sidebarItems'
import Loading from '../../../../components/Loading';

class Sidebar extends React.PureComponent{
    state = {
        activeElement: this.props.location && this.props.location.pathname ? this.props.location.pathname.slice(1, this.props.location.pathname.length) : "Notes",
        modal: false,
        labelInput: ""
    }

    componentWillMount() {
        this.labelInput = []
        action("FETCH_LABELS")
    }

    setActivelement = (element) =>{
        this.setState({activeElement: element}, () => {
            this.props.modifyTitle(this.state.activeElement)
        })
    }

    deleteLabel = (labelName) => {
        //Delete Action
        http.deleteLabel(labelName).then(success => {
            console.log("Success", success)
            action("FETCH_LABELS")
        })
        .catch(error => {
            console.log("Error", error)
        })
    }

    updateLabel = (id, index) => {
        //Validation Required
        let label = this.labelInput[index].value
        if(!label || label === "" || label.trim() === "" ){
            return showToast("Invalid Label Name", "error")
        }

        if(this.props.labels.data.filter(ele => label === ele.label).length != 0)
            return showToast("Label already Exist", "error")
        http.updateNoteLabel(id, {label: this.labelInput[index].value})
        .then(success => {
            console.log("Success", success)
            action("FETCH_LABELS")
        })
        .catch(error => {
            console.log("Error", error)
        })

    }

    newLabel = (index) => {
        let label = this.labelInput[index].value
        if(!label || label === "" || label.trim() === "" ){
            return showToast("Invalid Label Name", "error")
        }
        if(this.props.labels.data.filter(ele => label === ele.label).length != 0)
            return showToast("Label already Exist", "error")
        http.newLabel({label, isDeleted: false, userId: this.props.userId})
        .then(success => {
            console.log("Success", success)
            action("FETCH_LABELS")
        })
        .catch(error => {
            console.log("Error", error)
        })
    }

    modalItem = (item, index) => {
        return <div key={item} className="modal-item">
                    {
                        index === true
                        ? <i className="material-icons-outlined" onClick={()=> {this.labelInput[index].value = ""; this.labelInput[index].focus()}}>close</i>
                        : <i className="material-icons-outlined" for="bin" onClick={() => this.deleteLabel(item.id)}></i>

                    }
                    <input ref={(ref) => this.labelInput[index] = ref} defaultValue={item.label} type="text" autoFocus={true} />
                    {
                        index === true
                        ? <i className="material-icons-outlined" onClick={() => this.newLabel(index)}>add</i>
                        : <i className="material-icons-outlined"  for="edit" onClick={() => this.updateLabel(item.id, index)}>done</i>
                    }
                    
                </div>
    }

    render() {
        return <div className={"sidebar" + (!this.props.toggle ? " inactive-sidebar" : " active-sidebar")}>

            <List key="selections" data={primary} 
                active={this.state.activeElement}
                onSelect={this.setActivelement}
                />
            <hr className="border"/>

            {
                this.props.labels.loading || !this.props.labels || !this.props.labels.data
                    ? <Loading type="small"/>
                    : <List key="labels" data={
                            [
                                { heading: "Labels" },
                                ...this.props.labels.data.map(label => ({label: label.label, icon: "label"})),
                                { label: "Edit Labels", icon: 'edit', onClick: () => this.setState({ modal: true }) },
                            ]
                        } />
            }

            
            <hr className="border"/>

            <List key="actions" data={secondary} 
                active={this.state.activeElement}
                onSelect={this.setActivelement}
            />

            {   
                this.state.modal
                    ? 
                        <Modal onClose={() => this.setState({modal: false})}>
                        {
                            this.props.labels.loading || !this.props.labels || !this.props.labels.data 
                                ? <Loading type="small"/>
                                :[...this.props.labels.data.map(this.modalItem), this.modalItem("New Label", true)]
                        }
                        </Modal>
                    : null
            }
        </div>    
    }

}

function mapDispatchToProps(dispatch) {
    return {
        modifyTitle: (title) => dispatch(modifyTitle(title))
    }
}

function mapStateToProps(state) {
    return {
        toggle: state.layout.toggle,
        labels: state.label,
        userId: state.user.userId
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar))