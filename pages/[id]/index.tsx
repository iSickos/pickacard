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

    const handleDraw = async () => {
        const res = await fetch(`https://deckofcardsapi.com/api/deck/${router.query.id}/draw/?count=1`);
        const data = await res.json();
        setcurrentDraw(data);
        console.log(data);
    }

    return (
        <div className=' select-none h-screen w-full flex flex-col items-center justify-center space-y-5' onClick={() => { handleDraw() }}>
            {currentDraw.success == true &&
                <>
                    <div className=' font-bold'>Click to draw a card</div>
                    <div className=' h-1/4 w-full'
                        style={{
                            backgroundImage: `url(${currentDraw.cards[0].image})`,
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat"
                        }} />

                    <div className=' font-semibold first-letter:uppercase'>{currentDraw.cards[0].value.toLowerCase()} of {currentDraw.cards[0].suit.charAt(0) + currentDraw.cards[0].suit.slice(1).toLowerCase()}
                        {currentDraw.cards[0].suit == "HEARTS" && " ♥"}
                        {currentDraw.cards[0].suit == "SPADES" && " ♠"}
                        {currentDraw.cards[0].suit == "DIAMONDS" && " ♦"}
                        {currentDraw.cards[0].suit == "CLUBS" && " ♣"}
                    </div>
                    <div className=' font-semibold'>{currentDraw.remaining + " cards left in the deck."}</div>
                </>}
            <div className=' text-center font-semibold'>{currentDraw.error && "Oops. " + currentDraw.error}</div>
        </div>
    )
}

export default One