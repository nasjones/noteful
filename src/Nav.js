import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Nav.css'
import PropTypes from 'prop-types'

export default function Nav(props) {
    console.log(props)
    let output = props.folders.map(folds =>
        <NavLink exact key={folds.id} to={`/folder/${folds.id}`}>
            <h2 id={folds.id} className="navLink">{folds.name}</h2>
        </NavLink>);


    return (
        <div id="navBar">
            {output}
            <Link to={'/add-folder'}  >
                <h2 className="addFolder">Add folder</h2>
            </Link>
        </div>
    )
}

Nav.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }))
}