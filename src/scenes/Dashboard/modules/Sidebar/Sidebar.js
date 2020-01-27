import React from 'react'
import './sidebar.scss'
import List from '../../../../components/List'
import { connect } from 'react-redux';
import {modifyTitle} from '../../../../actions/fundooTitleAction'
import { withRouter } from "react-router-dom";
import Modal from '../../../../components/Modal';

import {primary, secondary} from '../../../../config/sidebarItems'

class Sidebar extends React.PureComponent{
    state = {
        tree: this.props.enable,
        activeElement: "Notes",
        labels: [],
        modal: false
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.enable !== prevProps.enable) {
            this.setState({tree: this.props.enable})
        }  
    }
    setActivelement = (e) =>{
        this.setState({activeElement: e}, () => {
            this.props.modifyTitle(this.state.activeElement)
        })
    }

    render() {
        return <div className={"sidebar" + (!this.props.enable ? " inactive-sidebar" : " active-sidebar")}>

            <List key="selections" data={primary} 
                activeEle={this.state.activeElement}
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
                activeEle={this.state.activeElement}
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
export default withRouter(connect(null, mapDispatchToProps)(Sidebar))