import React, { Component } from 'react';
import signal from 'signal-js';

import DropDown from './DropDown.js';
import System from '../DataModel/System.js';

class TradeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      land: 0,
      buyer: '',
      options: [],
      localName: ''
    };
  };

  handleChange(option, identifier) {
    if (option !== "Choose Buyer") {
      this.setState({
        buyer: option
      });
    }
  };

  handleConfirm() {
    if (this.state.buyer) {
      let data = {
        data: {
          Id: this.state.land,
          Buyer: this.state.buyer,
          Seller: this.state.localName,
          Price: 200
        }
      };

      console.log(JSON.stringify(data));

      fetch('http://localhost:3001/transaction', {
        method: 'POST',
        credentails: 'include',
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => {
        window.$('#exampleModalCenter').modal('hide');
        if (res.status === 200) {
          signal.trigger('NotifyShowAlert', {
              type: 'success',
              message: 'Congratulation! Trade successfully.'
            });
            signal.trigger('NotifyGetLocation', {
              id: this.state.land
            });
        } else {
          signal.trigger('NotifyShowAlert', {
            type: 'fail',
            message: 'Trade failed.'
           });

        }


      }).catch(err => {
        console.log(err);
        signal.trigger('NotifyShowAlert', {
          type: 'fail',
          message: 'Trade failed.'
        });
      });
    }
  };

  componentDidMount() {
    signal.on('NotifySelectLand', params => {
      this.setState({
        land: params.id
      });
    });

    signal.on('NotifyGetLocalName', params => {
      this.setState({
        localName: params.localName
      }, () => {
      });
    });

    signal.on('NotifyGetPeer', params => {
      this.setState({
        options: ['Choose buyer'].concat(params.peers)
      }, () => {
        console.log(this.state.options);
      });
    });
  };

  render() {
    return (
      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Trade</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <DropDown identifier="Buyer" options={this.state.options} defaultValue={this.state.options[0]} handleChange={this.handleChange.bind(this)} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-danger" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={this.handleConfirm.bind(this)}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    )
  };
};

export default TradeModal;
