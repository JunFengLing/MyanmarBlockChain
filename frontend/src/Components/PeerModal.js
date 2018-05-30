import React, { Component } from 'react';
import signal from 'signal-js';
import System from '../DataModel/System.js';


class PeerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          localName: ''
        };
    };

    componentDidMount() {
      signal.on('NotifyGetLocalName', params => {
        this.setState({
          localName: params.localName
        }, () => {
        });
      });
    };
    
    handleConfirm() {
        console.log(document.getElementById("peerId").value);
        let peerId = document.getElementById("peerId").value;
        let param = {
            peer: "ws://172.29.224.48:6001",
            name: peerId
        };
        fetch('http://localhost:3001/addPeer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        }).then(data=>{
            console.log(data);
            window.$('#peerModal').modal('hide');
        });

    };
    textChange() {

    };

    render() {
        return (
            <div className="modal fade" id="peerModal" tabIndex="-1" role="dialog" aria-labelledby="peerModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Peer</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input type="text" id="peerId" className="form-control" placeholder={this.state.localName} aria-label="Peer" aria-describedby="basic-addon2" onChange={this.textChange.bind(this)} />
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

export default PeerModal;
