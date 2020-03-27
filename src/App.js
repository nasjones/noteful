import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import Homepage from './Homepage';
import NoteDisplay from './NoteDisplay';
import FolderDisplay from './FolderDisplay'
import NoteContext from './NoteContext'
import AddFolder from './AddFolder';
import Endpoint from './Endpoint'
import AddNote from './AddNote';


class App extends Component {

  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {

    Promise.all([
      fetch(Endpoint.note_end),
      fetch(Endpoint.folder_end)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  setFolders = folders => {
    this.setState({ folders })
  }

  pageUpdate = () => {
    this.componentDidMount()
  }

  deleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }


  render() {
    let contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      pageUpdate: this.pageUpdate,
    }

    return (
      <div className="App" >
        <header className="App-header">
          <Link to={'/'}>
            <h1 id="home-link">
              Noteful
            </h1>
          </Link>
          <hr />
        </header>
        <NoteContext.Provider value={contextValue}>
          <main id="stage">
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route path='/Folder/:folderId' component={FolderDisplay} />
              <Route path='/note/:noteId' component={NoteDisplay} />
              <Route path='/add-folder' component={AddFolder} />
              <Route path='/add-note' component={AddNote} />
            </Switch>

          </main>
        </NoteContext.Provider>
      </div>
    );
  }
}

export default App;
