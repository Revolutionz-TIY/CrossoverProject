import React, { Component } from 'react';
import axios from 'axios';
import api from './Api.js'

export default class PackagesPage extends Component {
  constructor (props) {
    super (props)
    this.state = {
      results: [],
      api: api()
    }
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    axios.get(api() + '/products')
      .then((response) => {
        console.log(response);
        let newResults = response.data.slice(0);
        console.log(newResults);
        this.setState ({
          results: newResults,
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }  render() {
    return (
      <div>
        {this.state.results.map((result, index) => {
          console.log(result);
          return (
            <div className="stuff">
              <ul className="list" key={result.id}>
                <li>{result.name}</li>
                <li>{result.description}</li>
                <li>{result.price}</li>
                <li>{result.type}</li>
                <li>{result.image}</li>
              </ul>
            </div>
          )
        })}
      </div>
    );
  }
}
