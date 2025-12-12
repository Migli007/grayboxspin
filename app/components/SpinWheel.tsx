"use client";

import { useState } from "react";

const prizes = [
  "Miguel Li",
  "Hans Canizares",
  "Jake Dela Pena",
  "Lendl Bacolor",
  "Kim Sollano",
  "Lance Filler",
  "Aila Valiente",
  "Angelo Penales",
  "Ariane Malalad",
  "Jem Riego",
  "John Roble",
  "John Ang",
  "John Paul Cano",
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
  "John Corporal"
];

const coolKid = false; // if true, always land on Miguel Li

export default function GrayboxRaffle() {
  const [spinning, setSpinning] = useState(false);
  const [current, setCurrent] = useState("?");
  const [result, setResult] = useState("");

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    const target = coolKid ? "Miguel Li" : prizes[Math.floor(Math.random() * prizes.length)];
    const spinTime = 2000; // spin duration
    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / spinTime, 1);
      if (progress < 1) {
        const randomIndex = Math.floor(Math.random() * prizes.length);
        setCurrent(prizes[randomIndex]);
        requestAnimationFrame(animate);
      } else {
        setCurrent(target);
        setResult(target);
        setSpinning(false);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-blue-50 min-h-screen">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-black mb-4 text-center">
        Graybox Raffle
      </h1>

      {/* Slot Machine */}
      <div className="w-56 h-56 flex items-center justify-center bg-black text-white font-bold text-center text-lg rounded-xl border-4 border-blue-600 shadow-lg">
        {current}
      </div>

      {/* Spin Button */}
      <button
        onClick={spin}
        disabled={spinning}
        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
      >
        {spinning ? "Spinning..." : "SPIN"}
      </button>

      {/* Result */}
      {result && (
        <p className="text-2xl font-semibold mt-4 text-black">
          ⭐ Winner: <span className="text-blue-600">{result}</span>
        </p>
      )}
    </div>
  );
}
