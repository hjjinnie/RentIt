import React, {Component} from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
    useParams,
    Link
} from 'react-router-dom';

class NewCommunity extends Component{
    constructor(props){
        super(props);
        this.state = {streetAddress:'',city:'', state:'',zipCode:''};
        this.handleStreetAddressChange = this.handleStreetAddressChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleZipCodeChange = this.handleZipCodeChange.bind(this);
    }
    handleStreetAddressChange(event) {
        this.setState({...this.state, streetAddress: event.target.value});
    }
    handleCityChange(event) {
        this.setState({...this.state, city: event.target.value});
    }
    handleStateChange(event) {
        this.setState({...this.state, state: event.target.value});
    }
    handleZipCodeChange(event) {
        this.setState({...this.state, zipCode: event.target.value});
    }

    render(){
        return(
        <div>
        <h2>Add your own Community </h2>
        <span>Street Address </span>
        <input type='text' value = {this.state.streetAddress} onChange={this.handleStreetAddressChange}></input>
        <br></br>
        <span>City</span>
        <input type='text' value = {this.state.city} onChange={this.handleCityChange}></input>
        <br></br>
        <span>State</span>
        <input type='text' value = {this.state.state} onChange={this.handleStateChange}></input>
        <br></br>
        <span>Zip Code</span>
        <input type='text' value = {this.state.zipCode} onChange={this.handleZipCodeChange}></input>
        <br></br>
        <Link to='/homepage'><button>Login</button></Link>
        </div>
        )
    }
};


export default NewCommunity;