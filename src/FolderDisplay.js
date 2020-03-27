import React, { Component } from 'react';
import NoteList from './NoteList'
import Nav from './Nav'
import NoteContext from './NoteContext'

export default class FolderDisplay extends Component {

    render() {
        return (
            <NoteContext.Consumer>
                {(value) => {
                    let notes = value.notes.filter(note => {
                        return (note.folderId === this.props.match.params.folderId)
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