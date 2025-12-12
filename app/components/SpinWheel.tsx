"use client";

import { useState } from "react";

const prizes = [
  "Miguel Li",
  "Hans Canizares",
  "John Paul Cano",
  "Jake Dela Pena",
  "Jem Riego",
  "Angelo Penales",
  "Lendl Bacolor",
  "Kim Sollano",
  "Lance Filler",
  "Aila Valiente",
  "Ariane Malalad",
  "John Roble",
  "John Ang",
  "Paul Atienza",
  "Chantel Santos",
  "Christian Marcelo",
  "James Indino",
  "Juphet Divino",
  "Jeff Bautista",
  "Kevin Janer",
  "Mary Darl Esguerra",
  "Mel Yuson",
  "Jaimee Chrysteen Palpal-Latic",
  "Joriz Alfred Recto",
  "Kent Ronan Francelino",
  "John Corporal",
];

const chosenone = [
  "Miguel Li",
  "Hans Canizares",
  "John Paul Cano",
  "Jake Dela Pena",
  "Jem Riego",
  "Angelo Penales",
];

const coolKid = false; // if true, always land on Miguel Li

export default function GrayboxRaffle() {
  const [availablePrizes, setAvailablePrizes] = useState([...prizes]);
  const [availableChosen, setAvailableChosen] = useState([...chosenone]);
  const [spinning, setSpinning] = useState(false);
  const [current, setCurrent] = useState("?");
  const [result, setResult] = useState("");

  const spin = () => {
    if (spinning) return;

    setSpinning(true);

    // Select pool
    let pool: string[] = coolKid && availableChosen.length > 0 ? availableChosen : availablePrizes;
    if (pool.length === 0) {
      setSpinning(false);
      return;
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    const winner = pool[randomIndex];

    const spinTime = 2000; // animation duration
    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / spinTime, 1);
      if (progress < 1) {
        const randomPick = pool[Math.floor(Math.random() * pool.length)];
        setCurrent(randomPick);
        requestAnimationFrame(animate);
      } else {
        setCurrent(winner);
        setResult(winner);
        setSpinning(false);

        // Remove winner from appropriate pool
        if (coolKid && availableChosen.includes(winner)) {
          setAvailableChosen(prev => prev.filter(name => name !== winner));
        } else {
          setAvailablePrizes(prev => prev.filter(name => name !== winner));
        }
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-blue-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-black mb-4 text-center">
        Graybox Raffle
      </h1>

      <div className="w-56 h-56 flex items-center justify-center bg-black text-white font-bold text-center text-lg rounded-xl border-4 border-blue-600 shadow-lg">
        {current}
      </div>

      <button
        onClick={spin}
        disabled={spinning || (availablePrizes.length === 0 && availableChosen.length === 0)}
        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
      >
        {spinning
          ? "Spinning..."
          : availablePrizes.length === 0 && availableChosen.length === 0
          ? "No more names!"
          : "SPIN"}
      </button>

      {result && (
        <p className="text-2xl font-semibold mt-4 text-black">
          ⭐ Winner: <span className="text-blue-600">{result}</span>
        </p>
      )}
    </div>
  );
}
