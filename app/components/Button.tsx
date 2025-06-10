'use client'
import Link from 'next/link';
import React from 'react';
import { HiArrowLongRight } from 'react-icons/hi2';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    name: string;
    path: string;
}

const Button = ({ name,path,...props }: ButtonProps) => {
    return (
        <Link href={path}>
        <button className="btn btn--secondary  md:text-sm" {...props}>
            <p className="pr-4 lg:pr-3 lg:pl-3 py-1 pl-4">{name}</p>
            <div className="circle discuss-circle flex justify-center items-center">
                <div className="circle__arrow circle__arrow-discuss">
                    <HiArrowLongRight />
                </div>
            </div>
        </button>
        </Link>
    );
}

export default React.memo(Button);
