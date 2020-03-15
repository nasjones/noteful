import React from 'react'
import Note from './Note'

function NoteList(props) {
    let output = props.notes.map(notes => {
        if (notes)
            return (
                <Note id={notes.id} name={notes.name} content={notes.content} mod={notes.modified} key={notes.id} />)
    })

    return (
        <div id="main">
            {output}
        </div>
    )


}

export default NoteList