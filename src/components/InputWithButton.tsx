import React from 'react';

export interface InputWithButtonProps {
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSubmit: (e: React.FormEvent) => void,
    inputValue: string,
    placeHolder: string,
    label: string,
    btnText: string,
}

function InputWithButton({onSubmit, onInput, inputValue, placeHolder, btnText, label}: InputWithButtonProps) {

    return (
        <div>
            <form onSubmit={onSubmit} className="flex flex-col gap-2">
                <div className="flex">
                    <label htmlFor="code-input" className="text-xs text-gray-400">{label}</label>
                </div>
                <input autoFocus onInput={onInput} id="code-input" type="text" placeholder={placeHolder} value={inputValue}
                       className="border  rounded-lg border-gray-200 p-2 px-4 text-center "/>
                <button type="submit" className="bg-primary rounded-lg p-2 text-white">
                    {btnText}
                </button>
            </form>
        </div>
    );
}

export default InputWithButton;