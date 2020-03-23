import React from 'react';
import NoteList from './NoteList'
import Nav from './Nav'
import NoteContext from './NoteContext'

export default function FolderDisplay(props) {

    return (
        <NoteContext.Consumer>
            {(value) => {
                let notes = value.notes.map(note => {
                    if (note.folderId === props.match.params.folderId)
                        return (note)
                    return null;
                })
                return (
                    <div id="folderDisplay">
                        <Nav
                            folders={value.folders} />
                        <NoteList notes={notes} />
                    </div>
                )
            }
            }
        </NoteContext.Consumer>

    )
}