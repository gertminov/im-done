import React from 'react';

interface props {
    onClick: ()=> void
    text: string
    type?: "button"|"submit"| "reset"| undefined
}

function PrimaryBtn({onClick, text, type}:props) {
    return (
        <button onClick={onClick} type={type} className="bg-primary rounded-lg p-2 text-white">{text}</button>
    );
}

export default PrimaryBtn;