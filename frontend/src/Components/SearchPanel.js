import React, { Component } from 'react';
import signal from 'signal-js';

import DropDown from './DropDown.js';

import mapData from '../DataModel/map.js';
import landsData from '../DataModel/land.js';
import BotataungData from '../DataModel/Botataung.js';
import sampleData from '../DataModel/sample.js';
import System from '../DataModel/System.js';

class SearchPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mapCenter: mapData.center,
      state: '',
      district: '',
      township: '',
      showDistrict: false,
      showTownships: false,
      showLands: false,
      stateList: sampleData,
      districtList: [],
      townshipsList: [],
      landsList: [],
      showResult: false,
      addressList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
  };

  handleChange(option, identifier) {

    if (identifier === 'Lands') {
      signal.trigger('NotifySelectLand', {
        id: option
      });
      System.land = option;

      signal.trigger('NotifySetMap', {
        zoom: 18,
        center: this.state.landsList[option - 1].center
      });

      signal.trigger('NotifyShowDetailPanel', {
        id: option
      });

    } else {
      let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
      url += option.split(' ').join('+');
      url += '&key=AIzaSyCexUWEiuLkoqnX4lhEWCPCubKiNUH6zoY';

      return fetch(url, {
        method: 'GET',
        credentails: 'include',
        mode: "cors",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({
            mapCenter: data.results[0].geometry.location
          }, () => {
            if (identifier === 'States and Regions') { // Select States and Regions
              this.handleStatesChange(option);
            } else if (identifier === 'District') {
              this.handleDistrictChange(option);
            } else if (identifier === 'Townships / Subtownships') {
              this.handleTownshipsChange(option);
            }
          });
        })
        .catch(err => {
          console.error(err);
        })
    }
  };

  handleStatesChange(option) {
    if (this.state.showDistrict) { // District shows
      this.setState({
        showTownships: false,
        townshipsList: [],
      });
    } else { // District not shows

    }
    signal.trigger('NotifySetMap', {
      zoom: 9,
      center: this.state.mapCenter
    });
    this.setState({
      state: option
    }, () => {
      this.state.stateList.forEach(item => {
        if (item.name === this.state.state) {
          this.setState({
            showDistrict: true,
            districtList: item.district
          }, () => {
            console.log(this.state.districtList);
          });
        };
      });
    });
  };

  handleDistrictChange(option) {
    if (this.state.showTownships) {

    } else {

    }
    signal.trigger('NotifySetMap', {
      zoom: 12,
      center: this.state.mapCenter
    });
    this.setState({
      district: option
    }, () => {
      this.state.districtList.forEach(item => {
        if (item.name === this.state.district) {
          this.setState({
            showTownships: true,
            townshipsList: item.township
          }, () => {
            console.log(this.state.townshipsList);
          });
        };
      });
    });
  };

  handleTownshipsChange(option) {
    signal.trigger('NotifySetMap', {
      zoom: 15,
      center: this.state.mapCenter
    });
    this.setState({
      townships: option
    }, () => {
      console.log(this.state.townships);
      signal.trigger('NotifyShowLands');
      if (this.state.townships === 'Mingala Taungnyunt') {
        this.setState({
          showLands: true,
          landsList: landsData
        });
      } else if (this.state.townships === 'Botataung') {
        this.setState({
          showLands: true,
          landsList: BotataungData
        });
      };
    });
  };

  handleReset() {
    signal.trigger('NotifyInitMap');

    this.setState({
      showDistrict: false,
      showTownships: false,
      showLands: false,
      districtList: [],
      townshipsList: [],
      landsList: []
    });
  };

  handleBack() {
    this.setState({
      showResult: false
    });
  };

  search(address) {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    url += address;
    url += ', Myanmar';
    url += '&key=AIzaSyCexUWEiuLkoqnX4lhEWCPCubKiNUH6zoY';

    return fetch(url, {
      method: 'GET',
      credentails: 'include',
      mode: "cors",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        signal.trigger('NotifyShowLands');
        signal.trigger('NotifySetMap', {
          zoom: 15,
          center: data.results[0].geometry.location
        });
      })
      .catch(err => {
        console.error(err);
      })
  };

  handleAddress(event, index) {
    let addressList = this.state.addressList;
    addressList[index].isSelected = true;
    this.setState({
      addressList: addressList
    }, () => {
      console.log(this.state.addressList)
      console.log(index)
      this.search(this.state.addressList[index].name);
    });
  };

  componentDidMount() {
    signal.on('NotifyShowResult', params => {
      let addressList = params.results;
      addressList.forEach(item => item.isSelected = false);
      this.setState({
        showResult: true,
        addressList: addressList
      });
      signal.trigger('NotifySetMap', {
        zoom: 15,
        center: this.state.mapCenter
      });
    });
  };

  _renderStates() {
    const defaultValue = "Choose States and Regions";
    let options = this.state.stateList.map(item => item.name);
    options.splice(0, 0, defaultValue);

    return (
      <div className="mr-2">
        <h3><span className="badge">States and Regions:</span></h3>
        <DropDown identifier="States and Regions" options={options} defaultValue={options[0]} handleChange={this.handleChange} />
      </div>
    )
  };

  _renderDistrict() {
    const defaultValue = "Choose District";
    let options = this.state.districtList.map(item => item.name);
    options.splice(0, 0, defaultValue);

    return (
      <div className="mr-2" style={{display:this.state.showDistrict?'block':'none'}}>
        <h3><span className="badge">District:</span></h3>
        <DropDown identifier="District" options={options} defaultValue={options[0]} handleChange={this.handleChange} />
      </div>
    )
  };

  _renderTownships() {
    const defaultValue = "Choose Townships / Subtownships";
    let options = this.state.townshipsList.map(item => item.name);
    options.splice(0, 0, defaultValue);

    return (
      <div className="mr-2" style={{display:this.state.showTownships?'block':'none'}}>
        <h3><span className="badge">Townships / Subtownships:</span></h3>
        <DropDown identifier="Townships / Subtownships" options={options} defaultValue={options[0]} handleChange={this.handleChange} />
      </div>
    )
  };

  _renderLands() {
    const defaultValue = "Choose Lands";
    let options = this.state.landsList.map(item => item.id);
    options.splice(0, 0, defaultValue);

    return (
      <div className="mr-2" style={{display:this.state.showLands?'block':'none'}}>
        <h3><span className="badge">Lands:</span></h3>
        <DropDown identifier="Lands" options={options} defaultValue={options[0]} handleChange={this.handleChange} />
      </div>
    )
  };

  _renderResult() {
    let address = this.state.addressList.map((item, index) => (
        <li className={item.isSelected?"list-group-item active":"list-group-item"} key={index} onClick={e => this.handleAddress(e, index)}>
          <div>{item.name}</div>
        </li>
    ));

    return (
      <div>
        <h3><span className="badge">Results:</span></h3>
        <ul className="list-group">
          {address}
        </ul>
      </div>
    )
  };

  render() {
    return (
      <div>
        <div style={{display:this.state.showResult?'none':'block'}}>
          {this._renderStates()}
          {this._renderDistrict()}
          {this._renderTownships()}
          {this._renderLands()}
          <button type="button" className="btn btn-outline-danger mx-1 my-2" onClick={this.handleReset.bind(this)}>Reset</button>
        </div>
        <div style={{display:this.state.showResult?'block':'none'}}>
          {this._renderResult()}
          <button type="button" className="btn btn-outline-danger mx-1 my-2" onClick={this.handleBack.bind(this)}>Back</button>
        </div>
      </div>

    );
  }
};

export default SearchPanel;
