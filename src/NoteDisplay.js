import React from 'react'
import Note from './Note'
import NoteContext from './NoteContext'
import { withRouter } from 'react-router-dom';


export default withRouter(function NoteDisplay(props) {



    return (
        <NoteContext.Consumer>
            {(value) => {
                const output = value.notes.find(note =>
                    note.id === props.match.params.noteId
                )
                return (
                    <div id="noteDisplay">
                        <div id="navBar">
                            <button onClick={() => props.history.goBack()}>
                                <h2 id="back">Go Back</h2>
                            </button>
                        </div>
                        <article>
                            <Note id={output.id} name={output.name} content={output.content} mod={output.modified} key={output.id} bool={true} />
                            <p>{output.content}</p>
                        </article>
                    </div>
                )
            }
            }
        </NoteContext.Consumer>
    )

})