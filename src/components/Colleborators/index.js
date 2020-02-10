import React, {useState} from 'react'

import Modal from '../Modal'

import showToast from '../Toast'


import {useSelector, useDispatch} from 'react-redux'

import {getRandomColor} from '../../helper'


// import {getRandomColor} from '../../strings'

import './Colleborators.scss'

const Colleboartors = (props) => {
    const [list, updateList] = React.useState([...props.list])

    const dispatch = useDispatch()

    const handleAdd = (input) => {
         for(let i = 0 ; i < list.length; i++){
             if(list[i].userId === input.userId)
                return showToast("Collaborator already exist")
         }
         updateList([...list, input])
         if(props.notesId)
            dispatch({type: "ADD_COLLABORATOR", data: {notesId: props.notesId, ...input}})
    }

    const handleDelete = (id) => {
        updateList([...list.filter(item => item.userId !== id)])
        if(props.notesId)
            dispatch({type: "DELETE_COLLABORATOR", data: {notesId: props.notesId,colleboartorId: id }})
    }

    return <div className="colleboartors">
        <Modal>
            <div className="list-container">
                {
                    list.map(user => {
                        return <div className="item">
                            <span className={getRandomColor(user.email[0]) + " avatar"}>{user.email[0]}</span>
                            <span className="mail" title={user.email}>{user.email}</span>
                            <span onClick={()=>handleDelete(user.userId)}>&times;</span>
                        </div>
                    })
                }
            </div>
            <div className="add-colleboartor">
                <span><i className="material-icons-outlined">perm_identity</i></span>
                <DropWithSearch  handleAdd={handleAdd}/>

            </div>
          
            <div style={{textAlign: "right"}}>
                <span onClick={()=>props.onClose(list)}>Close</span>
            </div>
        </Modal>

    </div>
}

const DropWithSearch = (props) => {
    
    const handleInput = (e) => {
        const input = e.target.value
        if(!input || input.trim() === "")
            return
        dispatch({type: "GET_USERS", data: input})
    }

    const handleUserSelection = (user) => {
        props.handleAdd(user)
    }

    const [showDropdown, setDropdown] = useState(false)

    const usersList = useSelector(state => state.user.userList)

    const dispatch = useDispatch()

    const list =  <div className="dropdown-content" onMouseLeave={() => setDropdown(false)}>
                    {
                        usersList ? usersList.map( user => <a  onClick={() => handleUserSelection(user)} >{user.email}</a>) : null
                    }
                </div>
                return <div className="search-dropdown">
                            <input type="text" onClick={()=>setDropdown(true)} onChange={handleInput}  placeholder={"Colleboartor email"}/>
                            {
                                showDropdown ? list : null
                            }
                        </div>
}



export default Colleboartors