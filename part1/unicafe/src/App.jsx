import { useState } from 'react'

const Button = ({handleClick,text}) =>(
<button onClick={handleClick}>{text}</button>
)

const StatisticsLine = (props) =>(
      <p>{props.name} {props.name === 'percentage' ? props.value + '%' : props.value}</p>
     );

const  Statistics = (props) => {
 
  if(props.all === 0){
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
  <StatisticsLine name="good" value={props.good} />
  <StatisticsLine name="neutral" value={props.neutral} />
  <StatisticsLine name="bad" value={props.bad} />
  <StatisticsLine name="all" value={props.all} />
  <StatisticsLine name="average" value={props.average} />
  <StatisticsLine name="percentage" value={props.percentage} />
  
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
