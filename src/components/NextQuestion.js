import React from 'react'
import { useQuiz } from '../contexts/QuizContext';

export default function NextQuestion() {
  const {answer, dispatch, index, numQuestions} = useQuiz()
    if(answer === null) return null;
  if(index < numQuestions-1)return (
    <div>
      <button onClick={()=> dispatch({type: "nextQuestion"})} className='btn btn-ui'>Next</button>
    </div> 
  )

  if(index === numQuestions-1){
    return <button className='btn btn-ui' onClick={() => dispatch({type: "finished"})}>Finish</button>
  }
}
