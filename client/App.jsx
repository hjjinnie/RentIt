import React, { Component } from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import './styles.css';
import Signup from './components/Signup.jsx'
import Homepage from './components/Homepage.jsx'

//The constructor is a method used to initialize an object's state in a class. 

//form submission will make the whole page render the response object
//instead we want to fetch the response from post request

//functional components
//class components - state used

//Pascal case for react components
//inherting props.onClick from App render



//extens React.Component? and pass in props in constructor and super?
//iterate through the state products and display it
class App extends Component {
    constructor(props){
        super(props);
        this.state = {email:'',password:''};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.login = this.login.bind(this);
    }
    handleEmailChange(event) {
        this.setState({...this.state, email: event.target.value});
    }
    
    handlePasswordChange(event) {
        this.setState({...this.state, password: event.target.value});
    }

    login(history, email, password){
        const requestOptions = {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: "include",
            body: JSON.stringify({email,password}),
          };
          fetch('http://localhost:3000/', requestOptions)
          .then((response) =>{
              history.push('/homepage');
          }).catch((err) => {
             console.log("failed to login") 
          })
    }

    render() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path='/homepage'>
                        <Homepage />
                    </Route>
                    <Route path='/signup'>
                        <Signup />
                    </Route>
                    <Route path='/' render = {(routeProps) => 
                    <React.Fragment>
                        <span>Member Login</span>
                        <br></br>
                        <br></br>
                        <span>Email </span>
                        <input type='text' value = {this.state.email} onChange={this.handleEmailChange}></input>
                        <br></br>
                        <span>Password</span>
                        <input type='password' value = {this.state.password} onChange={this.handlePasswordChange}></input>
                        <br></br>
                        <button onClick = {()=> this.login(routeProps.history,this.state.email, this.state.password)}>Login</button>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Link to='/signup'><button>Create your Account</button></Link>
                    </React.Fragment>} / >
                </Switch>
            </div>
        </Router>
    )
    }
}

// function HomePage(){
//     return <h1>RentOut</h1>
// }

render(<App />, document.querySelector('#root'));
