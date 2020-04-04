import React, { Component } from 'react';
import { render } from 'react-dom';
//The constructor is a method used to initialize an object's state in a class. 

//form submission will make the whole page render the response object
//instead we want to fetch the response from post request

//functional components
//class components - state used

//Pascal case for react components
//inherting props.onClick from App render
class LogInPage extends Component{
    constructor(props){
        super(props);
        this.state = {username:'',password:''};
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({...this.state, username: event.target.value});
    }
    
    handlePasswordChange(event) {
        this.setState({...this.state, password: event.target.value});
    }

    render(){
        return (
            <div>
                <span>Member Login</span>
                <br></br>
                <br></br>
                <span>Username </span>
                <input type='text' value = {this.state.username} onChange={this.handleUsernameChange}></input>
                <br></br>
                <span>password</span>
                <input type='password' value = {this.state.password} onChange={this.handlePasswordChange}></input>
                <br></br>
                <button onClick={() => {this.props.onClick(this.state.username,this.state.password)}}>Login</button> 
                <br></br>
                <br></br>
                <br></br>
                <button >Create your Account</button>
            </div>
        )
    }
}


function Product(props) {
    return (
        <div>
            <img src={props.image} style={{height:'100px'}}/><br />
            <b>Name:</b>{props.product}< br/>
            <b>Price:</b>${props.price}<br />
            <hr/>
        </div>
    )
}

//add form field to add products to the building page
class BuildingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
                name:'',
                product:'',
                image:'',
                price:''
        }
    }

    render(){
        console.log(this.props);
    return (
        <div>
            <span>Building Page</span>
            <br></br>
            <br></br>
            <h4>Products</h4>
            {this.props.products.map((product) => (<Product key={product.id} name={product.name} product={product.product} image={product.image_url} price={product.price_per_day}></Product>))}
            <footer>
                {/* <span>Add a Product</span>
                <section class = 'name'>
                    <label for = 'name'>
                        What is your user name?
                    </label>
                    <input type = 'text' value = {this.state.name} onChange={this.handleChange2}></input>
                </section>
                
                <section class = 'product'>
                    <label for = 'product'>
                        What are you lending?
                    </label>
                    <input type = 'text' value = {this.state.product} onChange={this.handleChange2}></input>
                </section>
                <section class = 'image'>
                    <label for = 'image'>
                        Image URL
                    </label>
                    <input type = 'text' value = {this.state.image} onChange={this.handleChange2}></input>
                </section>
                <section class = 'price'>
                    <label for = 'price'>
                        How much for a day?
                    </label>
                    <input type = 'text' value = {this.state.price} onChange={this.handleChange2}></input>
                </section>
                <section class='submission'>
                    <input type="submit" value="Submit"></input>
                </section> */}
                 
        </footer>
        </div>
    )
    }
}
//extens React.Component? and pass in props in constructor and super?
//iterate through the state products and display it
class App extends Component {
    constructor(props){
        super(props);
        this.state = {loggedIn:false,
                    products:[]
                };
        this.getProducts = this.getProducts.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange2(event){
        this.setState({...this.state, name: event.target.value, product: event.target.value, image: event.target.value, price: event.target.value});
        console.log(this.state);
    }

    getProducts(username,password){
        // log in
        this.setState({...this.state, loggedIn:true});

        // make call with username and password
    let body = document.getElementsByTagName('body')[0];
    let messageArea = document.createElement('div');
    document.body.appendChild(messageArea);
    console.log("fetching")
    
    
    const requestOptions = {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({username:username,password:password}),
    //   redirect: 'follow'
    };

        fetch('http://localhost:3000/products', requestOptions)
        .then((response) =>{
            return response.json()
        }).then((data) => {
            this.setState({...this.state,products:data});
        })
        // .then((productArray) => {for (let i=0; i<productArray.length; i++){
        //     let row = document.createElement('h3');
        //     row.innerHTML = 'Product: '+ productArray[i][product];
        //     messageArea.appendChild(row);
        //     let row2 = document.createElement('h4');
        //     row.innerHTML = 'Price per day: $'+ productArray[i][price_per_day];
        //     messageArea.appendChild(row2);

        // }})
    }

    
    render() {
        const loggedIn = this.state.loggedIn;
        let button;

        if (loggedIn){
            button =<BuildingPage products={this.state.products}></BuildingPage>
        }else{
            button =  <LogInPage onClick={this.getProducts}></LogInPage>
        }
            
        

    return (
        <div>
            {button}
        </div>
    )
    }
}

render(<App />, document.querySelector('#root'));
