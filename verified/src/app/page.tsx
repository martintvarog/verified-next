'use client'

import Image from "next/image";
import Link from 'next/link';

import * as React from "react"

import {Card, CardContent} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function Home() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    const cardTexts = [
        "Secure. Seamless. Credible. Elevate your operations with digital attestation creation and verification, fortified by attached documents for unparalleled effectiveness.",
        "Decentralization: Empowering autonomy, innovation, and resilience by redistributing power and control away from centralized authorities, shaping diverse domains.",
        "Cryptography: Empowering users with advanced mathematical techniques to ensure digital security and protect sensitive information.",
        "Ethereum's attestation service: A reliable mechanism for verifying external data, enhancing integrity and trust in decentralized applications on the Ethereum blockchain.",
    ];

    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )

    return (
        <main className="container">
            <div className="text-white">
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full max-w-xs"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {Array.from({length: 4}).map((_, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card className="bg-gray-600">
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <span className="text-4xl font-semibold"></span>
                                            <p className="text-xl font-semibold ml-2">{cardTexts[index]}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="bg-gray-700"/>
                    <CarouselNext className="bg-gray-700"/>
                </Carousel>
            </div>


        </main>
    )
}
//
//
// export default function Home() {
//     return (
//         <main className="container">
//
//             <h2>Ověřeno.cz/Verified.com</h2>
//             <button className="button-div">
//                 <Link href="createAttestation">Create Attestation</Link>
//             </button>
//             <button className="button-div">
//                 <Link href="viewAttestation">View Attestation</Link>
//             </button>
//             <button className="button-div">
//                 <Link href="verifyAttestation">Verify Attestation</Link>
//             </button>
//
//         </main>
//     );
// }