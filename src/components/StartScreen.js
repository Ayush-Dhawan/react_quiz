import React from 'react'
import { useQuiz } from '../contexts/QuizContext'

export default function StartScreen() {
  const {dispatch, numQuestions} = useQuiz()
  return (
    <div className='start'>
      <h2>Welcome to the react quiz!</h2>
      <h3>{numQuestions} question to heck your react mastery</h3>
      <button onClick={()=>dispatch({type: "active"})} className='btn btn-ui'>Let's start</button>
    </div>
  )
}
