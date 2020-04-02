import React, { Component } from 'react';
import Bigphoto from './Bigphoto';
//import PostData from './data/images.json';
import axios from "axios";

class Quizz extends Component{

    constructor(props){
        super(props);
        this.state = {data:[]}
    }

    componentDidMount() {

        // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
        // headers.append('Access-Control-Allow-Credentials', 'true');

        fetch('https://raw.githubusercontent.com/fernandocomet/googleearthgame/master/geg/src/data/images.json')
          .then(response => response.json())
          .then(data => this.setState({ data }));
      }

    /* componentDidMount() {
        console.log("componentDidMount");
        
        //https://github.com/fernandocomet/googleearthgame/blob/master/geg/src/data/images.json
        https://raw.githubusercontent.com/fernandocomet/googleearthgame/master/geg/src/data/images.json
        https://www.fernandocomet.com/data/images.json
        https://raw.githubusercontent.com/ironhack-labs/lab-react-ironcontacts/master/starter-code/src/contacts.json

        axios
          .get("./data/images.json")
          .then(images => {
            this.setState({
              ...this.state,
              images: images.data
            });
          });
    } */

    render(){
        return(
            <div>
                <h1>Quizz</h1>
                <Bigphoto />
                {/* <{PostData.map((item, idx) => {
                  return <div>
                            <h1>Item</h1>
                            <p>{item.Country}</p>
                            <p>{item.ImageURL}</p>
                            <p>{item.ID}</p>
                         </div>
                })} /> */}
                <ul>
                    {this.state.data.map((item, idx) => (
                        <li key={idx}>{item.Country} {item.ImageURL} {item.id}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Quizz;

// {"Country":"Australia","Region":"-","ImageURL":"www.gstatic.com/prettyearth/assets/full/1003.jpg","GoogleMapsURL":"www.google.com/maps/@-10.040181,143.560709,12z/data=!3m1!1e3","ID":1003},

{/* <div >
        <h1>Hello There</h1>
        {postList.map((item, index) => {
          return <PostDetail
            post={item}
            key={`post-list-key ${index}`}
            didHandleRemove={this.handlePostRemove}
            dataCallback={this.handleDataCallback} />
        })}
</div>

                <div className="container">
                    {this.state.boxesArr.map((n, idx) => (
                        <Colorbox key={idx}/>
                    ))}
                 </div> */}