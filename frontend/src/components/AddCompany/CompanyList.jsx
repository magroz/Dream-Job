import React, { Component } from 'react';

import './CompanyList.css';

const styles = {
  mockSearch: {
    color: '#dfdfdf',
  }
};

export default class CompanyList extends Component {

  state = {
    searchString: '',
    companiesList: null,
  };

  onTextChanged = async (e) => {
    const text = e.target.value;
    await this.setState({ searchString: text });
    this.getData();
  };

  getData = async () => {
    await this.setState({ companiesList: null });
    this.state.searchString.trim() && fetch(`https://api.hh.ru/employers?text=${this.state.searchString}`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          companiesList: responseData.items,
        });
      });
  };

  renderCompanies = (arr) => {
    return arr.map(({ id, name }) => {
      return (
        <div
          key={id}
          className="item"
          onClick={() => this.props.onCompanySelected(id)}
        >
          {name}
        </div>
      );
    });
  };

  render() {
    const { companiesList } = this.state;

    const items = companiesList ?
      this.renderCompanies(companiesList) :
      <div className="ui icon header center aligned" style={styles.mockSearch}>
        <i className="search icon"></i>
        <p>No match</p>
      </div>;
    return (
      <div>
        <div className="ui input icon huge">
          <input className='prompt search-panel' type="text" placeholder="Search for a company by name..."
                 onChange={this.onTextChanged} value={this.state.searchString}/>
          <i className="circular search link icon"></i>
        </div>
        <div className='ui segment wrapper-list'>
          <div className="ui selection list animated huge">
            {items}
          </div>
        </div>

      </div>
    );
  }
}
