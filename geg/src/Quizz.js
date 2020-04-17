import React, { Component } from 'react';
import Bigphoto from './Bigphoto';
import './Quizz.css';

class Quizz extends Component{

    static defaultProps = {
      totalPlays: 20
    } 

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
            numPlays: 0,
            rolling: false,
            quizzing: false,
            gamestarted: false,
            quizButton: "START"
        }
        this.randomizeItem = this.randomizeItem.bind(this);
        this.initialSet = this.initialSet.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    componentDidMount() {
        fetch('https://raw.githubusercontent.com/fernandocomet/googleearthgame/master/geg/src/data/images.json')
          .then(response => response.json())
          .then(data => this.setState({ data }))
          .then(this.initialSet)
    }

    initialSet(){
          let countriesArr =[]; 
          for(let i=0 ; i < this.state.data.length; i++){
              countriesArr.push(this.state.data[i].Country)
          }
          let countriesArrSet = new Set(countriesArr);
          let randomItem = Math.floor(Math.random()*this.state.data.length); 
          let randomImage = this.state.data[randomItem].ImageURL;
          let plays = 0;

          this.setState({
              countries : countriesArrSet,
              imageChosen: randomImage,
              numPlays: plays
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
        let region = this.state.data[randomItem].Region;
        if(region === "-"){region = 'unknown'}
        console.log(randomCountry + ', region ' + region)

        //itemChosen : {Country:'', Region:'', ImageURL:'', GoogleMapsURL:'', id:''},

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
        countriesQuizz4.push(randomCountry) 
        countriesQuizz4.push(countriesArr[random1])
        countriesQuizz4.push(countriesArr[random2])
        countriesQuizz4.push(countriesArr[random3]);

        // This is to fix the Bug, write me if you found a better solution 
        for(let i=0 ; i<countriesQuizz4.length; i++){
          if(countriesQuizz4[i] === undefined){countriesQuizz4[i] = "Transnistria"} //There´s good wine there ;D
        }

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
          gamestarted: true
        });
    }

    // TO DO
    // Preload  https://commons.wikimedia.org/wiki/Category:Google_SVG_logos   https://thenounproject.com/term/camera/3267485/ Created by Vincencio from the Noun Project
    // Layer place, aciertos/score
    // Mobile
    // Twit

  

    handleChange(idx, event) {
      //console.log(idx);
      let correctAnswer;

      for (let i=0 ; i<this.state.countriesQuizz.length; i++){
          //console.log(this.state.countriesQuizz[i] + " - " + i);
          if(this.state.countryChosen === this.state.countriesQuizz[i]){
            //console.log("the correct answer is " + i);
            correctAnswer = i;
          }
      }

      let score = this.state.score;

      if(idx === correctAnswer){
          //console.log("OK!");
          //event.target.className = 'collection-item liitem teal accent-3';
          score = score +1;
      }else{
          //console.log("WRONG!");
          //event.target.className = 'collection-item liitem red darken-1';
      }

      let numPlays = this.state.numPlays;
      numPlays = numPlays +1;

      if(numPlays === this.props.totalPlays){this.setState({ rolling: true })}
      else{this.setState({ rolling: false })}

      this.setState({
        score: score,
        quizzing: true,
        quizButton: "NEXT",
        numPlays: numPlays
      })
    }

    resetGame(){
      //console.log("Reset");
      let theChosenReset = [];
      let numPlaysReset = 0;

      this.setState({
        chosenItems: theChosenReset,
        rolling : true,
        quizzing: false,
        numPlays: numPlaysReset
      })

    }


    render(){
      let leftPlays = this.props.totalPlays - this.state.numPlays; 
      let introEnd;

      if(this.state.gamestarted === false){           
          introEnd = <h5 className="introEnd">Find out where the photo was taken. Select one of the four possible answers.</h5>
      }else{ 
          if(this.state.numPlays === this.props.totalPlays){
            introEnd = 
            <div className="introEnd">
                <h5>You scored {this.state.score} out of {this.state.numPlays}</h5>
                <button className="waves-effect blue darken-2 btn next again" onClick={this.resetGame} >PLAY AGAIN</button>
            </div>
        }else{
            introEnd = 
            <ul className="collection multiple-choice">
                  {this.state.countriesQuizz.map((item, idx) => (
                        <button disabled={this.state.quizzing} className="neutral" onClick={this.handleChange.bind(this, idx)} key={idx}>{item}</button>
                  ))}
            </ul>
        }
      }

      return(
            <div>
              <div className="card blue accent-3">
                  <h5 className="accent-3 quizz">Google Earth Quiz</h5>     
                  {introEnd}              
                  <div className="scoring">
                    <div className="score">{this.state.score}/{this.state.numPlays} - {leftPlays} left </div>
                    <button className={"waves-effect blue darken-2 btn next"} onClick={this.randomizeItem} disabled={this.state.rolling}>{this.state.quizButton}</button>                    
                  </div>
              </div>    
              <Bigphoto imageChosen={this.state.imageChosen} key={this.state.idChosen}/>
            </div>
        )
    }
}

export default Quizz;

/*
          <div>
                {this.state.countriesQuizz.map((item, idx) => (
                      <button disabled={this.state.quizzing} className={this.state.itemStyle} onClick={this.handleChange.bind(this, idx)} key={idx}>{item}</button>
                ))}
          </div>
{"Country":"Australia","Region":"-","ImageURL":"https://www.gstatic.com/prettyearth/assets/full/1003.jpg","GoogleMapsURL":"https://www.google.com/maps/@-10.040181,143.560709,12z/data=!3m1!1e3","id":1003},
<button className={"waves-effect blue darken-2 btn next"} onClick={this.randomizeItem} disabled={this.state.rolling}>{this.state.quizButton}</button>             
itemStyle
<ul className="collection multiple-choice">
                {this.state.countriesQuizz.map((item, idx) => (
                      <button disabled={this.state.quizzing} className={this.state.itemStyle} onClick={this.handleChange.bind(this, idx)} key={idx}>{item}</button>
                ))}
          </ul>

 <button disabled={this.state.quizzing} className="collection-item liitem" onClick={this.handleChange.bind(this, idx)} key={idx}>{item}</button>
  <button disabled={this.state.quizzing} className="collection-item liitem" onClick={this.handleChange.bind(this, idx)} key={idx}>{item}</button>

 {/* {this.state.rolling ? "GUESS ANSWER" : "NEXT QUIZ"} }
*/