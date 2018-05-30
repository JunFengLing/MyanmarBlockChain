import React, { Component } from 'react';
import signal from 'signal-js';

class DetailPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locationInfo: this.props.locationInfo
    };
  };

  getPeer() {
    fetch('http://localhost:3001/peers').then(res => res.json()).then(data => {
      console.log(data);
      signal.trigger('NotifyGetPeer', {
        peers: data.map(item => item.name)
      });
    });
  };

  handleBack() {
    signal.trigger('NotifyShowSearchPanel');
  };

  componentDidMount() {

  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      locationInfo: nextProps.locationInfo
    });
  };

  render() {
    return (
      <div>
        <div className="container-fluid">
            <div className="row px-1 py-2">
              <div className="col-md-6"><h5>States and Region</h5></div>
              <div className="col-md-6">{this.state.locationInfo.Region}</div>
            </div>
            <div className="row px-1 py-2">
              <div className="col-md-6"><h5>District</h5></div>
              <div className="col-md-6">{this.state.locationInfo.District}</div>
            </div>
            <div className="row px-1 py-2">
              <div className="col-md-6"><h5>Townships / subtownships</h5></div>
              <div className="col-md-6">{this.state.locationInfo.Township}</div>
            </div>
            <div className="row px-1 py-2">
              <div className="col-md-6"><h5>Ward / Village Tract</h5></div>
              <div className="col-md-6">{this.state.locationInfo.VillageTract}</div>
            </div>
            <div className="row px-1 py-2">
              <div className="col-md-6"><h5>Village / Kwin / Block No.</h5></div>
              <div className="col-md-6">{this.state.locationInfo.Block}</div>
            </div>
            <div className="row px-1 py-2">
              <div className="col-md-6"><h5>Holding No.</h5></div>
              <div className="col-md-6">{this.state.locationInfo.Holding}</div>
            </div>
            <div className="row px-1 py-2">
              <div className="col-md-6"><h5>Owner</h5></div>
              <div className="col-md-6">{this.state.locationInfo.Owner}</div>
            </div>
          </div>
        <button type="button" className="btn btn-primary mx-1 my-2" data-toggle="modal" data-target="#exampleModalCenter" onClick={this.getPeer.bind(this)}>Trade</button>
        <button type="button" className="btn btn-outline-danger mx-1 my-2" data-toggle="modal" data-target="#HistoryModalCenter">History</button>
        <button type="button" className="btn btn-outline-danger mx-1 my-2" onClick={this.handleBack.bind(this)}>Back</button>
      </div>
    );
  }
};

export default DetailPanel;
