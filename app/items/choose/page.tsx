'use client'

import Link from "next/link";
import { use, useState } from "react";

export default function Page() {
  const [intervalScheduling, setIntervalScheduling] = useState(false);
  const [knapsack, setKnapsack] = useState(false);
  const [huffman, setHuffman] = useState(false);

  function handleClickInterval() {
    if(!intervalScheduling) {
        setIntervalScheduling(true);
    }
  }
    function handleClickKnap() {
        if(!knapsack) {
            setKnapsack(true);
        }
  }

    function handleClickHuffman() {
        if(!huffman) {
            setHuffman(true);
        }
  }


  return (
        <div className="min-h-screen max-h-screen w-full flex flex-col justify-center items-center">
            <div className="relative z-10">
                <img src="/items/bg.png" width={700} height={100} className="z-10"/>
                <div className="absolute top-20 left-20 text-black text-[13px] mr-[75px]">
                    <h1>Sabemos que você é um ótimo programador e conhece muito bem sobre algoritmos, especialmente programação dinâmica, qual seria o melhor algoritmo que poderiamos utilizar para maximizar o valor dos itens na mochila de Parvo?</h1>
                    <div className="h-[50px]"/>
                    <ul className="flex flex-col justify-center items-center gap-[10px]">
                        <li className={intervalScheduling?"text-red-500":"cursor-pointer transition hover:scale-105"} onClick={handleClickInterval}>Interval Scheduling</li>
                        <li className={knapsack?"text-green-500":"cursor-pointer transition hover:scale-105"} onClick={handleClickKnap}>Knapsack</li>
                        <li className={huffman?"text-red-500":"cursor-pointer transition hover:scale-105"} onClick={handleClickHuffman}>Código de Huffman</li>
                    </ul>
                </div>
            </div>
            {knapsack? 
            <Link href='/items/choose/hit' className="translate-y-[70px]">
                <img src="/next-button.png" alt="Next" width={100} height={100} className="translate-x-0 z-10 cursor-pointer transition hover:scale-110"/>
            </Link> : <div className="h-[80px]"/>
            }
        </div>
    );
}