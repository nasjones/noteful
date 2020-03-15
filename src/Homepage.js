import React, { Component } from 'react'
import NoteList from './NoteList'
import dummyStore from './dummy-store'


export default class Hompeage extends Component {

    state = {
        notes: dummyStore.notes
    }

    render() {
        return (
            <NoteList notes={this.state.notes} />
        )
    }
}