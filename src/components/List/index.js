/**
 * @author Kowtha Saketh
 * @description List Component
 */

import React from 'react'

import './list.scss'

class List extends React.Component  {
  
    render(){
        const activeEle = this.props.activeEle
        return <div className="list">
                    <ul {...this.props}>
                        {
                            this.props.data.map(
                                item => <li key={item.label || item.heading} name={item.label} onClick={() => this.props.onSelect ?  this.props.onSelect(item.label) : null}>
                                {
                                    item.heading 
                                        ? <a className="list-heading">{item.heading}</a>
                                        : <a className={"list-item" + (activeEle === item.label ? " active" : "")} >
                                                <React.Fragment>
                                                    {item.icon ? <i className="material-icons-outlined">{item.icon}</i> : null}
                                                    <span>{item.label}</span>
                                                </React.Fragment>
                                            </a>
                                        }
                                </li>)
                        }
                    </ul>
                </div>
    }
}


export default List


