import React, {useEffect, useState} from 'react';
import State from "./state";
import PrimaryBtn from "./components/PrimaryBtn";
import StudentTile, {Student} from "./components/StudentTile";
import {pusherChannel, subscribeToChannel} from "./pusher";


function MainTeacher() {

    const [students, setStudents] = useState(new Map<string, Student>);
    const [gridCSS, setGridCSS] = useState("repeat(1, minmax(0, 1fr)) ");
    const [finishedStudents, setFinished] = useState(0);
    const [roomNR, setRoomNR] = useState(State.roomNR);
    const [curTask, setCurTask] = useState(1);


    function calcGirdCols(amt: number) {
        return Math.ceil(Math.sqrt(amt))
    }


    useEffect(() => {
        let doneStudents = 0
        students.forEach(student => student.done ? doneStudents++ : doneStudents)
        setFinished(doneStudents)
        const amtCols = calcGirdCols(students.size)
        setGridCSS(`repeat(${amtCols}, minmax(0, 1fr))`)
    }, [students])


    useEffect(() => {
        let nr = roomNR
        if (!roomNR) {
            nr = Math.round(Math.random() * 100000).toString().padEnd(5, "0")
            setRoomNR(nr)
            State.roomNR = nr
        }

        subscribeToChannel("private-" + nr);

        pusherChannel.bind("client-enter", (data: any) => {
            console.log("client-enter")
            studentChange(data)
        })

        pusherChannel.bind("client-done", (data: any) => {
            console.log("client-done")
            studentChange(data)
        })

        pusherChannel.bind("client-leave", (data: any) => {
            console.log("client-leave")
            students.delete(data.id)
            const newStudents = new Map(students);
            setStudents(newStudents)
        })

        pusherChannel.bind("client-change-name", (data: any) => {
            console.log("client-change-name")
            studentChange(data)
        })
    }, [])


    function studentChange(data: any) {
        const newStudent = new Student(data.name, data.done, data.id);
        const newStudents = new Map(
            students.set(newStudent.id, newStudent)
        )
        setStudents(newStudents)
    }


    function newTask() {
        setCurTask(curTask + 1)
        for (let student of students.values()) {
            student.done = false
            students.set(student.id, student)
        }
        const newStudents = new Map(students)
        setStudents(newStudents)
        pusherChannel.trigger("client-new-task", {task: curTask + 1})
    }

    function closeRoom() {
        pusherChannel.unsubscribe()
    }


    return (
        <div className="w-full h-full flex flex-col p-4 pb-12">
            <div className="mb-4">
                <h1 className="text-4xl">ROOM: {roomNR}</h1>
            </div>
            <div className="grid grid-cols-4 h-full  gap-4">
                <div className="flex flex-col justify-end px-4">
                    <button onClick={closeRoom}>CLOSE ROOM
                    </button>
                </div>


                <div className="col-span-2 grid gap-2 " style={{gridTemplateColumns: gridCSS}}>
                    {[...students].map(([key, student]) => (
                        <StudentTile key={student.id} student={student}/>
                    ))}

                </div>


                <div className="flex flex-col justify-end px-4 ">
                    <div className="h-full grid place-items-center">
                        <div>
                            <div>
                                <span>TASK: </span>
                                <span>{curTask}</span>
                            </div>
                            <div>
                                <span>{finishedStudents}/</span>
                                <span>{students.size} </span>
                                <span>DONE</span>
                            </div>
                        </div>
                    </div>
                    <PrimaryBtn onClick={newTask} text={"NEXT TASK"}/>
                </div>
            </div>
        </div>
    );
}

export default MainTeacher;