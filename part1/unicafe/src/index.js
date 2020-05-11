import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
)

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  const feedback = total === 0
    ? "No feedback given"
    : <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={total} />
        <Statistic text="average" value={(good - bad) / total} />
        <Statistic text="positive" value={100 * (good / total) + " %"} />
      </tbody>
    </table>;

  return (
    <div>
      <h1>statistics</h1>
      {feedback}
    </div>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>

      <Button text="good" onClick={() => setGood(good + 1)}></Button>
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)}></Button>
      <Button text="bad" onClick={() => setBad(bad + 1)}></Button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))