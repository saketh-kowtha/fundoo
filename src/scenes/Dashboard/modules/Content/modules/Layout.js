import React from 'react'

import Empty from '../../../../../components/Empty'
class Layout extends React.Component{

    constructor(props) {
        super(props)

    }

    render() {
        return <div>
            <Empty name={this.props.name} />
        </div>        
    }

}


export default Layout