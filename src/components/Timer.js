import React, { useEffect } from 'react'
import { useQuiz } from '../contexts/QuizContext'

export default function Timer() {
  const {dispatch, timer} = useQuiz()
    const mins = Math.floor(timer/60)
    const secs = timer%60

    useEffect(function(){
       const timer_id =  setInterval(() => {
            dispatch({type: "tick"})
        }, 1000);

        return ()=> clearInterval(timer_id)
    },[])
  if(timer > 0) return (
    <p className='timer'>
      {mins < 10 && 0}{mins}:{secs < 10 && 0}{secs}
    </p>
  )

  else{
    {dispatch({type: "finished"})}
  }
}
