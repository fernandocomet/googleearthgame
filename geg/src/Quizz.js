import React, { Component } from 'react';
import Bigphoto from './Bigphoto';
//import PostData from './data/images.json';
//import axios from "axios";

class Quizz extends Component{

    constructor(props){
        super(props);
        this.state = 
        {
            data:[],
            chosenItems:[],
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
    }

/*  axios
    .get(
      "https://raw.githubusercontent.com/ironhack-labs/lab-react-ironcontacts/master/starter-code/src/contacts.json"
    )
    .then(actors => {
      this.setState({
        ...this.state,
        actors: actors.data
      });
    }); */

    randomizeItem(){
        console.log('RandomItem');
        let randomItem = Math.floor(Math.random()*this.state.data.length);
        let randomImage = this.state.data[randomItem].ImageURL;
        let randomCountry = this.state.data[randomItem].Country;
        let randomId = this.state.data[randomItem].id;

        console.log(`randomImage `, randomImage);
        this.setState({
            itemChosen: randomItem,
            imageChosen: randomImage,
            countryChosen: randomCountry,
            idChosen : randomId 
            /*,
            imageChosen: this.state.itemChosen.ImageURL,
            countryChosen: this.state.itemChosen.Country*/
        });

    }

    /*TO DO
    - Random item - Load initial photo default random
    - Pass Random image
    - Show random photo
    - Push id to ChosenItems Array

    - Push Countries to countries Set
    - Select randomly three rando items different from itemChosen country

    - Show countries (4) randomly sorted
    - onClick -> CheckCountry, Score

    - Button begin / next /playagain
    */


    render(){
        //{const imgPath = this.state.imageChosen} 
        return(
            <div>
                <h1>Quizz</h1>
                     {/* <Image source={{uri : myImage, cache: 'reload'}} /> */}
                <Bigphoto imageChosen={this.state.imageChosen} key={this.state.idChosen}/>
                <div>
                    <img src='{this.state.imageChosen}' alt="image"/>
                </div>
                <button onClick={this.randomizeItem}>NEXT</button>
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

// {"Country":"Australia","Region":"-","ImageURL":"www.gstatic.com/prettyearth/assets/full/1003.jpg","GoogleMapsURL":"www.google.com/maps/@-10.040181,143.560709,12z/data=!3m1!1e3","id":1003},
/*

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