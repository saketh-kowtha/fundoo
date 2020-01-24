import React from 'react'
import './sidebar.scss'
import List from '../../../../components/List'
import { connect } from 'react-redux';
import {modifyTitle} from '../../../../actions/fundooTitleAction'
import { withRouter } from "react-router-dom";

class Sidebar extends React.PureComponent{
    state = {
        tree: this.props.enable,
        activeElement: "Notes"
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.enable !== prevProps.enable) {
            this.setState({tree: this.props.enable})
        }  
    }
    setActivelement = (e) =>{
        this.setState({activeElement: e}, () => {
            this.props.modifyTitle(this.state.activeElement)
            this.props.history.push("#/" + e)
        })
    }

    render() {
        return <div className={"sidebar" + (!this.props.enable ? " inactive-sidebar" : " active-sidebar")}>

            <List key="selections" data={
                    [
                        {label: "Notes", icon: 'emoji_objects'},
                        {label: "Reminders", icon: 'notifications'},
                    ]
                } 
                activeEle={this.state.activeElement}
                onSelect={this.setActivelement}
                />
            <hr className="border"/>

            <List key="labels" data={
                [
                    {heading: "Labels"},
                    {label: "New", icon: 'emoji_objects'},
                ]
            } 
            />
            
            <hr className="border"/>

            <List key="actions" data={
                    [
                        {label: "Archive", icon: 'archive'},
                        {label: "Trash", icon: 'delete'},
                    ]
                } 
                activeEle={this.state.activeElement}
                onSelect={this.setActivelement}
                />
          
        </div>    
    }

}

function mapDispatchToProps(dispatch) {
    return {
        modifyTitle: (title) => dispatch(modifyTitle(title))
    }
}
export default withRouter(connect(null, mapDispatchToProps)(Sidebar))