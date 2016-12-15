import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import './App.css';
import CheckboxList from 'react-checkbox-list';

export default class StoreNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedValues: ['pat', 'packages', 'watches']
    }
  }

  handleCheckboxListChange(values) {
    this.setState({
      checkedValues: values
    })

  }

  saveCheckboxList(e) {
    e.preventDefault();
    if (this.state.checkedValues.length === 0 ) {
      browserHistory.push('/shop/')
    }
    var storeURL = this.state.checkedValues.reduce((a, v) => {
      if (a.length === 0) {
        return v
      }
      return a + ',' + v
    }, '' );
    browserHistory.push('/shop/' + storeURL);
 }


  render() {
    var data = [
        {value: 'packages', label: 'Time Packages', checked: true},
        {value: 'watches', label: 'Watches', checked: true},
        {value: 'pat', label: 'Pick-A-Time', checked: true}
    ];
    return(
      <div>
        <div>
              <CheckboxList ref="chkboxList" defaultData={data} onChange={this.handleCheckboxListChange.bind(this)} />
          </div>
          <button className="Shop-Navigation-savebutton" onClick={this.saveCheckboxList.bind(this)}>Apply</button>
        {/* <ul className="Shop-navigation">
          <li><Link to={'/shop/packages'}>Time Packages</Link></li>
          <li><Link to={'/shop/watches'}>Watches</Link></li>
          <li><Link to={'/shop/pat'}>Pick-A-Time Packages</Link></li>
        </ul> */}
      </div>
    )
  }

}
