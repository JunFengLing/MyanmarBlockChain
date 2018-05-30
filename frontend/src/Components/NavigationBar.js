import React, { Component } from 'react';
import signal from 'signal-js';
import System from '../DataModel/System.js'

import sample from '../DataModel/sample.js';

class NavigationBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      showMenu: System.showMenu
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  };

  handleChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  };

  handleSearch() {
    sample.forEach(item => {
      if (item.name === 'Yangoon') {
        item.district.forEach(item => {
          if (item.name === 'East Yangon') {
            signal.trigger('NotifyShowResult', {
              results: item.township
            });
          }
        })
      }
    });
  };

  handleMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    }, ()=> {
      System.showMenu = this.state.showMenu;
      signal.trigger('NotifyToggleMenu');
    });
  }


  render() {
    return (
      <nav className="navbar" style={{backgroundColor:'#000000'}}>
        <a className="navbar-brand m-1" href="#">
          <img src={require('../logo.png')} width="162" height="30" alt="" />
        </a>
        <form className="form-inline my-1">
          <div className="input-group m-1">
            <input type="text" className="form-control" placeholder="Address" aria-label="Address" aria-describedby="basic-addon2" onChange={this.handleChange} />
            <div className="input-group-append">
              <button className="btn btn-outline-light" type="button" onClick={this.handleSearch}>
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          <button type="button" className="btn btn-outline-light m-1" onClick={this.handleMenu}>{this.state.showMenu ? 'Hide' : 'Show'} Menu</button>
          <button type="button" className="btn btn-outline-light m-1" data-toggle="modal" data-target="#peerModal">
            Connect Me <i className="fa fa-lg fa-user-circle-o fa-spin "></i>
          </button>
        </form>
      </nav>
    )
  }
};

export default NavigationBar;
