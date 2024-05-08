import { useState } from 'react'

const Button = ({handleClick,text}) =>(
<button onClick={handleClick}>{text}</button>
)

const  Statistics = (props) => {
 
  if(props.all ===0){
    return(
      <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </div>
    )
  }

  return(
  <div>
    <h1>statistics</h1>
  <p>good {props.good}</p>
  <p>neutral {props.neutral}</p>
  <p>bad {props.bad}</p>
  <p>all {props.all}</p>
  <p>average {props.average}</p>
  <p>percentage {props.percentage}%</p>
 </div>
  );
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const average = (good-bad)/all
  const percentage =(good/all)*100
  return (
    <div>
    <h1>give feedback</h1>
    <Button handleClick={() => {setGood(good+1); setAll(all+1)}} text="positive" />
    <Button handleClick={() => {setNeutral(neutral+1); setAll(all+1)}} text="neutral" />
    <Button handleClick={() => {setBad(bad+1); setAll(all+1)}} text="negative" />
    <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} percentage={percentage}  />
    
  
    </div>
  )
}

export default App
