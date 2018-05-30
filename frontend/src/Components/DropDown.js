import React, { Component } from 'react';
import signal from 'signal-js';

class DropDown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue
    };
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
    this.props.handleChange(event.target.value, this.props.identifier);
  };

  componentDidMount() {
    signal.on('NotifyInitMap', () => {
      this.setState({
        value: this.props.defaultValue
      });
    });
  };

  _renderOptions() {
    return this.props.options.map(item => <option value={item} key={item}>{item}</option>);
  }

  render() {
    return (
      <div className="input-group m-1">
        <select className="custom-select" id="inputGroupSelect01" value={this.state.value} onChange={this.handleChange.bind(this)}>
          {this._renderOptions()}
        </select>
      </div>
    )
  };
};

export default DropDown;
