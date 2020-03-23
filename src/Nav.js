import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Nav.css'

function Nav(props) {
    let output = props.folders.map(folds =>
        <NavLink exact key={folds.id} to={`/folder/${folds.id}`}>
            <h2 id={folds.id} className="navLink">{folds.name}</h2>
        </NavLink>);


    return (
        <div id="navBar">
            {output}
            <div className="add">
                <Link to={'/'} >
                    Add folder
            </Link>
            </div>
        </div>
    )
}

export default Nav