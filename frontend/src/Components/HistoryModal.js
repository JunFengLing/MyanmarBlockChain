import React, { Component } from 'react';
import signal from 'signal-js';

import System from '../DataModel/System.js';

class HistoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      land: System.land,
      transactions: System.locationInfo.Transactions
    };
  };

  componentDidMount() {
    signal.on('NotifyLocationInfo', () => {
      this.setState({
        land: System.land,
        transactions: System.locationInfo.Transactions
      });
    })
  };

  render() {
    let history = this.state.transactions.map((item, index) => (
      <div className={index === this.state.transactions.length - 1?'row py-1':'row py-1 border-bottom'}>
       <div className="col-md-4 ml-auto">{item.ApprovalDate}</div>
       <div className="col-md-2 ml-auto">{item.Buyer}</div>
       <div className="col-md-2 ml-auto">{item.Seller}</div>
       <div className="col-md-2 ml-auto">{item.Status===1?'Approved':'Rejected'}</div>
       <div className="col-md-2 ml-auto">${item.Price}</div>
     </div>
    ));

    return (
      <div className="modal fade" id="HistoryModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Land {this.state.land} History</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
               <div className="container-fluid">
                 <div className="row py-1 text-white bg-dark">
                  <div className="col-md-4 ml-auto">Approval Date</div>
                  <div className="col-md-2 ml-auto">Buyer</div>
                  <div className="col-md-2 ml-auto">Seller</div>
                  <div className="col-md-2 ml-auto">Status</div>
                  <div className="col-md-2 ml-auto">Price</div>
                </div>
                {history}
               </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-danger" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  };
};

export default HistoryModal;
