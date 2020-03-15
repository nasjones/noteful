import React from 'react'
import './Note.css'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

function Note(props) {
    let date = <Moment format="Do of MMM YYYY">
        {props.mod}
    </Moment>


    return (
        <div className="list-item">
            <Link to={`/note/${props.id}`} className="title">
                <h2>{props.name}</h2>
            </Link>
            <p>{"Date modified on "}{date}</p>
            <button className="delete">Delete Note</button>
        </div>
    )

}

export default Note