import React from 'react';
import dummyStore from './dummy-store'


export default function NoteDisplay(props) {
    const output = dummyStore.notes.find(note =>
        note.id === props.match.params.noteId
    )

    return (
        <article>
            <h3>{output.name}</h3>
            <p>{output.content}</p>
        </article>
    )

}