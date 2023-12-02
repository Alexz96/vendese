"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col w-full h-screen bg-slate-300 rounded-lg justify-around items-center">
      <div className="flex flex-row">
        <h1>This is the home page inside folder home</h1>
      </div>
      <div className="flex flex-row">
        <button
          className="p-3 bg-blue-300 text-white rounded-md my-6"
          onClick={() => setCount(count + 1)}
        >
          Add
        </button>
      </div>
      <div className="flex flex-row">
        <h2>{`Clicked the button this ${count} times`}</h2>
      </div>
    </div>
  );
}
