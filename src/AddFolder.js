import React, { Component } from 'react'
import Endpoint from './Endpoint'
import NoteContext from './NoteContext'
import './AddFolder.css'
import ValidationError from './ValidationError'

export default class AddFolder extends Component {
    state = {
        id: "",
        name: "",
        touched: false,
    }

    textChange = (val) => {
        this.setState({
            name: val,
            touched: true
        })
    }

    folderPost = (e, value) => {
        e.preventDefault()
        let newFolder = {
            id: this.state.id,
            name: this.state.name,
        }
        fetch(`${Endpoint.folder_end}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFolder),
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

    validateName = (folders) => {
        const nameInput = this.state.name.trim()
        if (nameInput.length === 0) {
            return "Name is required"
        } else if (nameInput.length < 3) {
            return "Name must be atleast 3 characters long"
        }

        for (let i = 0; i < folders.length; i++)
            if (nameInput === folders[i].name)
                return "A folder with this name already exists"

    }

    IdMaker = () => {
        let output = Math.random().toString(36).substr(2, 17)
        this.setState({ id: output })
    }

    dupCheck = (folders) => {
        for (let i = 0; i < folders.length; i++) {
            if (this.state.id === folders[i].id) {
                this.IdMaker()
                i = 0
            }
        }

    }

    componentDidMount() {
        this.IdMaker()
    }

    render() {

        return (
            <NoteContext.Consumer>
                {(value) => {

                    const nameError = this.validateName(value.folders)
                    this.dupCheck(value.folders)
                    return (
                        <form>
                            <h2>Add a new folder</h2>
                            <label>Folder Id: </label><b>{this.state.id}</b>
                            <br />
                            <label htmlFor="title">Folder Name: </label>
                            <input name="title" id="title-input" onChange={e => this.textChange(e.target.value)} />
                            {this.state.touched && <ValidationError message={nameError} />}
                            <br />
                            <button type="submit" id="submit" onClick={e => this.folderPost(e, value)} disabled={nameError}> Submit</button>
                            <button type="button" id="cancel" onClick={() => this.props.history.push('/')}>Cancel</button>
                        </form>
                    )
                }
                }

            </NoteContext.Consumer>

        )
    }
}