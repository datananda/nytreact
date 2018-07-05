import React from "react";

export const ListBtn = props => (
    <button type="button" className="btn btn-primary float-right" onClick={props.onClick}>{props.text}</button>
);
