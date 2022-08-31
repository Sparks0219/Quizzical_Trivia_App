import React from "react"
import {nanoid} from "nanoid"
import Button from "./Button"

export default function Question(props){
    const choiceData = [props.correct].concat(props.incorrect);
    const [choices,setChoices] = React.useState(allNewChoices())
    const [correct, setCorrect] = React.useState(false);
    
    React.useEffect(() => { 
        const checkCorrect = !choices.every(choice => !choice.isClicked || !choice.isRight);
        const checkAnswered = !choices.every(choice => !choice.isClicked)
        
        props.changeAnswered(props.id, checkAnswered)
        if (checkCorrect !== correct){
            setCorrect(checkCorrect)
        }
    }, [choices])
    
    React.useEffect(() => {
        props.setCorrectAns(prevCorrectAns => correct ? prevCorrectAns+1 : prevCorrectAns-1)
    },[correct])
    
    
    function generateNewChoice(data){
        return {
            id : nanoid(),
            isClicked : false,
            isRight : data === props.correct,
            data : data
        }
    }
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }

    function allNewChoices(){
        const newChoices = []
        for (let i = 0; i < choiceData.length; i++) {
            newChoices.push(generateNewChoice(choiceData[i]))
        }
        shuffle(newChoices)
        return newChoices
    }
    
    function chooseChoice(id){
        if (props.isSubmit){
            return;
        }
        setChoices(oldChoices => oldChoices.map(choice => {
            return id !== choice.id 
            ?
                {
                    ...choice,
                    isClicked: false,
                }
            :
                {
                    ...choice,
                    isClicked: !choice.isClicked,
                }
        }))
    }
    
    function b64DecodeUnicode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
    
    const choicesElements = choices.map(choice => {
        return(
            <Button 
                key={choice.id} 
                id={choice.id}
                isClicked={choice.isClicked}
                isRight={choice.isRight}
                data={b64DecodeUnicode(choice.data)}
                chooseChoice={() => chooseChoice(choice.id)}
                isSubmit={props.isSubmit}
            />
        )
    })
    
    return(
        <div className="question">
            <h3 className="question--text">{b64DecodeUnicode(props.question)}</h3>
            <div className="question--buttons">
                {choicesElements}
            </div>
            <hr className = "question--border"/>
        </div>
    )
}