import React, {Component} from 'react';
import TextInput from './components/textInput';

class Try extends Component {
    constructor() {
        super();
        this.state = {
            text: ''
        }
    }

    getProps = () => {
        let props = {
            property: "name",
            labelName: "Name",
            id: "name"
        }

        return props;
    }

    onChange = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    render() {
        let props = this.getProps();
        return (
            <div>
                <TextInput property={props.property} labelName={props.labelName} id={props.id} value={this.state.text} onChange={this.onChange}/>
                <button onClick={()=>{
                    alert(this.state.text)
                }}>Submit</button>
            </div>
        )
    }
}

export default Try;