import React from 'react'
import Note from './Note'
import { Link } from 'react-router-dom'

function NoteList(props) {

    let output = props.notes.map(notes => {
        if (notes)
            return (
                <Note id={notes.id} name={notes.name} content={notes.content} mod={notes.modified} key={notes.id} bool={false} />)
        return null
    })

    return (
        <div id="main">
            {output}
            <div className="add">
                <Link to={'/'} >
                    Add  note
            </Link>
            </div>
        </div>
    )


}

export default NoteList