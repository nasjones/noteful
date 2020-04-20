import React, { Component } from 'react'
import config from '../config'
import NoteContext from '../NoteHandle/NoteContext'
import ValidationError from '../ValidationError'

export default class AddNote extends Component {
    state = {
        id: "",
        name: "",
        folder_id: null,
        content: "",
        nameTouched: false,
        selectTouched: false,
        contentTouched: false,
    }

    nameChange = (val) => {
        this.setState({
            name: val,
            nameTouched: true
        })
    }

    selectChange = (val) => {
        this.setState({
            folder_id: parseInt(val),
            selectTouched: true
        })
    }

    contentChange = (val) => {
        this.setState({
            content: val,
            contentTouched: true
        })
    }

    notePost = (e, value) => {
        e.preventDefault()
        const current = new Date().toISOString();
        let newNote = {
            id: this.state.id,
            name: this.state.name,
            modified: current,
            folder_id: this.state.folder_id,
            content: this.state.content,
        }

        fetch(`${config.note_end}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newNote),
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(() => {
                value.pageUpdate()
                this.props.history.push('/')

            })
            .catch(error => {
                console.error({ error })
            })
    }

    validateName = (notes) => {
        const nameInput = this.state.name.trim()
        if (nameInput.length === 0) {
            return "Name is required."
        } else if (nameInput.length < 3) {
            return "Name must be atleast 3 characters long."
        }
        for (let i = 0; i < notes.length; i++)
            if (nameInput === notes[i].name)
                return "A note with this name already exists."
    }

    validateSelect = () => {
        const folderSelect = this.state.folder_id
        if (folderSelect === null)
            return "A folder selection is required."
    }

    validateContent = () => {
        const content = this.state.content.trim()
        if (content.length === 0)
            return "The note must have content."
        else if (content.length < 5)
            return "Content must be atleast five characters long."
    }

    render() {

        return (
            <NoteContext.Consumer>
                {(value) => {
                    let folders = value.folders.map(folder => {
                        return <option key={folder.id} value={folder.id}>{folder.name}</option>
                    })

                    const nameError = this.validateName(value.notes)
                    const selectError = this.validateSelect()
                    const contentError = this.validateContent()
                    return (
                        <form>
                            <h2>Add a new note</h2>
                            <br />
                            <label htmlFor="title">Note Name: </label>
                            <input name="title" id="title-input" onChange={e => this.nameChange(e.target.value)} />
                            {this.state.nameTouched && <ValidationError message={nameError} />}
                            <br />
                            <label htmlFor="folder-select">Folder assign: </label>
                            <select id="folder-select" onChange={e => this.selectChange(e.target.value)}>
                                <option value="">Please Choose a folder</option>
                                {folders}
                            </select>
                            {this.state.selectTouched && <ValidationError message={selectError} />}
                            <div id="content-field">
                                <label htmlFor="content-input">Content: </label>
                                <textarea id="content-input" onChange={e => this.contentChange(e.target.value)} />
                            </div>
                            {this.state.contentTouched && <ValidationError message={contentError} />}
                            <br />
                            <button type="submit" id="submit" onClick={e => this.notePost(e, value)} disabled={nameError || selectError || contentError}> Submit</button>
                            <button type="button" id="cancel" onClick={() => this.props.history.push('/')}>Cancel</button>
                        </form>
                    )
                }
                }

            </NoteContext.Consumer>

        )
    }
}