import React from 'react'

const NoteContext = React.createContext({
    folders: {},
    notes: {},
    deleteNote: () => { },
    pageUpdate: () => { },
})

export default NoteContext