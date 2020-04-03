import React, { Component } from 'react';
import Quizz from './Quizz';

class Bigphoto extends Component{

    //console.log(this.props.imageChosen)
    constructor(props){
        super(props);
        this.state = {bigimage: this.props.imageChosen}

    }

    render(){

        //let imgPath = {this.props.imageChosen}

        return(
            <div className="fullImage">
                
                {/* <Image source={{uri : myImage, cache: 'reload'}} /> */}
                <img width="300" src={this.props.imageChosen} alt={this.props.id} />
                {/* <img src={this.props.imageChosen} alt={this.props.id} /> */}
                {/* <img src={this.state.bigimage} alt={this.props.id} /> */}
            </div>
        )
    }
}

export default Bigphoto;

//this.props.imageChosen
//<img width="200" src={this.props.img} alt="" />