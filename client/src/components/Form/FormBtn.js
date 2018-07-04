import React from "react";

export const FormBtn = props => (
    <button {...props} type="submit" className="btn btn-primary">{props.children}</button>
);
