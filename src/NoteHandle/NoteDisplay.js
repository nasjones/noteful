import React, { Component } from 'react'
import Note from './Note'
import NoteContext from './NoteContext'
import NoteError from './NoteError'

export default class NoteDisplay extends Component {

    render() {
        return (
            <NoteContext.Consumer>

                {(value) => {
                    const output = value.notes.find(note =>
                        note.id === parseInt(this.props.match.params.noteId)
                    )

                    const folder = value.folders.find(folder =>
                        folder.id === output.folder_id
                    )

                    return (
                        <div id="noteDisplay">
                            <div id="navBar">
                                <button onClick={() => this.props.history.goBack()}>
                                    <h2 id="back">Go Back</h2>

                                </button>
                                <h2>{folder.name}</h2>
                            </div>
                            <article className="displayed">
                                <NoteError>
                                    <Note id={output.id} name={output.name} content={output.content} mod={output.modified} key={output.id} history={this.props.history} />
                                    <p>{output.content}</p>
                                </NoteError>
                            </article>
                        </div>
                    )
                }
                }
            </NoteContext.Consumer >
        )

    }
}
