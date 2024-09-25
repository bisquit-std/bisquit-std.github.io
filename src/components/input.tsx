import React from "react";

export enum InputType {
    TEXT = "text",
    MEMO = "memo",
}

interface Props {
    type: InputType;
    title: string;
    value: string;
}

const Input: React.FC<Props> = (props) => {
    return (
        <div className="w-full">
            {props.type === InputType.TEXT ? (
                <input
                    type={props.type}
                    name={props.value}
                    placeholder={props.title}
                    className="bg-primary w-full px-5 py-4 rounded-md"
                />
            ) : (
                <textarea
                    name={props.value}
                    placeholder={props.title}
                    className="bg-primary w-full px-5 py-4 h-52 rounded-md"
                />
            )}
        </div>
    );
};

export default Input;
