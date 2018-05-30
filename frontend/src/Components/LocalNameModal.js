import React, { Component } from 'react';
import signal from 'signal-js';

class LocalNameModal extends Component {

    constructor(props) {
      super(props);
      this.state = {
        localName: ''
      };
    };

    handleChange(event) {
      this.setState({
        localName: event.target.value
      });
    };

    getLocalName() {
      fetch('http://localhost:3001/localname')
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data.initial) {
          signal.trigger('NotifyGetLocalName', {
            localName:  data.name
          });
          System.localName = data.name;
        } else {
          window.$('#localNameModal').modal('show');
        }
      })
      .catch(err => {
        console.log(err);
      });
    };

    handleSubmit() {
      let data = {
        name: this.state.localName
      };

      fetch('http://localhost:3001/localname', {
        method: 'POST',
        credentails: 'include',
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => {
        console.log(res);
        window.$('#localNameModal').modal('hide');
        this.getLocalName();
      }).catch(err => {
        console.log(err);
        window.$('#localNameModal').modal('hide');
      });
    };

    render() {
        return (
            <div className="modal fade" id="localNameModal" tabIndex="-1" role="dialog" aria-labelledby="peerModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Please put your name here</h5>
                        </div>
                        <div className="modal-body">
                            <input type="text" id="peerId" className="form-control" placeholder="name" aria-label="Peer" aria-describedby="basic-addon2" onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};

export default LocalNameModal;
