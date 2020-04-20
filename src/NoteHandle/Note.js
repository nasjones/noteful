import React from 'react'
import './Note.css'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import NoteContext from './NoteContext'
import PropTypes from 'prop-types'
import config from '../config'

export default function Note(props) {
    let date = <Moment format="Do of MMM YYYY">
        {props.mod}
    </Moment>

    let handleClickDelete = (value) => {
        const noteId = props.id
        fetch(`${config.note_end}/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                // return res.json()
            })
            .then(() => {
                value.deleteNote(noteId)
            })
            .catch(error => {
                console.error({ error })
            })

        if (props.history)
            props.history.push('/')
    }

    return (
        <NoteContext.Consumer>
            {(value) => {
                return (
                    <div className="list-item">
                        <Link to={`/note/${props.id}`} className="title">
                            <h2>{props.name}</h2>
                        </Link>
                        <p>{"Date modified on "}{date}</p>
                        <button className="delete" onClick={() => handleClickDelete(value)}>Delete Note</button>
                    </div>
                )
            }
            }
        </NoteContext.Consumer>
    )
}

Note.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    content: PropTypes.string,
    mod: PropTypes.string,
} 
