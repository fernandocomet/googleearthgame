import React, { Component } from 'react';
import Bigphoto from './Bigphoto';
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
            numPlays: 0,
            rolling: false,
            quizzing: false,
            quizButton: "START", 
            itemStyle: '',
            clickedStyle: '',
        }
        this.randomizeItem = this.randomizeItem.bind(this);
        this.initialSet = this.initialSet.bind(this);
    }

    componentDidMount() {
        fetch('https://raw.githubusercontent.com/fernandocomet/googleearthgame/master/geg/src/data/images.json')
          .then(response => response.json())
          .then(data => this.setState({ data }))
          .then(this.initialSet)

        this.setState({
          itemStyle: 'neutral'
        })  
    }

    initialSet(){
          let countriesArr =[]; 
          for(let i=0 ; i < this.state.data.length; i++){
              countriesArr.push(this.state.data[i].Country)
          }
          let countriesArrSet = new Set(countriesArr);
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

        let numPlays = this.state.numPlays;
        numPlays = numPlays +1;

        let newItemStyle = 'neutral';
        
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
          numPlays: numPlays,
          itemStyle: newItemStyle,
          clickedStyle: newItemStyle 
        });
    }

    // TO DO
    // Init and End Gaame
  

    handleChange(idx, event) {
      console.log(idx);
      let correctAnswer;

      for (let i=0 ; i<this.state.countriesQuizz.length; i++){
          console.log(this.state.countriesQuizz[i] + " - " + i);
          if(this.state.countryChosen === this.state.countriesQuizz[i]){
            console.log("the correct answer is " + i);
            correctAnswer = i;
          }
      }

      let score = this.state.score;
      let clickedStyleRight = 'right';
      let clickedStyleWrong = 'wrong';

      if(idx === correctAnswer){
          console.log("OK!");
          this.setState({clickedStyle: clickedStyleRight })
          event.target.className = this.state.clickedStyle;
          //event.target.className = 'right'; 
          //event.target.className = 'collection-item liitem teal accent-3';
          score = score +1;
      }else{
          console.log("WRONG!");
          this.setState({clickedStyle: clickedStyleWrong })
          event.target.className = this.state.clickedStyle;
          //event.target.className = 'wrong';
          //event.target.className = 'collection-item liitem red darken-1';
          //Style correctAnswer TO DO
      }


      this.setState({
        score: score,
        rolling: false,
        quizzing: true,
        quizButton: "NEXT"
        //itemStyle: newItemStyle
      })
    }

    resetGame(){
      console.log("Reset");
    }



    render(){
      let leftPlays = 10 - this.state.numPlays;  //TO DO change 10 for variable
      let introEnd;

      if(this.state.numPlays < 1){
          introEnd = <h5 className="introEnd">Find out where the photo was taken. Select one of the four possible answers.</h5>
      }else if(this.state.numPlays >= 10){
          introEnd = 
          <div className="introEnd">
              <h5>You scored {this.state.score} out of {this.state.numPlays}</h5>
              <button className="waves-effect blue darken-2 btn next again" onClick={this.resetGame} >PLAY AGAIN</button>
          </div>
      }else{
          introEnd = 
          <div>
                {this.state.countriesQuizz.map((item, idx) => (
                      <button disabled={this.state.quizzing} className={this.state.itemStyle} onClick={this.handleChange.bind(this, idx)} key={idx}>{item}</button>
                ))}
          </div>
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