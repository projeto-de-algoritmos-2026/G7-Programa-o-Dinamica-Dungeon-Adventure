'use client'

import { Component } from "react"
import Link from "next/link";

export class History extends Component {
    render() {
        return (
        <div className="min-h-screen max-h-screen w-full bg-gray-300 flex flex-col justify-center items-center overflow-hidden">
            <img src="/message.png" alt="Intro Message" width={600} height={150} className="z-10"/>
            <img src="/character.png" alt="Character" width={600} height={600} className="-translate-x-4 z-10"/>
            <Link href='/items'>
                <img src="/next-button.png" alt="Next" width={100} height={100} className="translate-x-0 z-10 cursor-pointer transition hover:scale-110"/>
            </Link>
        </div>
        );   
    }
}