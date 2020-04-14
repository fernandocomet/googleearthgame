import React, { Component } from 'react';
import Bigphoto from './Bigphoto';
//import PostData from './data/images.json';
//import axios from "axios";
import './Quizz.css';

class Quizz extends Component{

    constructor(props){
        super(props);
        this.state = 
        {
            data:[],
            chosenItems:[],
            countriesQuizz:[],
            countries: new Set(),
            itemChosen : {Country:'', Region:'', ImageURL:'', GoogleMapsURL:'', id:''},
            imageChosen : "",
            countryChosen : "",
            idChosen: "",
            score: 0,
            numPlays: 10,
            rolling: false,
            quizzing: false,
            listyle: "collection-item liitem"
        }
        this.randomizeItem = this.randomizeItem.bind(this);
        this.initialSet = this.initialSet.bind(this);
        // this.handleCheck = this.handleCheck.bind(this);
    }

    componentDidMount() {
        fetch('https://raw.githubusercontent.com/fernandocomet/googleearthgame/master/geg/src/data/images.json')
          .then(response => response.json())
          .then(data => this.setState({ data }))
          .then(this.initialSet)
          //.then(this.randomizeItem)
    }

    initialSet(){
          let countriesArr =[]; 
          // console.log("esto es = " + this.state.data.length);
          for(let i=0 ; i < this.state.data.length; i++){
              countriesArr.push(this.state.data[i].Country)
          }
          let countriesArrSet = new Set(countriesArr);
          // console.log(countriesArrSet);

          let randomItem = Math.floor(Math.random()*this.state.data.length); 
          let randomImage = this.state.data[randomItem].ImageURL;

          this.setState({
              countries : countriesArrSet,
              imageChosen: randomImage,
          })
    }



    shuffleArray(array){
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }


    randomizeItem(){
      let data = this.state.data;
      const toDelete = new Set(this.state.chosenItems);
      const dataOK = data.filter(obj => !toDelete.has(obj.id));

        let theChosen = [...this.state.chosenItems];

        let randomItem = Math.floor(Math.random()*this.state.data.length); 
        let randomImage = this.state.data[randomItem].ImageURL;
        let randomCountry = this.state.data[randomItem].Country;
        let randomId = this.state.data[randomItem].id;

        theChosen.push(randomId);

        //Random values Set countries
        let countriesArr = Array.from(this.state.countries);
        countriesArr = countriesArr.filter((item) => {return item !== this.state.countryChosen })
       
        let random1 = Math.floor(Math.random()*countriesArr.length);
        let random2 = Math.floor(Math.random()*countriesArr.length);
        let random3 = Math.floor(Math.random()*countriesArr.length);

        countriesArr = countriesArr.filter((item) => { return item !== countriesArr[random1]})
        countriesArr = countriesArr.filter((item) => { return item !== countriesArr[random2]})
        countriesArr = countriesArr.filter((item) => { return item !== countriesArr[random3]})

        let countriesQuizz4 =[];
        //console.log('this.state.countriesQuizz = ' + this.state.countriesQuizz);
        const countriesQuizzNew = this.state.countriesQuizz;
        console.log(countriesQuizzNew);

        //let countryChosen = this.state.countryChosen;
        countriesQuizz4.push(randomCountry) 
        countriesQuizz4.push(countriesArr[random1])
        countriesQuizz4.push(countriesArr[random2])
        countriesQuizz4.push(countriesArr[random3]);

        this.shuffleArray(countriesQuizz4);
        
        this.setState({
          countriesQuizz: countriesQuizz4, 
          data:dataOK,
          itemChosen: randomItem,
          imageChosen: randomImage,
          countryChosen: randomCountry,
          idChosen: randomId,
          chosenItems: theChosen,
          rolling : true,
          quizzing: false,
          listyle: "collection-item liitem"
        });

        
        //className="collection-item liitem"
        //event.target.className = 'collection-item liitem red darken-1';

    }

    /*TO DO
    - onClick -> CheckCountry, Score
    - Button begin / next /playagain
    //Events
          //Score
          //Init and End Gaame
    */

    handleChange(idx, event) {

      console.log(idx);
      let correctAnswer;

      for (let i=0 ; i<this.state.countriesQuizz.length; i++){
          console.log(this.state.countriesQuizz[i] + " - " + i);
          if(this.state.countryChosen === this.state.countriesQuizz[i]){
            console.log("the correct anwer is " + i);
            correctAnswer = i;
          }
      }

      if(idx === correctAnswer){
          console.log("OK!");
          event.target.className = 'collection-item liitem teal accent-3';
      }else{
          console.log("WRONG!");
          event.target.className = 'collection-item liitem red darken-1';
          //Style correctAnswer TO DO
      }

      this.setState({
        rolling: false,
        quizzing: true
      })
    }


    render(){

      // let title;
      // if (this.state.rolling) {
      //   title = <h1 className="collection-item liitem">Winning Hand</h1>;
      // } 
      // else {
      //   title = <h1 className="Pokedex-loser">Losing Hand</h1>;
      // }

      // let listyle = {className: "collection-item liitem"}

      

        return(
            <div>
              <div className="card blue accent-3">
                  <h5 className="accent-3 quizz">GoogleEarth Quizz</h5>                   
                  <ul className="collection multiple-choice">
                      {this.state.countriesQuizz.map((item, idx) => (
                              <button disabled={this.state.quizzing} className="collection-item liitem" onClick={this.handleChange.bind(this, idx)} key={idx}>{item}</button>
                      ))}
                  </ul>
                  <button className="waves-effect blue darken-2 btn next" onClick={this.randomizeItem} disabled={this.state.rolling}>
                  {this.state.rolling ? "Click on the Answer" : "NEXT CLUE"}
                  </button>
              </div>    
              <Bigphoto imageChosen={this.state.imageChosen} key={this.state.idChosen}/>
            </div>
        )
    }
}

export default Quizz;

{/* <button disabled={this.state.quizzing} className="collection-item liitem" onClick={this.handleChange.bind(this, idx)} key={idx}>{item}</button> */}

// {"Country":"Australia","Region":"-","ImageURL":"www.gstatic.com/prettyearth/assets/full/1003.jpg","GoogleMapsURL":"www.google.com/maps/@-10.040181,143.560709,12z/data=!3m1!1e3","id":1003},
/*
                  {/* <ul>
                      {this.state.data.map((item, idx) => (
                          <li key={idx}>{item.Country} {item.ImageURL} {item.id}</li>
                      ))}
                  </ul> }
*/