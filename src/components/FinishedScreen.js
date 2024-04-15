import React from 'react'
import { useQuiz } from '../contexts/QuizContext'

export default function FinishedScreen() {
  const {answer, dispatch, index, numQuestions, points, maxPossiblePoints, highScore} = useQuiz()
    const percentage = Math.ceil(points/maxPossiblePoints * 100)
  return (
    <>
    <p className='result'>
      You scored <strong>{points}</strong> / {maxPossiblePoints} that is  {percentage}%
    </p>
    <p className='highscore'>highScore: {highScore}</p>
    <button onClick={()=>dispatch({type: "restart"})} className='btn btn-ui'>Restart</button>
    </>
  )
}
