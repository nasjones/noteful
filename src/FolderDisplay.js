import React, { Component } from 'react';
import NoteList from './NoteHandle/NoteList'
import Nav from './Nav'
import NoteContext from './NoteHandle/NoteContext'

export default class FolderDisplay extends Component {

    render() {
        return (
            <NoteContext.Consumer>
                {(value) => {
                    let notes = value.notes.filter(note => {
                        return (note.folder_id === parseInt(this.props.match.params.folderId))
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
}