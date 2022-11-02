import React, {useEffect} from 'react';
import PrimaryBtn from "./components/PrimaryBtn";
import {useNavigate} from "react-router-dom";
import State from "./state";
import {subscribeToChannel} from "./pusher";

function Createroom() {
    let roomNR = "0"

    const navigate = useNavigate();
    useEffect(() => {
        State.roomNR = roomNR
        subscribeToChannel("private-" + roomNR)
    }, [])

    function handleOnClick() {
        navigate("/mainteacher")
    }

    return (
        <div>
            <h1>YOUR ROOM IS: {roomNR}</h1>
            <PrimaryBtn onClick={handleOnClick} text={"CONTINUE"}/>
        </div>
    );
}

export default Createroom;