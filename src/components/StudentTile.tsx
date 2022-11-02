import React from 'react';


export class Student{
    constructor(public name: string, public done: boolean, public id: string) {}
}

interface props{
    student: Student
}

function StudentTile({student}:props) {
    const tileCSS = `aspect-square w-full grid place-items-center rounded-md ${student.done?"bg-green-400":"bg-red-400"}`
    return (
        <div className={tileCSS}>
            <p className="text-white">{student.name}</p>
        </div>
    );
}

export default StudentTile;