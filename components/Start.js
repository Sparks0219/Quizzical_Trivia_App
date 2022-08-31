import React from "react"

export default function Start(props){
    
    function handleChange(event){
        props.setFormData(prevFormData => {
            return{
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }
    
    return(
        <div className="start--container">
            <h1 className="start--title">Quizzical</h1>
            <p className="start--text">Test your trivia skills!</p>
            <form id="start-form" className="start--form" onSubmit={props.handleSubmit}>
                <div className="form--element">
                    <label htmlFor="amount" className="form--label">Number of Questions:</label>
                    <select 
                        id="amount"
                        value={props.formData.amount}
                        onChange={handleChange}
                        name="amount"
                        className="form--input"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div className="form--element">
                    <label htmlFor="difficulty" className="form--label">Difficulty:</label>
                    <select 
                        id="difficulty"
                        value={props.formData.difficulty}
                        onChange={handleChange}
                        name="difficulty"
                        className="form--input"
                    >
                        <option value={"Any Difficulty"}>Any Difficulty</option>
                        <option value={"easy"}>Easy</option>
                        <option value={"medium"}>Medium</option>
                        <option value={"hard"}>Hard</option>
                    </select>
                </div>
                <div className="form--element">
                    <label htmlFor="type" className="form--label">Type:</label>
                    <select 
                        id="type"
                        value={props.formData.type}
                        onChange={handleChange}
                        name="type"
                        className="form--input"
                    >
                        <option value={"Any Type"}>Any Difficulty</option>
                        <option value={"multiple"}>Multiple Choice</option>
                        <option value={"boolean"}>True / False</option>
                    </select>
                </div>
            </form>
            <button form="start-form" type="submit" className="form--button">Start Quiz</button>
        </div>
    )
}