import React from "react";
// import type{FC} from "react";

const buttonTypes = ["primary","default"] as const;
export type ButtonType = (typeof buttonTypes)[number];
export interface ButtonProps{
    type?:ButtonType;
}

export const Button: React.FC<ButtonProps> = () =>{
    return <div>Button</div>;
};