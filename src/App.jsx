import { useState } from "react";
import Cell from "./components/cell";
import { AnimatePresence } from "framer-motion";

function App() {
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(2);
  const [steps, setSteps] = useState(0);
  const [type, setType] = useState("");
  const [cells, setCells] = useState([]);

  const cellsHTML = [];

  for (let i = 0; i < height; i++) {
    let top = 55 * i;
    for (let j = 0; j < width; j++) {
      let left = 55 * j;
      cellsHTML.push(<Cell top={top} left={left} key={`${i}-${j}`} />);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default action (like form submission)
      setCells((state) => {
        const newStates = state;
        newStates.push(type);
        return newStates;
      });
      setType("");
    }
  };
  return (
    <main className="w-full h-screen flex gap-x-20 bg-green-50">
      <div className="w-1/5 bg-green-300 h-full p-5 shadow-md shadow-black">
        <form className="relative h-full flex flex-col">
          <div
            style={{ left: `${steps == 0 ? 0 : -500}px` }}
            className=" absolute w-full flex flex-col transition-all duration-300"
          >
            <label htmlFor="height" className="mb-5 font-bold">
              Rows
            </label>
            <input
              type="number"
              id="height"
              className="p-3 outline-none bg-gray-100 rounded-lg mb-10"
              value={height}
              onChange={(e) =>
                setHeight(
                  e.target.value < 2
                    ? 2
                    : e.target.value > 10
                    ? 10
                    : e.target.value
                )
              }
            />
            <label htmlFor="width" className="mb-5 font-bold">
              Columns
            </label>
            <input
              type="number"
              id="width"
              className="p-3 outline-none bg-gray-100 rounded-lg mb-10"
              value={width}
              onChange={(e) =>
                setWidth(
                  e.target.value < 2
                    ? 2
                    : e.target.value > 10
                    ? 10
                    : e.target.value
                )
              }
            />
          </div>
          <div
            style={{ left: `${steps == 1 ? 0 : -500}px` }}
            className="absolute w-full flex flex-col transition-all duration-300"
          >
            <label htmlFor="width" className="mb-5 font-bold">
              Columns
            </label>
            <input
              type="text"
              id="width"
              className="p-3 outline-none bg-gray-100 rounded-lg mb-10"
              onKeyDown={handleKeyDown}
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>

          <div className="flex justify-end absolute bottom-5 w-full">
            <button
              onClick={() => setSteps((state) => state + 1)}
              type="button"
              className="p-3 bg-blue-400 hover:bg-blue-800 cursor-pointer text-white rounded-lg transition-all duration-300"
            >
              Next
            </button>
          </div>
        </form>
      </div>
      <div className={" relative w-4/5 h-full"}>
        <div className="relative">{cellsHTML}</div>
      </div>
    </main>
  );
}

export default App;
