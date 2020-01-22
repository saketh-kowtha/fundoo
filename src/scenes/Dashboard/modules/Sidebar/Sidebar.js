import React from 'react'
import './sidebar.scss'
import List from '../../../../components/List'

class Sidebar extends React.PureComponent{
    state = {
        tree: true,
        activeElement: null
    }

    setActivelement = (e) =>{
        this.setState({activeElement: e})
    }

    render() {
        if (!this.state.tree)
            return null
        return <div className="sidebar">

            <List key="selections" data={
                    [
                        {label: "Notes", icon: 'emoji_objects'},
                        {label: "Reminders", icon: 'notifications'},
                    ]
                } 
                activeEle={this.state.activeElement}
                onSelect={this.setActivelement}
                />
            <hr/>

            <List key="labels" data={
                [
                    {heading: "Labels"},
                    {label: "New", icon: 'emoji_objects'},
                ]
            } 
            />
            <hr/>
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

export default Sidebar