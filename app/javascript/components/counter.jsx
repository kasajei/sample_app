import React, { Component } from "react"
import PropTypes from "prop-types"

export default class Counter extends Component {
  handleUp = () => {
    this.setState({
      count: ++this.state.count
    })
  };
  handleDonw = () => {
    this.setState({
      count: --this.state.count
    })
  };

  constructor(props) {
    super(props);

    this.state = {
      count: props.count
    }
  }

  render() {
    return (
        <div>
          <div>{this.state.count}</div>
          <button onClick={this.handleUp}>+</button>
          <button onClick={this.handleDonw}>-</button>
        </div>
    )
  }
}

Counter.defaultProps = {
  count: 0
};

Counter.propTypes = {
  count:PropTypes.number
};
