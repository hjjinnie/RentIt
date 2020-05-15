import React, {Component} from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

//import lower level components
import NewCommunity from './NewCommunity.jsx';
import Homepage from './Homepage.jsx'

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {firstname:'',lastname:'', email:'', password:'',building:''};
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleBuildingChange = this.handleBuildingChange.bind(this);
        this.signUp= this.signUp.bind(this);

    }
    handleFirstnameChange(event) {
        this.setState({...this.state, firstname: event.target.value});
    }

    handleLastnameChange(event) {
        this.setState({...this.state, lastname: event.target.value});
    }

    handleEmailChange(event) {
        this.setState({...this.state, email: event.target.value});
    }
    
    handlePasswordChange(event) {
        this.setState({...this.state, password: event.target.value});
    }

    handleBuildingChange(event) {
        this.setState({...this.state, building: event.target.value});
    }

    signUp(history, firstname, lastname, email, password, building){
        const requestOptions = {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: "include",
            body: JSON.stringify({firstname, lastname, email, password, building}),
          };
          fetch('http://localhost:3000/signup', requestOptions)
          .then((response) =>{
              history.push('/homepage');
          }).catch((err) => {
             console.log("failed to login") 
          })
    }

    render(){

    return (
        <Router>
            <div>
                <Switch>
                <Route path='/homepage'>
                        <Homepage />
                    </Route>
                    <Route path='/signup' render = {(routeProps) => 
                        <React.Fragment>
                        <h2>Create your Account</h2>
                        <br></br>
                        <br></br>
                        <span>First Name </span>
                        <input type='text' value = {this.state.firstname} onChange={this.handleFirstnameChange}></input>
                        <br></br>
                        <span>Last Name </span>
                        <input type='text' value = {this.state.lastname} onChange={this.handleLastnameChange}></input>
                        <br></br>
                        <span>Login ID (Email) </span>
                        <input type='text' value = {this.state.email} onChange={this.handleEmailChange}></input>
                        <br></br>
                        <span>Password</span>
                        <input type='password' value = {this.state.password} onChange={this.handlePasswordChange}></input>
                        <br></br>
                        <span>Building Location</span>
                        <input type='text' value = {this.state.building} onChange={this.handleBuildingChange}></input>
                        <br></br>
                        <br></br>
                        <button onClick = {()=> this.signUp(routeProps.history,this.state.firstname, this.state.lastname, this.state.email, this.state.password, this.state.building)}>Login</button>
                        <br></br>
                        <br></br>
                        <br></br>
                        </React.Fragment>}>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
    }  
}

export default Signup;
