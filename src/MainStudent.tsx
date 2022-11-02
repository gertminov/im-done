import React, {useEffect, useState} from 'react';
import State from "./state";
import {useNavigate} from "react-router-dom";
import {pusherChannel} from "./pusher";
import {PencilIcon} from "@primer/octicons-react";
import {Student} from "./components/StudentTile";

function MainStudent() {
    const navigate = useNavigate();
    const [done, setDone] = useState(false);
    const [editable, setEditable] = useState(false);
    const [userName, setUsername] = useState(State.userName);
    const [doneCSS, setDoneCSS] = useState("bg-green-400 text-white rounded-lg p-12 text-4xl w-72");

    const roomNr = State.roomNR

    function leaveSession() {
        State.clear()
        // pusherChannel.trigger("client-leave", {name: userName})
        navigate("/")
    }

    useEffect(() => { //automatic leave from session
        pusherChannel.bind("client-new-task", (data: any) => {
            setDone(false)
        })

        return () => {
            pusherChannel.trigger("client-leave", {id: State.id})
        }
    }, [])

    useEffect(()=>{
        setDoneCSS(`${done? "bg-green-400": "bg-red-400"} text-white rounded-lg p-12 text-4xl w-72`)
    }, [done])

    function handleDone() {
        let localdone = !done
        setDone(!done)
        pusherChannel.trigger("client-done", new Student(userName, localdone, State.id))
    }

    function editName() {
        let canEdit = !editable
        if (!canEdit) {
            State.userName = userName;
            pusherChannel.trigger("client-change-name", new Student(userName, done, State.id))
        }
        console.log(editable)
        setEditable(canEdit)
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)
    }

    return (
        <div className="flex flex-col h-full w-full pb-12">
            <div className="h-full grid  place-items-center">
                <div className="flex flex-col gap-4 w-72">
                    <h1 className="text-2xl py-4 font-bold">ROOM {roomNr}</h1>
                    <div className="flex gap-2 text-xl h-12 items-center">
                        <span>NAME:</span>
                        <input onInput={handleInput} type="text" value={userName} disabled={!editable}
                               className="w-16 text-center bg-white"/>
                        <button onClick={editName}
                                className="h-min rounded-full border-gray-400 p-2 grid place-items-center hover:bg-gray-100 hover:border-2">
                            <PencilIcon size={14} fill={"#000000"}/>
                        </button>
                    </div>
                    <div>
                        <button onClick={handleDone} className={doneCSS}>{done?"DONE":"NOT DONE"}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-end ">
                <button onClick={leaveSession} className="bg-red-400 min-w-12 text-white rounded-lg p-2">LEAVE</button>
            </div>
        </div>
    );
}

export default MainStudent;