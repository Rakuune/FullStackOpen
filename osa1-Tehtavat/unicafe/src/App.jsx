import { useState } from 'react'

const Button = ({ handleClick, text }) => ( 
   <button onClick={handleClick}>    
   {text}  
   </button>)

const StatisticLine = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  );
}

const Statistics = (props) => {
  const totalReviews = props.good + props.neutral + props.bad;
  const average = totalReviews === 0 ? 0 : (props.good - props.bad) / totalReviews;
  const positivePercentage = totalReviews === 0 ? 0 : (props.good / totalReviews) * 100;


  if (totalReviews === 0) {
    return <p>No feedback given</p>;
  }

  return(
    <>
    <StatisticLine text="good" value ={props.good}/>
    <StatisticLine text="neutral" value={props.neutral}/>
    <StatisticLine text="bad" value={props.bad}/>
    <StatisticLine text="all" value={totalReviews}/>
    <StatisticLine text="average" value={average.toFixed(1)}/>
    <StatisticLine text="positive" value={`${positivePercentage.toFixed(1)} %`}/>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodReview = () => {
    setGood(good + 1)
  }
  const handleNeutralReview = () => {
    setNeutral(neutral + 1)
  }
  const handleBadReview = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodReview}text='good'/>
      <Button handleClick={handleNeutralReview}text='neutral'/>
      <Button handleClick={handleBadReview}text='bad'/>

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
