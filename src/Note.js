import React from 'react'
import './Note.css'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import NoteContext from './NoteContext'
import { withRouter } from 'react-router-dom';

function Note(props) {
    let date = <Moment format="Do of MMM YYYY">
        {props.mod}
    </Moment>

    let del;


    return (
        <NoteContext.Consumer>
            {(value) => {
                if (props.bool) {
                    del = () => {
                        value.deleteNote(props.id)
                        props.history.push('/')
                    }
                }
                else {
                    del = () => {
                        value.deleteNote(props.id)
                    }
                }
                return (
                    <div className="list-item">
                        <Link to={`/note/${props.id}`} className="title">
                            <h2>{props.name}</h2>
                        </Link>
                        <p>{"Date modified on "}{date}</p>
                        <button className="delete" onClick={del}>Delete Note</button>
                    </div>
                )
            }
            }
        </NoteContext.Consumer>

    )

}

export default withRouter(Note)