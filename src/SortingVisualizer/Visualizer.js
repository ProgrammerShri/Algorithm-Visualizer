import React, { useState, useEffect, useRef } from "react";
import colors from "./colorCodes";
import GithubIcon from "../Icons/GithubIcon";
import { mergeSortAnimation } from "../algorithms/mergesort";
import { insertionSort } from "../algorithms/insertion";
import { selectionSort } from "../algorithms/selectionsort";
import { bubbleSort } from "../algorithms/bubblesort";
import { quicksort } from "../algorithms/quicksort";
import { heapsort } from "../algorithms/heapsort";
// stylesheet
import "./SortingVisualizer.css";
// Sounds
import ResetEffect from "./sounds/ResetEffect.mp3";
import CompletedEffect from "./sounds/CompletedEffect.mp3";

// Random Number Genrator
const generateRandomNumber = (i, j) => {
  return Math.floor(i + Math.random() * (j - i));
};

const Visualizer = () => {
  // state of the array
  const [mainArray, setMainArray] = useState([]);
  const [arrayLength, setArrayLength] = useState(20);
  const [animationSpeed, setAnimationSpeed] = useState(10);
  const [algo, setAlgo] = useState("mergesort");
  const [able, setAble] = useState(true);
//   const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
//   const [interv, setInterv] = useState();
//   const [status, setStatus] = useState(0);
//   // Not started = 0
//   // started = 1
//   // stopped = 2

//   const handleStart = () => {
//     run();
//     setStatus(1);
//     setInterv(setInterval(run, 10));
//   };

//   var updatedMs = time.ms,
//     updatedS = time.s,
//     updatedM = time.m,
//     updatedH = time.h;

//   const run = () => {
//     if (updatedM === 60) {
//       updatedH++;
//       updatedM = 0;
//     }
//     if (updatedS === 60) {
//       updatedM++;
//       updatedS = 0;
//     }
//     if (updatedMs === 100) {
//       updatedS++;
//       updatedMs = 0;
//     }
//     updatedMs++;
//     return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
//   };

//   const handleStop = () => {
//     clearInterval(interv);
//     setStatus(2);
//   };

//   const handleReset = () => {
//     clearInterval(interv);
//     setStatus(0);
//     setTime({ ms: 0, s: 0, m: 0, h: 0 });
//   };

//   const handleResume = () => handleStart();

//   const h = () => {
//     if (time.h === 0) {
//       return "";
//     } else {
//       return <span>{time.h >= 10 ? time.h : "0" + time.h}</span>;
//     }
//   };

  //Render the Array Before DOM loades
  useEffect(() => {
    if (able) populateArray(arrayLength);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayLength, algo]);

  // ABLE / DISABLE BUTTONS ETC.
  useEffect(() => {
    const items = document.getElementsByClassName("able");

    if (!able) {
      for (let i = 0; i < items.length; i++) {
        items[i].style.pointerEvents = "none";
        items[i].disabled = true;
      }
    } else {
      for (let i = 0; i < items.length; i++) {
        items[i].style.pointerEvents = "auto";
        items[i].disabled = false;
      }
    }
  }, [able]);

  let audio = new Audio(ResetEffect); // Play audio when bar reset

  const populateArray = (size) => {
    audio.play(); // play resetEffect here
    // handleReset();
    const tempArr = [];
    for (let i = 0; i < size; i++) {
      const item = {
        idx: i,
        val: generateRandomNumber(25, 500),
      };
      tempArr.push(item);
      if (document.getElementsByClassName("arrayBar")[i] != null) {
        document.getElementsByClassName("arrayBar")[i].style.backgroundColor =
          colors.primaryColor;
      }
    }
    if (able) setMainArray(tempArr);
  };

  let completedAudio = new Audio(CompletedEffect);

  // colors every elements afte sorting
  const colorEveryElement = (arr, counter) => {
    setTimeout(() => {
      completedAudio.play(); // Play audion when bar will sorted
    //   handleStop();
      const sortedArray = [];
      for (let i = 0; i < arr.length; i++) {
        document.getElementsByClassName("arrayBar")[i].style.backgroundColor =
          colors.afterSortingColor;

        sortedArray.push({
          idx: i,
          val: arr[i],
        });
      }
      setMainArray(sortedArray);
      setAble(true);
    }, counter * animationSpeed);
  };

  // BUBBLE SORT
  const bubbleSortAnimate = () => {
    setAble(false);
    const { arr, count } = bubbleSort(mainArray, animationSpeed);
    colorEveryElement(arr, count + 1);
  };

  // MERGE SORT
  const mergeSort = () => {
    setAble(false);
    const { sortedArray, count } = mergeSortAnimation(
      mainArray,
      animationSpeed
    );
    colorEveryElement(sortedArray, count + 5);
  };

  // INSERTION SORT
  const insertionSortAnimate = () => {
    setAble(false);
    const { arr, count } = insertionSort(mainArray, animationSpeed);
    colorEveryElement(arr, count + 1);
  };

  // SELECTION SORT
  const selectionSortAnimate = () => {
    setAble(false);
    const { arr, count } = selectionSort(mainArray, animationSpeed);
    colorEveryElement(arr, count + 2);
  };

  //QUICK SORT
  const quicksortAnimate = () => {
    setAble(false);
    const { arr, count } = quicksort(mainArray, animationSpeed);
    colorEveryElement(arr, count + 1);
  };

  // HEAP SORT
  const heapsortAnimate = () => {
    setAble(false);
    const { arr, count } = heapsort(mainArray, animationSpeed);
    colorEveryElement(arr, count + 1);
  };
  const startSorting = (algo) => {
    // handleStart();
    switch (algo) {
      case "bubblesort":
        bubbleSortAnimate();
        break;

      case "mergesort":
        mergeSort();
        break;

      case "selectionsort":
        selectionSortAnimate();
        break;

      case "insertionsort":
        insertionSortAnimate();
        break;
      case "quicksort":
        quicksortAnimate();
        break;
      case "heapsort":
        heapsortAnimate();
        break;
      default:
        mergeSort();
        break;
    }
  };

  return (
    <div className="container">
      <div className="visualizeContainer">
        {mainArray.map((item) => {
          return (
            <div
              className="arrayBar"
              style={{
                height: `${item.val}px`,
                backgroundColor: colors.primaryColor,
              }}
              key={item.idx}
            >
              {arrayLength < 31 && able && <span>{item.val}</span>}
            </div>
          );
        })}
      </div>
      <div className="sidebar">
        <header>
          Sorting Algorithm <br /> Visualizer
        </header>
        <div className="select-box able">
          <label htmlFor="algo">Select Algorithm</label>
          <label htmlFor="algo"></label>
          {/* <div>
            {h()}&nbsp;&nbsp;
            {time.m >= 10 ? time.m : "0" + time.m} :
            {time.s >= 10 ? time.s : "0" + time.s} :
            {time.ms >= 10 ? time.ms : "0" + time.ms}
          </div> */}

          <select
            name="algo"
            id="select"
            value={algo}
            onChange={(e) => setAlgo(e.target.value)}
            className="slt"
          >
            <option value="bubblesort">Bubble Sort</option>
            <option value="mergesort">Merge Sort</option>
            <option value="insertionsort">Insertion Sort</option>
            <option value="selectionsort">Selection Sort</option>
            <option value="quicksort">Quick Sort</option>
            <option value="heapsort">Heap Sort</option>
          </select>
        </div>
        <button className="button able" onClick={() => startSorting(algo)}>
          Sort
        </button>

        <button
          onClick={() => populateArray(arrayLength)}
          className="new-arr-btn button able"
        >
          Random Bar
        </button>

        <div className="slider-container">
          <label>Length of Array : {arrayLength} </label>
          <input
            className="input-range able"
            type="range"
            value={arrayLength}
            onChange={(e) => setArrayLength(e.target.value)}
            min="7"
            max="150"
          />
        </div>
        <div className="slider-container">
          <label>Speed : {500 - animationSpeed}</label>
          <input
            className="input-range able"
            type="range"
            value={500 - animationSpeed}
            onChange={(e) => setAnimationSpeed(500 - e.target.value)}
            min="350"
            max="499"
          />
        </div>

        <GithubIcon className={"github-icon"} />
      </div>
    </div>
  );
};

export default Visualizer;
