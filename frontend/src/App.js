import React, { Component } from 'react';
import signal from 'signal-js';
import System from './DataModel/System.js'

import NavigationBar from './Components/NavigationBar.js';
import Map from './Components/Map.js';
import Panel from './Components/Panel.js';
import Alert from './Components/Alert.js';
import HistoryModal from './Components/HistoryModal.js';
import TradeModal from './Components/TradeModal.js';
import LocalNameModal from './Components/LocalNameModal.js';
import PeerModal from './Components/PeerModal.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: System.showMenu
    };
  };

  handleToggleMenu() {
    signal.on('NotifyToggleMenu', () => {
      this.setState({
        showMenu: System.showMenu
      });
    });
  };

  getLocalName() {
    fetch('http://localhost:3001/localname')
    .then(res => res.json())
    .then(data => {
      console.log(data);

      if (data.initial) {
        signal.trigger('NotifyGetLocalName', {
          localName: data.name
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

  componentDidMount() {
    this.getLocalName();
    this.handleToggleMenu();
  };

  render() {
    return (
      <div>
        <NavigationBar />
        <Alert />
        <div className="container-fluid row">
          <div className={this.state.showMenu?"col-12 col-sm-8":"col"} style={{height:'800px',paddingTop:'20px'}}>
            <Map />
          </div>
          <div className="col-12 col-sm-4" style={{display:this.state.showMenu?'block':'none',height:'800px',paddingTop:'20px'}}>
            <Panel />
          </div>
        </div>
        <HistoryModal />
        <TradeModal />
        <LocalNameModal />
        <PeerModal />
      </div>
    );
  }
};

export default App;
