import React from 'react';

let TextInput = (props) => {
    return (
        <div class="form-group">
            <label for={props.property}>{props.labelName}</label>
            <input type="text" class="form-control" id={props.id} value={props.value} onChange={props.onChange}/>
        </div>
    );
}

export default TextInput;