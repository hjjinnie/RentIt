import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import './styles.css';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
    useParams,
    Link
} from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

class Homepage extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            products:[]
        }
        // this.delete = this.delete.bind(this);
    }

    //credentials: "same-origin" - enables cookies
    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json'}),
            // mode:"cors",
            credentials: "include"
            // body: JSON.stringify({firstname, lastname, email, password, building}),
          };
          fetch('http://localhost:3000/homepage', requestOptions)
          //need to return in .then or console.log
          .then((data)=>{
              return data.json();
          })
          .then((data) =>{
              console.log('DATA',data);
              this.setState({products:data});
          }).catch((err) => {
             console.log("failed to login") 
          })
        // return (
        //     <div>
        //         <img src={this.state.products.image} style={{height:'100px'}}/><br />
        //         <b>Name:</b>{this.state.products}< br/>
        //         <b>Price:</b>${this.state.products.price}<br />
        //         <hr/>
        //     </div>
        // )
    }

    render(){
        return(
            (this.state.products.length=== 0)
            ? <div></div> :
        <React.Fragment>
        <br></br>
        <br></br>
         <h2  style={{textAlign:'center', color:'black'}}>Building {this.state.products[0].building_address}</h2>
         <br></br>
         <Card variant="outlined" style={{backgroundColor:'azure', width:'50%', textAlign:'center', marginLeft:'25%', marginRight:'25%', boxShadow: '6px 6px'}}>
         <CardContent>
         <form>
            <label textAlign='center' for="Productname">Product name:</label>
            <input type="text" id="Productname" name="Productname" size="40"></input>
            <br></br>
            <label for="Productdesc">Product description:</label>
            <input type="text" id="Productdesc" name="Productdesc" size="40"></input>
            <br></br>
            <label for="price">Product price ($/day):</label>
            <input type="text" id="price" name="price" size="40"></input>
            <br></br>
            <label for="image">Product image (url):</label>
            <input type="text" id="image" name="image" size="40"></input>
         </form>
         <button type="button">Add Product</button>
         </CardContent>
         </Card>
         <br></br>
         <br></br>
        {this.state.products.map( x => 
            <div>
            <Card variant="outlined" style={{backgroundColor:'azure', width:'45%', textAlign:'center', float:'left', marginLeft:'45px', marginBottom:'15px', boxShadow: '4px 4px'}}>
            <CardContent>
            <img src={x.image_url} style={{height:'100px'}}/><br />
            <h3 key={x.product} style={{marginBottom:'0px'}}>Product: {x.product}</h3>
            <h4 key={x.price_per_day}>Price per day: ${x.price_per_day}</h4>
            <h4 key={x.description}>Description: {x.description}</h4>
            <h4 key = {x.id}>Contact owner: {x.email}</h4>
            </CardContent>
            </Card>
            </div>)}
        </React.Fragment>
        )
    }
};




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
                 
        </footer>
        </div>
    )
    }
}


export default Homepage;