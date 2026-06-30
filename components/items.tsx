'use client'

import { Component } from "react"
import Link from "next/link";

export class Items extends Component {
    
    render() {
        const items = [
            {
                id: 1,
                nome: 'Excalibur',
                imagem: '1-Excalibur.png',
                quantidade: 1,
                peso: 15,
                valorTotal: 1500
            },
            {
                id: 2,
                nome: 'Grimorio do Vazio',
                imagem: '2-Grimorio-do-Vazio.png',
                quantidade: 2,
                peso: 12,
                valorTotal: 980
            },
            {
                id: 3,
                nome: 'Lanterna de Eltar',
                imagem: '3-Lanterna-de-Eltar.png',
                quantidade: 4,
                peso: 12,
                valorTotal: 640
            },
            {
                id: 4,
                nome: 'Coroa do Rei Afogado',
                imagem: '4-Coroa-do-Rei-Afogado.png',
                quantidade: 1,
                peso: 8,
                valorTotal: 1200
            },
            {
                id: 5,
                nome: 'Adaga Eclipse',
                imagem: '5-Adaga-Eclipse.png',
                quantidade: 3,
                peso: 6,
                valorTotal: 750
            },
            {
                id: 6,
                nome: 'Relogio de Chronos',
                imagem: '6-Relogio-de-Chronos.png',
                quantidade: 1,
                peso: 5,
                valorTotal: 2000
            },
            {
                id: 7,
                nome: 'Mascara do Deus Cervo',
                imagem: '7-Mascara-do-Deus-Cervo.png',
                quantidade: 2,
                peso: 8,
                valorTotal: 890
            },
            {
                id: 8,
                nome: 'Manopla do Tita',
                imagem: '8-Manopla-do-Tita.png',
                quantidade: 1,
                peso: 18,
                valorTotal: 1750
            },
            {
                id: 9,
                nome: 'Coracao do Dragao Rubro',
                imagem: '9-Coracao-do-Dragao-Rubro.png',
                quantidade: 1,
                peso: 12,
                valorTotal: 2400
            }
        ];

        return(
            <div className="min-h-screen max-h-screen w-full flex flex-col justify-center items-center overflow-hidden">
                <div className="z-10 w-full flex justify-center items-center">
                    <img src={'/items/items-text.png'} alt="Items" width={700} height={100} className="z-10"/>
                    <div className="relative grid grid-cols-3 p-10">
                        <img src={'/items/bg.png'} className="absolute z-10 object-cover h-full w-full"/>

                        {items.map((item, index)=>(
                            <img key={index} src={`/items/${item.imagem}`} alt={`${item.nome}`} width={200} height={100} className="z-20"/>
                        ))}
                    </div>
                </div>
                <Link href='/items/choose' className="translate-y-[70px]">
                    <img src="/next-button.png" alt="Next" width={100} height={100} className="translate-x-0 z-10 cursor-pointer transition hover:scale-110"/>
                </Link>
            </div>
        ); 
    }
}