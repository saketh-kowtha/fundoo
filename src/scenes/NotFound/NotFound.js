/**
 * @author Kowtha Saketh
 * @description NotFound Scene
 */

import React from 'react'
import './NotFound.scss'
import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied'

import geti18N from '../../strings'

const {title, notFound, thatsError, requestUrlError} = geti18N()

/**
 * @name NotFound
 * @param {*} props 
 */
const NotFound = (props) => {
  return <div className="not-found">
            <div>
              <SentimentDissatisfied />
              <h3>{title}</h3>
              <strong>{notFound}</strong> {thatsError}<br/>
              {requestUrlError}
            </div>
          </div>

}


export default NotFound
