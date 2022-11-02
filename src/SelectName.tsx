import React, {useState} from 'react';
import InputWithButton from "./components/InputWithButton";
import {useNavigate} from "react-router-dom";
import State from "./state";
import {pusherChannel} from "./pusher";
import {Student} from "./components/StudentTile";



function SelectName() {
    const navigate = useNavigate();
    const roomNR = State.roomNR

    const [name, setName] = useState("");

    function enterMain(e: React.FormEvent) {
        const student = new Student(name, false, State.genID());
        State.userName = name
        pusherChannel.trigger("client-enter", student)
        navigate("/mainstudent")

    }
    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)

    }

    return (
        <div>
            <h1>ROOM {roomNR}</h1>
            <InputWithButton
                onSubmit={enterMain}
                onInput={handleInput}
                inputValue={name}
                label={"Enter name"}
                btnText={"Enter"}
                placeHolder={"YOUR NAME"}
            />

        </div>
    );
}

export default SelectName;