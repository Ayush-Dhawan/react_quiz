

import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "../Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Timer from "./Timer";

const initialstate = {
  questions: [],

  //loading, error, rweady, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  timer: null,
  highScore: 0
}
export default function App(){

  const SECS_PER_Q = 10;
  const [state, dispatch] = useReducer(reducer, initialstate)
  const {questions, status, index, answer, points,timer, highScore} = state;

  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce((prev, curr)=>{
    return prev + curr.points
  }, 0)

  function reducer(state, action){
    switch(action.type){
      case "restart":
       return {...initialstate, questions : state.questions, status : "ready"}

      case 'dataReceived':
        return {...state, questions: action.payload, status: "ready"}

      case "dataFailed":
        return{...state, status: "error"}

      case 'active':
        return {...state, status: 'active', timer: state.questions.length * SECS_PER_Q}

      case 'newAnswer':
        const question = state.questions[state.index];

        return {...state, answer: action.payload, 
          points: action.payload === question.correctOption ? state.points + question.points : state.points
        }

      case 'nextQuestion':
        return {...state, index: state.index + 1, answer: null}

      case "tick":
        return{...state, timer: state.timer - 1}

      case 'finished':
        return {...state, status: 'finished', highScore: state.points > state.highScore ? state.points : state.highScore}
      default:
        throw new Error("Action Unknown")
      }
    }
    
    useEffect(function(){
      fetch("http://localhost:9000/questions")
      .then(res => res.json())
      .then(data => dispatch({type: "dataReceived", payload: data}))
      .catch(error => dispatch({type: "dataFailed"}))
    }, [])

  return(
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen dispatch={dispatch} numQuestions={numQuestions}/>}
        {status === 'active' && 
        <>
        <Progress numQuestions={numQuestions} index={index} maxPossiblePoints={maxPossiblePoints} points ={points} answer={answer} />
        <Questions question = {questions[index]} dispatch={dispatch} answer={answer}/>
        <footer>
        <Timer dispatch={dispatch} timer={timer}/>
        <NextQuestion answer={answer} dispatch={dispatch} index={index} numQuestions={numQuestions} />
        </footer>
        </>}
        {status === "finished" && <FinishedScreen maxPossiblePoints={maxPossiblePoints} points={points} highScore={highScore} dispatch={dispatch} />}
      </Main>
    </div>
  )
}