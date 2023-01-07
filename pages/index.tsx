import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter();

  const [cardtext, setcardtext] = useState(["♣♠♥♦", "♠♥♦♣", "♥♦♣♠", "♦♣♠♥"])
  const [displayText, setdisplayText] = useState("♣♠♥♦")

  useEffect(() => {
    setInterval(() => {
      let firstElement: string = cardtext.shift()!
      cardtext.push(firstElement)
      setdisplayText(cardtext[0])
    }, 1000)
  }, [cardtext])

  const createDeck = async (count: number) => {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${count}`);
    const data = await res.json();
    // console.log(data);
    router.push(`/${data.deck_id}`)
  }

  return (
    <>
      <div className=" select-none h-screen w-full flex flex-col items-center justify-center space-y-16">
        <span className=" text-5xl">🃏{displayText}🃏</span>
        <div className=" flex flex-col items-center justify-center space-y-5">
          <div className=" text-neutral-800 text-2xl max-w-xs text-center">Number of decks ?</div>
          <button onClick={() => { createDeck(1) }} className=" w-60 h-16 bg-neutral-800 rounded-lg text-xl text-white">1 Deck {"(52 cards)"}</button>
          <button onClick={() => { createDeck(2) }} className=" w-60 h-16 bg-neutral-800 rounded-lg text-xl text-white">2 Decks {"(104 cards)"}</button>
          <button onClick={() => { createDeck(3) }} className=" w-60 h-16 bg-neutral-800 rounded-lg text-xl text-white">3 Decks {"(156 cards)"}</button>
        </div>
        <span className=" text-5xl">🃏{displayText}🃏</span>
      </div>
    </>
  )
}
