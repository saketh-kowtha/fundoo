import React from 'react'

class Sidebar extends React.PureComponent{
    state = {
        tree: false
    }
    render() {
        if (!this.state.tree)
            return null
        return <div className="sidebar">
            <div>label 1</div>
            <div>label 2</div>
            <div>label 3</div>
            <div>label 4</div>
        </div>    
    }
}

export default Sidebar