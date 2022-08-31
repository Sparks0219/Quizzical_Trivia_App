import React from "react"
import Start from "./components/Start"
import QuestionPage from "./components/QuestionPage"


export default function App(){
    const [start, setStart] = React.useState(true)
    const [allQuestions, setAllQuestions] = React.useState([])
    const [formData, setFormData] = React.useState({"difficulty":"", "amount":"5", "type":""})
    const [darkMode, setDarkMode] = React.useState(false)
    
    function toggleDarkMode() {
        setDarkMode(prevMode => !prevMode)
    }
    
    function handleSubmit(event){
        event.preventDefault()
        const difficulty = formData.difficulty !== "" ? `difficulty=${formData.difficulty}` : "difficulty"
        const type = formData.type !== "" ? `type=${formData.type}` : "type"
        async function getQuestions(){
            const res = await fetch(`https://opentdb.com/api.php?amount=${formData.amount}&
                ${difficulty}&${type}&encode=base64`)
            const data = await res.json()
            setAllQuestions(data.results)
            toggleStart(false)
        }
        getQuestions()
    }
    
    function toggleStart(newStart){
        setStart(newStart)
    }
    
    return(
        <main>
        { 
            start
            ?
            <Start 
                toggleStart={toggleStart}
                setAllQuestions={setAllQuestions}
                handleSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                darkMode={darkMode}
            />
            :
            <QuestionPage
                toggleStart={toggleStart}
                allQuestions={allQuestions}
                handleSubmit={handleSubmit}
                darkMode={darkMode}
            />
        }
        </main>
    )
}