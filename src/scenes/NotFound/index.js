import React from 'react'
import './NotFound.scss'
import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied'

const NotFound = (props) => {
  return <div className="not-found">
            <div>
              <SentimentDissatisfied />
              <h3>Fundoo</h3>
              <strong>404.</strong> That's an error.<br/>
              The Requested URL dosen't exist was not found on this server.
            </div>
          </div>

}


export default NotFound
