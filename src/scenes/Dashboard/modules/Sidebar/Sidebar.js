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


    setActivelement = (e) =>{
        this.setState({activeElement: e}, () => {
            this.props.modifyTitle(this.state.activeElement)
        })
    }

    render() {
        return <div className={"sidebar" + (!this.props.enable ? " inactive-sidebar" : " active-sidebar")}>

            <List key="selections" data={primary} 
                active={this.state.activeElement}
                onSelect={this.setActivelement}
                />
            <hr className="border"/>

            <List key="labels" data={
                [
                    { heading: "Labels" },
                    {label: "Label", icon: 'label'},
                    { label: "New", icon: 'edit', onClick: () => this.setState({ modal: true }) },
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
                                this.props.labels.map(e => <div key={e}><span>del</span><input value={e} type="text" /><span>pen</span></div>)
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
        toggleSidebar: state.layout.toggle
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Sidebar))