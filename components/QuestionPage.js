import React from "react"
import Question from "./Question"
import {nanoid} from "nanoid"

export default function QuestionPage(props){
    const [isSubmit, setIsSubmit] = React.useState(false)
    const [correctAns, setCorrectAns] = React.useState(props.allQuestions.length)
    const [questions, setQuestions] = React.useState(allNewQuestions(props.allQuestions))
    const [allAnswered, setAllAnswered] = React.useState(false)
    
    React.useEffect(() => {
        setAllAnswered(questions.every(question => question.answered))
    }
    ,[questions])
    
    React.useEffect(()=>{
        props.toggleStart(false)
        if (isSubmit){
            setQuestions(allNewQuestions(props.allQuestions))
            setCorrectAns(props.allQuestions.length)
            setIsSubmit(false)
        }
    }
    ,[props.allQuestions])
    
    function changeAnswered(questionID, newAnswered){
        setQuestions(questions.map(oldQuestion => {
            const newQuestion = {...oldQuestion}
            if (questionID === newQuestion.id){
                newQuestion.answered = newAnswered;
            }
            return newQuestion
        }))
    }
    
    function generateQuestion(question){
        return {
            id : nanoid(),
            question: question.question,
            correct: question.correct_answer,
            incorrect: question.incorrect_answers,
            answered: false, 
        }
    }
    
    function allNewQuestions(questionData){
        const newQuestions = []
        for (let i = 0; i < questionData.length; ++i){
            newQuestions.push(generateQuestion(questionData[i]))
        }
        return newQuestions
    }
    
    function changeSetting() {
        if (isSubmit){
            props.toggleStart(true)
        }
        setIsSubmit(prevSubmit => !prevSubmit)
    }
    
    function repeatSetting(event){
        props.handleSubmit(event)
    }
    
    const questionElements = questions.map(question=> 
        <Question
            key={question.id}
            id={question.id}
            question={question.question}
            correct={question.correct}
            incorrect={question.incorrect}
            isSubmit={isSubmit}
            setCorrectAns={setCorrectAns}
            changeAnswered={changeAnswered}
        />
    )
    const styles= !allAnswered? {pointerEvents: "none", opacity: 0.5}: {}
    return(
        
        <div className = "question--page">
            <section className = "question--list">
                {questionElements}
            </section>
            <div className = "question--footer">
                {isSubmit && <p className = "question--footertext">
                    {`You scored ${correctAns}/${questions.length} correct answers`}
                </p>}
                {!allAnswered && <p>Select an answer for all questions!</p>}
                <button className="question--submit" style={styles} onClick={changeSetting}>
                    {isSubmit ? "Change Settings" : "Check Answers"}
                </button>
                {isSubmit && <button className="question--submit" onClick={repeatSetting}>Play Again </button>}
            </div>
        </div>
    )
}