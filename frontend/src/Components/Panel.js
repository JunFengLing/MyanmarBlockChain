import React, { Component } from 'react';
import signal from 'signal-js';

import SearchPanel from './SearchPanel.js'
import DetailPanel from './DetailPanel.js'
import System from '../DataModel/System.js'

class Panel extends Component {
  constructor(props) {
      super(props);
      this.state = {
        showSearch: true,
        showDetail: false,
        showSearchPanel: true,
        showDetailPanel: false,
        locationInfo: {}
      };
  };

  navigateToSearch(initMap=true) {
    this.setState({
      showSearch: true,
      showDetail: false,
      showSearchPanel: true,
      showDetailPanel: false
    });
    if (initMap) {
      signal.trigger('NotifyInitMap');
    };
  };

  navigateToDetail() {
    this.setState({
      showSearch: true,
      showDetail: true,
      showSearchPanel: false,
      showDetailPanel: true
    });
  };

  componentDidMount() {
    signal.on('NotifyShowSearchPanel', () => {
      this.navigateToSearch(false);
    });

    signal.on('NotifyShowDetailPanel', params => {
      console.log('ReceiveNotifyShowDetailPanel');

      fetch(`http://localhost:3001/location?id=${System.land}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          locationInfo: data
        }, () => {
          System.locationInfo = this.state.locationInfo;
          signal.trigger('NotifyLocationInfo');
          this.navigateToDetail();
        });
      })
      .catch(err => {
        console.log(err);
      });
    });

    signal.on('NotifyGetLocation', params => {
      fetch(`http://localhost:3001/location?id=${System.land}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          locationInfo: data
        }, () => {
          System.locationInfo = this.state.locationInfo;
          signal.trigger('NotifyLocationInfo');
        });
      })
      .catch(err => {
        console.log(err);
      });;
    });
  };

  render() {
    return (
      <div className="border border-dark" style={{height:'100%'}}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{color:'#fff',backgroundColor:'#000'}}>
            <li className="breadcrumb-item" onClick={this.navigateToSearch.bind(this)}>Home</li>
            <li className="breadcrumb-item" style={{display:this.state.showDetail?'block':'none'}} onClick={this.navigateToDetail.bind(this)}>Detail</li>
          </ol>
        </nav>
        <div className="p-2" style={{height:'100%'}}>
          {this.state.showSearchPanel && <SearchPanel />}
          {this.state.showDetailPanel && <DetailPanel locationInfo={this.state.locationInfo} />}
        </div>
      </div>
    )
  };
};

export default Panel;
