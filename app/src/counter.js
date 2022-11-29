import React from "react";

export class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        }
    }
    handleAddClick() {
        this.setState({
            value: this.state.value + 1,
        })
    }
    handleSubductionClick() {
        this.setState({
            value: this.state.value - 1,
        })
    }

    render() {
        return (
            <div>{"The value is: " + this.state.value}
                <button onClick={() => this.handleAddClick()}>Add</button>
                <button onClick={() => this.handleSubductionClick()}>Subduction</button>
            </div>
        )
    }

}

