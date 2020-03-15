import React, { Component } from 'react';
import './App.css';
import dummyStore from './dummy-store';
import { Route, Link, Switch } from 'react-router-dom';
import Nav from './Nav';
import Hompeage from './Homepage';
import NoteDisplay from './NoteDisplay';
import FolderDisplay from './FolderDisplay'

class App extends Component {

  state = {
    notes: dummyStore.notes,
    folders: dummyStore.folders
  }

  render() {

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
        <main id="stage">
          <Nav
            folders={this.state.folders} />
          <Switch>
            <Route exact path='/' component={Hompeage} />
            <Route path='/folder/:folderId' component={FolderDisplay} />
            <Route path='/note/:noteId' component={NoteDisplay} />
          </Switch>

        </main>
      </div>
    );
  }
}

export default App;
