import React from 'react'
import Note from './Note'
import { Link } from 'react-router-dom'
import NoteError from './NoteError'
import PropTypes from 'prop-types'

export default function NoteList(props) {
    let output = props.notes.map(notes => {
        if (notes)
            return (
                <NoteError key={notes.id}>
                    <Note id={notes.id} name={notes.name} content={notes.content} mod={notes.modified} key={notes.id} bool={false} />
                </NoteError>
            )
        return null
    })

    return (
        <div id="main">
            {output}
            <div className="add">
                <Link to={'/add-note'}  >
                    <h2 className="addFolder">Add note</h2>
                </Link>
            </div>
        </div>
    )
}


NoteList.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            modified: PropTypes.string.isRequired,
            folder_id: PropTypes.number.isRequired,
            content: PropTypes.string.isRequired,
        }))
}