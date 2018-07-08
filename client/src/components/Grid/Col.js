import React from "react";

export const Col = props => (
    <div className={`col-${props.size}`}>
    {props.children}
    </div>
);
