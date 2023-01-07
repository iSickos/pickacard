import { useState, useEffect } from "react"

export default function FOF() {

    const [cardtext, setcardtext] = useState(["♣♠♥♦", "♠♥♦♣", "♥♦♣♠", "♦♣♠♥"])
    const [displayText, setdisplayText] = useState("♣♠♥♦")

    useEffect(() => {
        setInterval(() => {
            let firstElement: string = cardtext.shift()!
            cardtext.push(firstElement)
            setdisplayText(cardtext[0])
        }, 1000)
    }, [cardtext])

    return (
        <>
            <div className=" h-screen w-full flex flex-col items-center justify-center space-y-28">
                <span className=" text-5xl">🃏{displayText}🃏</span>
                <div className=" flex flex-col items-center space-y-4">
                    <span className=" text-3xl">404</span>
                    <span className=" text-3xl">Page Not Found</span>
                </div>
                <span className=" text-5xl">🃏{displayText}🃏</span>
            </div>
        </>
    )
}
