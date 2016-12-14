import React, { Component } from 'react';
import axios from 'axios';
import api from './Api.js'
import './App.css';
import StoreNavigation from './StoreNavigation';
import { FormattedMessage } from 'react-intl';




export default class ShopTypePage extends Component {
  constructor (props) {
    super (props)
    this.state = {
      results: [],
      api: api()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getItems();
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    axios.get(api() + '/products')
      .then((response) => {
        let newResults = response.data.slice(0).filter((v) => {
          return v.type.toLowerCase().trim() === this.props.params.type
        } );
        this.setState ({
          results: newResults,
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <StoreNavigation />
        {this.state.results.map((result, index) => {
          return (
            <div key={result.id} className="STP-container">
              <div className="STP-content">
                <img className="STP-image" src={result.image} role="presentation"></img>
                <div className="STP-header" key={result.id}>
                  <span className="STP-name">{result.name}</span><span className="STP-price">
                    <FormattedMessage
                    id={result.id}
                    defaultMessage={`\${price, number}`}
                    values={{price: result.price}}
                />
                  </span>
                </div>
                <div className="STP-list">
                  <p className="STP-description">{result.description}</p>
                  <button className="STPbuttons">Add to cart</button>
                </div>
                <div className="STP-footer">

                </div>

              </div>
            </div>
          )
        })}
      </div>
    );
  }
}
