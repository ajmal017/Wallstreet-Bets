import React from 'react';
import SVGIcon from '../svg_icons/svg.icons';
import { NavLink, Link } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    }
    this.handleInput = this.handleInput.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this);
    this.checkMatch = this.checkMatch.bind(this);

  }

  checkMatch(stock) {
    let match = false;
    let input = this.state.input.toLowerCase();
    const _checkMatch = (foundStock) => {
      foundStock = foundStock.toLowerCase();
      return input.length <= foundStock.length && foundStock.slice(0, input.length) === (input);
    } 
    if (stock && (_checkMatch(stock.name) || _checkMatch(stock.symbol))) match = true;
    return match;
  }

  searchStocks() {
    const results = [];
    if (this.props.allStocks) {
      const maxResults = 6;
      const stocks = Object.values(this.props.allStocks)
      let allStocksSize = stocks.length;
      let i = 0;
      while (results.length < maxResults && i < allStocksSize) {
        if (this.checkMatch(stocks[i])) {
          results.push(stocks[i]);
        }
        i++;
      }
    }
    return results;
  }

  handleInput(e) {
    this.setState({ 
      input: e.target.value
    });
  }

  renderSearchResults() {
    if (this.state.input.length > 0) {
      return (
        <div className="search-results-container">
          <div className="search-results-header">
            Stocks
          </div>
          <div className="search-results-item-container">
          {this.searchStocks().map((stock, i) => {
            return (
              <Link to={`/stocks/${stock.symbol}`}>
                <div key={i} className="search-results-item">
                  <div className="search-results-symbol">{stock.symbol}</div>
                  <div className="search-results-name">{stock.name}</div>
                </div>
              </Link>
            )
          })}
          </div>
        </div>
      )
    }
  }

  render(){
    return (
      <div className="search-bar-container">
        <div className="search-icon">
          <SVGIcon name="search" width={20} />
        </div>
        <input 
          className="search-bar-input"
          type="text"
          placeholder="Search"
          onChange={this.handleInput} />
        {this.renderSearchResults()}
      </div>
    )
  }
}

export default SearchBar;