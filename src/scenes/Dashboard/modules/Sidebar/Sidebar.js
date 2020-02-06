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

import geti18N from '../../../../strings'

import {ERROR} from '../../../../constants.js'

const {notes, inValidLabel, labelExist, labels, newLabel, editLabels} = geti18N()
class Sidebar extends React.PureComponent{
    state = {
        activeElement: this.props.location && this.props.location.pathname ? this.props.location.pathname.slice(1, this.props.location.pathname.length) : notes,
        modal: false,
        labelInput: ""
    }

    UNSAFE_componentWillMount() {
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
            console.log(ERROR, error)
        })
    }

    updateLabel = (id, index) => {
        //Validation Required
        let label = this.labelInput[index].value
        if(!label || label === "" || label.trim() === "" ){
            return showToast(inValidLabel, ERROR)
        }

        if(this.props.labels.data.filter(ele => label === ele.label).length != 0)
            return showToast(labelExist, ERROR)
        http.updateNoteLabel(id, {label: this.labelInput[index].value})
        .then(success => {
            console.log("Success", success)
            action("FETCH_LABELS")
        })
        .catch(error => {
            console.log(ERROR, error)
        })

    }

    newLabel = (index) => {
        let label = this.labelInput[index].value
        if(!label || label === "" || label.trim() === "" ){
            return showToast(inValidLabel, ERROR)
        }
        if(this.props.labels.data.filter(ele => label === ele.label).length != 0)
            return showToast(labelExist, ERROR)
        http.newLabel({label, isDeleted: false, userId: this.props.userId})
        .then(success => {
            console.log("Success", success)
            action("FETCH_LABELS")
        })
        .catch(error => {
            console.log(ERROR, error)
        })
    }

    modalItem = (item, index) => {
        return <div key={item} tabIndex="-1" className="modal-item">
                    {
                        index === true
                        ? <i className="material-icons-outlined" tabIndex="1" onClick={()=> {this.labelInput[index].value = ""; this.labelInput[index].focus()}}>close</i>
                        : <i className="material-icons-outlined" tabIndex="2"  for="bin" onClick={() => this.deleteLabel(item.id)}></i>

                    }
                    <input ref={(ref) => this.labelInput[index] = ref} tabIndex="2" defaultValue={item.label} type="text" autoFocus={true} />
                    {
                        index === true
                        ? <i className="material-icons-outlined" tabIndex="1" onClick={() => this.newLabel(index)}>add</i>
                        : <i className="material-icons-outlined" tabIndex="2"  for="edit" onClick={() => this.updateLabel(item.id, index)}>done</i>
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
                                { heading: labels },
                                ...this.props.labels.data.map(label => ({label: label.label, icon: "label"})),
                                { label: editLabels, icon: 'edit', onClick: () => this.setState({ modal: true }) },
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
                        <Modal onClose={() => this.setState({modal: false})} closeBtn={true}>
                        {
                            this.props.labels.loading || !this.props.labels || !this.props.labels.data 
                                ? <Loading type="small"/>
                                :[...this.props.labels.data.map(this.modalItem), this.modalItem(newLabel, true)]
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