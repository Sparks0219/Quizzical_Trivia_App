import React from "react"

export default function Button(props){
    let color = "white";
    if (props.isSubmit){
        if (!props.isRight && props.isClicked){
            color = "#F8BCBC"
        }
        else if (props.isRight){
            color = "#94D7A2"
        }
    } else{
        if (props.isClicked){
            color = "#D6DBF5"
        }
    }
    let border = "0.8px solid #4D5B9E"
    if (props.isClicked || (props.isRight && props.isSubmit)){
        border ="0.8px"
    }
    const styles = {
        backgroundColor: color, 
        border: border,
        opacity: !props.isSubmit || props.isRight ? 1.0 : 0.5
    }
    return (
        <button className="question--button" onClick={props.chooseChoice} style={styles}>
                <span className="question--buttontext">{props.data}</span>
        </button>
    )
}