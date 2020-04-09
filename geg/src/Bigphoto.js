import React, { Component } from 'react';
import './Bigphoto.css';

class Bigphoto extends Component{

    //console.log(this.props.imageChosen)
    constructor(props){
        super(props);
        this.state = {bigimage: this.props.imageChosen}

    }

    render(){

        //let imgPath = {this.props.imageChosen}
        const path = "" + this.props.Bigphoto;

        return(
            <div className="fullImage">
                
                <img src={this.props.imageChosen} alt={this.props.id} />
                {/* <img width="300" height="300" src={this.props.imageChosen} alt={this.props.id} /> */}
               
            </div>
        )
    }
}

export default Bigphoto;

//this.props.imageChosen
//<img width="200" src={this.props.img} alt="" />