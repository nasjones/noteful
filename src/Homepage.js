import React, { Component } from 'react'
import NoteList from './NoteHandle/NoteList'
import Nav from './Nav'
import NoteContext from './NoteHandle/NoteContext'


export default class Homepage extends Component {

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
}