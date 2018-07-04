import React from "react";

export const Input = props => {
    const { displayName, ...inputAttributes } = props;
    return (
        <div className="form-group">
            <label htmlFor="topicInput">{displayName}</label>
            <input type="text" className="form-control" {...inputAttributes}></input>
        </div>
    )
};
