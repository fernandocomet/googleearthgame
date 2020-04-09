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
            countriesArr:[],
            countries: new Set(),
            itemChosen : {Country:'', Region:'', ImageURL:'', GoogleMapsURL:'', id:''},
            imageChosen : "",
            countryChosen : "",
            idChosen: "",
            score: 0,
            numPlays: 10 
        }
        this.randomizeItem = this.randomizeItem.bind(this);
    }

    componentDidMount() {
        fetch('https://raw.githubusercontent.com/fernandocomet/googleearthgame/master/geg/src/data/images.json')
          .then(response => response.json())
          .then(data => this.setState({ data }))
          .then(this.randomizeItem)
          //.then(console.log('data=' + this.state.data[0]))
          //.then(this.state.countriesArr = this.state.data.values(countries))
         
    }

    makeCountrySet(){
        /*let countriesArr = [];
        let datalength = this.state.data.length;
        for(let i=0 ; i < datalength; i++){
             //countriesArr.push(this.state.data[i].Country)
        }*/
        
        //console.log(this.state.data);
        
        // this.state.data.forEach(([key, value]) => {
        //     console.log(key); // 'one'
        //     console.log(value); // 1
        //   })

        //Falkland Islands (Islas Malvinas)
    }


    randomizeItem(){
        console.log('RandomItem');
        console.log(this.state.data.length)
        let randomItem = Math.floor(Math.random()*this.state.data.length);
        let randomImage = this.state.data[randomItem].ImageURL;
        let randomCountry = this.state.data[randomItem].Country;

        let countriesArr =[]; //Should be done only at once
        for(let i=0 ; i < this.state.data.length; i++){
            countriesArr.push(this.state.data[i].Country)
        }
        console.log('countriesArr.length= ', countriesArr.length);
        let countriesArrSet = new Set(countriesArr);
        console.log(countriesArrSet);

        let randomId = this.state.data[randomItem].id;
        let theChosen = [...this.state.chosenItems];
        theChosen.push(randomId);
        

        console.log(`randomImage `, randomImage);
        this.setState({
            itemChosen: randomItem,
            imageChosen: randomImage,
            countryChosen: randomCountry,
            idChosen: randomId,
            chosenItems: theChosen
        });

    }

    /*TO DO
    - Random item - Load initial photo default random
    - Pass Random image
    - Show random photo
    - Push id to ChosenItems Array

    - Push Countries to countries Set
    - Select randomly three random items different from itemChosen country -> AQUI, 4 paises distintos, el chosen + 3 aleatorios countriesArr. 

    - Show countries (4) randomly sorted: 3 random and the Chosen
    (compare ids not to repeat a clue)

    - Avoid repeated clues, duplicate data state array  or remove chosen from it

    - onClick -> CheckCountry, Score

    - Button begin / next /playagain
    */


    render(){
        
        return(
            <div>
              <div className="card blue accent-3">
                  <h5 className="accent-3 quizz">GoogleEarth Quizz</h5>
                      
                  {/* <ul>
                      {this.state.data.map((item, idx) => (
                          <li key={idx}>{item.Country} {item.ImageURL} {item.id}</li>
                      ))}
                  </ul> */}
                  <div className="collection multiple-choice">
                      <a href="#!" className="collection-item">Alvin</a>
                      <a href="#!" className="collection-item active">Falkland Islands (Islas Malvinas)</a>
                      <a href="#!" className="collection-item">Alvin</a>
                      <a href="#!" className="collection-item">Alvin</a>
                  </div>
                  <button className="waves-effect blue darken-2 btn next" onClick={this.randomizeItem}>NEXT CLUE</button>
              </div>    
              <Bigphoto imageChosen={this.state.imageChosen} key={this.state.idChosen}/>
            </div>
        )
    }
}

export default Quizz;


// {"Country":"Australia","Region":"-","ImageURL":"www.gstatic.com/prettyearth/assets/full/1003.jpg","GoogleMapsURL":"www.google.com/maps/@-10.040181,143.560709,12z/data=!3m1!1e3","id":1003},
/*

social interaction, achieving, self-expression, escapism, peek others´ lives

{ <{PostData.map((item, idx) => {
                  return <div>
                            <h1>Item</h1>
                            <p>{item.Country}</p>
                            <p>{item.ImageURL}</p>
                            <p>{item.ID}</p>
                         </div>
                })} /> }

generateNewColor(){
    const colorsNew = [...this.props.colors];
    const index = colorsNew.indexOf(this.state.color);
    if(index > -1){colorsNew.splice(index, 1)}
    
    const randomColor = colorsNew[Math.floor(Math.random()*colorsNew.length)];
    this.setState({color:randomColor})
}

genRandom(){
    let randdomValues = [];
    while(randdomValues.length < 6){
        let r = Math.floor(Math.random() * 40) + 1;
        if(randdomValues.indexOf(r) === -1) randdomValues.push(r);
    }
    this.setState(currrentState => ({ nums: [...randdomValues] }))
    console.log(randdomValues);
}

constructor(props) {
    super(props);
    this.state = { nums: Array.from({ length: this.props.numBalls }) };
    this.handleClick = this.handleClick.bind(this);
  }
  generate() {
    this.setState(curState => ({
      nums: curState.nums.map(
        n => Math.floor(Math.random() * this.props.maxNum) + 1
      )
    }));
  }

constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }
  reset() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    });
  }

 guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }


1
this.state = {
  todoList: {
    day: '' // Monday, Tuesday, etc...
    items: []
  }
}

2
onDaySelect(day) {
  this.setState({
    todoList: {
      ...this.state.todoList,
      day,
      items: []
    }
  })
}
  */