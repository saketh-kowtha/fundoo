import React from 'react'

import "./Layout.scss"
import {Menu, Replay, GridOnSharp,  SettingsSharp, InvertColors, Search, ArrowBack } from '@material-ui/icons/'

import Empty from '../../../../../components/Empty'
class Layout extends React.Component{

    constructor(props) {
        super(props)

    }

    input(){
        return <div>
                <input type="text" placeholder={"Take a Note"}/>
        </div>
    }

    render() {
        return <div>
            {this.input()}
            <Empty name={this.props.name} />
        </div>        
    }

}



export default Layout