import React, {Component} from 'react';
import './CompanyInfo.css';

import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {LoadingCompanies} from "../../redux/creators";

class CompanyInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            company: null,
            checked: false
        }
    }

    componentDidMount = async () => {

        let resp = await fetch('/companies');
        let data = await resp.json();
        this.props.loading(data);

        this.props.companies.map((company) => {

            if (company.id === this.props.match.params.id) {
                this.setState({
                    company: company,
                    input: this.state.input
                })
            }
        });
    };

    onClick = (event) => {

        this.setState({
            company: this.state.company,
            input: !this.state.input
        })
    };

    render() {
        return (
            <div>

                {
                    this.state.company ?
                        <div>
                            <img src={this.state.company.image} alt=""/>
                            <span>{this.state.company.name}</span>
                            {this.state.company.site_url && <p>Сайт: <Link to={this.state.company.site_url}></Link></p>}
                            <p>Рейтинг: {this.state.company.averageRating}/5</p>
                            <p>Отзывов: {this.state.company.count}</p>
                            <br/>
                            <input onClick={this.onClick} type="submit" value={'Написать отзыв'}/>



                        </div>
                        : <div>Spiner</div>
                }

                {this.state.input && <Redirect to={`/feedback/${this.state.company.id}`}/>}
                {!sessionStorage.user && <Redirect to="/login"/>}
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        companies: store.companies
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loading: (data) => {
            dispatch(LoadingCompanies(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInfo)

