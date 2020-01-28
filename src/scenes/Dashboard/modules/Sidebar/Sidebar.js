import React from 'react'
import './sidebar.scss'
import List from '../../../../components/List'
import { connect } from 'react-redux';
import {modifyTitle} from '../../../../actions/fundooTitleAction'
import {toggleSidebar} from '../../../../actions/layoutActions'
import { withRouter } from "react-router-dom";
import Modal from '../../../../components/Modal';

import {primary, secondary} from '../../../../config/sidebarItems'

class Sidebar extends React.PureComponent{
    state = {
        activeElement: "Notes",
        labels: [],
        modal: false
    }


    setActivelement = (element) =>{
        this.setState({activeElement: element}, () => {
            this.props.modifyTitle(this.state.activeElement)
        })
    }

    deleteLabel = (labelName) => {
        //Delete Action
    }

    updateLabel = (labelName) => {
        //Update Action
    }

    newLabel = (labelName) => {
        //Add Action
    }

    setActiveLabelName = (item) => this.setState({activeLabel: item})

    setNewLabel = (event) => this.setState({newLabel: event.target.value})

    modalItem = (item, isActive) => {
        return <div key={item} className="modal-item">
                    <i className="material-icons-outlined" onClick={() => this.deleteLabel(item)}>close</i>
                    <input value={this.state.activeLabel === item ? this.state.newLabel : item} type="text" autoFocus={isActive} onClick={() => this.setActiveLabelName(item)} onChange={this.setNewLabel}/>
                    <i className="material-icons-outlined" onClick={() => this.updateLabel(item)}>done</i>
                </div>
    }

    render() {
        return <div className={"sidebar" + (!this.props.toggle ? " inactive-sidebar" : " active-sidebar")}>

            <List key="selections" data={primary} 
                active={this.state.activeElement}
                onSelect={this.setActivelement}
                />
            <hr className="border"/>

            <List key="labels" data={
                [
                    { heading: "Labels" },
                    ...this.props.labels.map(label => ({label: label, icon: "label"})),
                    { label: "Edit Labels", icon: 'edit', onClick: () => this.setState({ modal: true }) },
                ]
            } 
            />
            
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
                            [...this.props.labels.map(this.modalItem), this.modalItem("New Label", true)]
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
        toggle: state.layout.toggle
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar))