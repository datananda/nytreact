import React from "react";

export const ListItem = props => (
    <li className="list-group-item"><a href={props.url} target="_blank">{props.title}</a>
        <span className="ml-4">{props.date}</span>
        {/* <button type="button" className="btn btn-primary float-right" onClick={props.onClick}>Save</button> */}
        {props.children}
    </li>
);
