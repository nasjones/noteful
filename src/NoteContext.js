import React from 'react'

const NoteContext = React.createContext({
    folders: {},
    notes: {},
    deleteNote: () => { }
})

export default NoteContext