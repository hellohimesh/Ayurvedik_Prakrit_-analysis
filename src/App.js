import React, { Component } from 'react';
import quizQuestions from './api/questions';
import Quiz from './components/Quiz';
import Result from './components/Result';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    let answersCount={};
    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        a: 0,
        b: 0,
        c: 0
      },
      result: ''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.restartQuiz = this.restartQuiz.bind(this);
  }

  componentWillMount() {
    const shuffledAnswerOptions = quizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }
  restartQuiz = ()=> {
    this.setState({
      counter: 0,
      questionId: 1,
      answer: '',
      answersCount: {
        a: 0,
        b: 0,
        c: 0
      },
      result: ''
    })
  }
  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);

    if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 200);
    } else {
      this.setResults(this.getResults());
//      setTimeout(() => this.setResults(this.getResults()),100);
    }
  }

  setUserAnswer(answer) {
    console.log("answer",answer);
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: state.answersCount[answer] + 1
      },
      answer: answer
      
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }
cloneJson=(obj)=> JSON.parse(JSON.stringify(obj));

  getResults() {     
     this.answersCount = this.cloneJson(this.state.answersCount);
    const max =  this.getMax();
     delete this.answersCount[max];
     const sMax = this.getMax();
     delete this.answersCount[sMax];    
    const min = this.getMax();
    delete this.answersCount[min];
    console.log(this.state.answersCount,max,sMax,min);
 
    //algorithm
    if ((this.state.answersCount[max] - this.state.answersCount[sMax]) < this.state.answersCount[max] / 10 && (this.state.answersCount[sMax] - this.state.answersCount[min]) < this.state.answersCount[max] / 10 && (this.state.answersCount[max] - min) < this.state.answersCount[max]/10){
      console.log('abc');
      return 'Vata-Pita-Kapha Prakruti';
    }
    else if ((this.state.answersCount[max] - this.state.answersCount[sMax]) > this.state.answersCount[max]/2){
      console.log(`max${max}`);
      
        return this.getPrakrutiType(max);
   }
    else if ((this.state.answersCount[max] - this.state.answersCount[sMax]) < this.state.answersCount[max]/2){
      console.log(this.state.answersCount[sMax] / 10);
          if((this.state.answersCount[sMax] - this.state.answersCount[min]) < this.state.answersCount[sMax]/10){
            console.log('abc');
            return 'Vata-Pita-Kapha Prakruti'
          }
          else{
            console.log(`max-smax  ${max} - ${sMax}`)
            return `${this.getPrakrutiType(max)}-${this.getPrakrutiType(sMax)}`
          }
    }
  }
getPrakrutiType=(type)=>{
  if(type==='a')
    return 'Pita'
  if(type === 'b')
    return 'Vata'
  if(type=== 'c')
    return 'Kapha'
}
  getMax=()=>{
    let answersCountKeys = Object.keys(this.answersCount);
    let answersCountValues = answersCountKeys.map(key => this.answersCount[key]);
    let maxAnswerCount = Math.max.apply(null, answersCountValues);
    return answersCountKeys.filter(key => this.answersCount[key] === maxAnswerCount)[0];
  }
  getSecondMax(arr){
  var max = Math.max.apply(null, arr); 
  arr.splice(arr.indexOf(max), 1); 
  return Math.max.apply(null, arr); 
};
  setResults(result) {
      this.setState({ result: result });
    
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result.toUpperCase()} quizSelection={this.state.answersCount} restartQuiz={this.restartQuiz} />;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">

          <h2>Patient Survey</h2>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default App;
