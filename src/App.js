import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import Hompeage from './Homepage';
import NoteDisplay from './NoteDisplay';
import FolderDisplay from './FolderDisplay'
import NoteContext from './NoteContext'

class App extends Component {

  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch('http://localhost:9090/notes'),
      fetch('http://localhost:9090/folders')
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

  setNotes = notes => {
    this.setState({ notes })
  }

  deleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }


  render() {

    let contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
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
              <Route exact path='/'
                component={Hompeage}
                render={({ history }) => {
                  console.log(history)
                }} />
              <Route path='/Folder/:folderId'
                component={FolderDisplay}
                render={({ history }) => {
                  console.log(history)
                }} />
              <Route path='/note/:noteId' component={NoteDisplay}
                render={({ history }) => {
                  console.log(history)
                }} />
            </Switch>

          </main>
        </NoteContext.Provider>
      </div>
    );
  }
}

export default App;
