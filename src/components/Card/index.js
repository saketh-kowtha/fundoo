import React from 'react'
import './card.scss'

/**
 * Elevated Card Component
 * @param {*} props 
 */
const elevatedCard = (props) => <div className={"card elevated " + props.className} >{props.children}</div>


/**
 * Ouline Card Component
 * @param {*} props 
 */
const oulinedCard = (props) => <div className={"card outlined " + props.className}>{props.children}</div>

/**
 * Interactive Card Component
 * @param {*} props 
 */
const interactiveCard = (props) => <div className={"card outlined interactive " + props.className}>{props.children}</div>

/**
 * Card Component
 * @description Card is stateless Component
 * @param {*} props 
 */
const Card = (props) => {
    if(props.elevated)
        return elevatedCard(props)
    else if(props.interactive)
        return interactiveCard(props)
    else
        return oulinedCard(props)
}

export default Card