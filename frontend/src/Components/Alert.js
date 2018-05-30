import React, { Component } from 'react';
import signal from 'signal-js';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      message: '',
      className: 'alert'
    };
  };

  closeAlert() {
    setTimeout(() => {
      this.setState({
        showAlert: false,
        message: '',
        className: 'alert'
      })
    }, 3000);
  };

  componentDidMount() {
    signal.on('NotifyShowAlert', params => {
      if (params.type === 'success') {
        this.setState({
          showAlert: true,
          message: params.message,
          className: 'alert alert-success'
        }, () => {
          this.closeAlert();
        });
      } else {
        this.setState({
          showAlert: true,
          message: params.message,
          className: 'alert alert-danger'
        }, () => {
          this.closeAlert();
        });
      }
    });
  };

  render() {
    return (
      <div id="alert" className={this.state.className} style={{display:this.state.showAlert?'block':'none'}} role="alert">
        {this.state.message}
      </div>
    );
  };
};

export default Alert;
