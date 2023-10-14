import {useState} from 'react'

const StatisticsHeader = () =>
    <h1>statistics</h1>;

const StatisticLine = (props) =>
    <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
    </tr>;

const Statistics = (props) => {
    const all_feedback = props.good + props.neutral + props.bad;
    if (!all_feedback) {
        return (
            <>
                <StatisticsHeader/>
                <p>No feedback given</p>
            </>
        )
    }

    const avg_feedback = (props.good - props.bad) / all_feedback;
    const positive_feedback = 100 * props.good / all_feedback;

    return (
        <>
            <StatisticsHeader/>
            <table>
                <tbody>
                <StatisticLine text='good' value={props.good}/>
                <StatisticLine text='neutral' value={props.neutral}/>
                <StatisticLine text='bad' value={props.bad}/>
                <StatisticLine text='all' value={all_feedback}/>
                <StatisticLine text='average' value={avg_feedback}/>
                <StatisticLine text='positive' value={positive_feedback}/>
                </tbody>
            </table>
        </>
    )
}

const Button = ({text, handleOnClick}) => {
    return (
        <button onClick={handleOnClick}>{text}</button>
    );
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>

            <Button text='good' handleOnClick={() => setGood(good + 1)}/>
            <Button text='neutral' handleOnClick={() => setNeutral(neutral + 1)}/>
            <Button text='bad' handleOnClick={() => setBad(bad + 1)}/>

            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
            />
        </div>
    )
}

export default App;
