import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { decode } from 'punycode';

export const getServerSideProps = async (context: { query: any; }) => {
    // const { query } = context;
    // const { id } = query;

    const res = await fetch(`https://deckofcardsapi.com/api/deck/${context.query.id}/draw/?count=1`);
    const data = await res.json();

    return { props: { draw: data } }
}

function One({ draw }: { draw: any }) {

    const router = useRouter()

    const [currentDraw, setcurrentDraw] = useState(draw);
    const [currentCardDecoded, setcurrentCardDecoded] = useState("");

    const handleDraw = async () => {
        const res = await fetch(`https://deckofcardsapi.com/api/deck/${router.query.id}/draw/?count=1`);
        const data = await res.json();
        setcurrentDraw(data);
        console.log(data);
    }

    useEffect(() => {
        if (currentDraw.success == true) {
            decode();
        }
    }, [currentDraw])

    const decode = () => {
        const charOne = currentDraw.cards[0].code.charAt(0);
        const charTwo = currentDraw.cards[0].code.charAt(1);

        let decodedCardCode = ""

        if (charOne == "J") {
            decodedCardCode += "Jack of ";
        } else if (charOne == "Q") {
            decodedCardCode += "Queen of ";
        } else if (charOne == "K") {
            decodedCardCode += "King of ";
        } else if (charOne == "A") {
            decodedCardCode += "Ace of ";
        } else if (charOne == "0") {
            decodedCardCode += "10 of ";
        } else {
            decodedCardCode += charOne + " of ";
        }

        if (charTwo == "C") {
            decodedCardCode += "Clubs ♣";
        } else if (charTwo == "D") {
            decodedCardCode += "Diamonds ♦";
        } else if (charTwo == "H") {
            decodedCardCode += "Hearts ♥";
        } else if (charTwo == "S") {
            decodedCardCode += "Spades ♠";
        } else {
            decodedCardCode += "What DIS? (╯°□°)╯︵ ┻━┻";
        }

        setcurrentCardDecoded(decodedCardCode);
    }

    return (
        <div className=' select-none h-screen w-full flex flex-col items-center justify-center space-y-5' onClick={() => { handleDraw() }}>
            {currentDraw.success &&
                <>
                    <div className=' font-bold'>Click to draw a card</div>
                    <div className=' h-1/4 w-full'
                        style={{
                            backgroundImage: `url(${currentDraw.success == true && currentDraw.cards[0].image})`,
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat"
                        }} />
                </>}
            <div className=' font-semibold'>{currentDraw.success == true && currentCardDecoded}</div>
            <div className=' font-semibold'>{currentDraw.success == true && currentDraw.remaining + " cards left in the deck."}</div>
            <div className=' text-center font-semibold'>{currentDraw.error && "Oops. " + currentDraw.error}</div>
        </div>
    )
}

export default One