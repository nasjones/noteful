import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import NoteList from './NoteList'
import Nav from './Nav'
import NoteContext from './NoteContext'


export default withRouter(class Hompeage extends Component {

    render() {
        return (
            <NoteContext.Consumer>
                {(value) => {
                    return (
                        <div id="homepage" >
                            <Nav
                                folders={value.folders} />
                            <NoteList notes={value.notes} />
                        </div>
                    )
                }
                }
            </NoteContext.Consumer >
        )
    }
})