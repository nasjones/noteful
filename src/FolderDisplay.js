import React from 'react';
import dummyStore from './dummy-store'
import NoteList from './NoteList'


export default function FolderDisplay(props) {
    let notes = dummyStore.notes.map(note => {
        if (note.folderId === props.match.params.folderId)
            return (note)
        return;
    })

    return (
        <NoteList notes={notes} />
    )
}