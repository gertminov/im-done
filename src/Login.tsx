import React, {useState} from 'react';
import InputWithButton from "./components/InputWithButton";
import {useNavigate} from "react-router-dom";
import State from "./state"
import {subscribeToChannel} from "./pusher";


function Login() {

    const [roomNR, setRoomNr] = useState("");
    const navigate = useNavigate();

    function enterRoom(event: React.FormEvent) {
        event.preventDefault()
        if (roomNR.length ==  5) {
            State.roomNR = roomNR
            subscribeToChannel(roomNR)
            navigate('/createuser')
        }
    }

    function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        const inputNr = parseInt(event.target.value);
        if (inputNr) {
            setRoomNr(""+inputNr);
        }else {
            setRoomNr("")//prevent NaN as value
        }
    }

    return (
        <div className="flex flex-col place-items-center">
            <div className="flex flex-col max-w-md">
                <InputWithButton
                    onInput={handleInput}
                    inputValue={roomNR}
                    onSubmit={enterRoom}
                    placeHolder={"ROOM CODE"}
                    btnText={"ENTER"}
                    label={"Enter code"}

                />
                <div className="flex flex-colflex flex-col  my-12">
                    <button onClick={()=> navigate("/mainteacher")} className='border  border-primary  rounded-lg p-2 text-primary text-bold'>CREATE NEW ROOM
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;