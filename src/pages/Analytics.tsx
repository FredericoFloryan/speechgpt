import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

import { Pie } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, ArcElement, Filler, Tooltip, Legend);

const analytics = () => {
  const score = 75;
  const radar_data = {
    labels: ['Grammar', 'Fluency', 'Pronounciation', 'Intonation', 'General Context'],

    datasets: [
      {
        label: 'Your Performance',
        data: [65, 59, 90, 81, 40],
        fill: true,
        backgroundColor: 'rgb(147, 51, 234, 0.2)',
        borderColor: 'rgb(147, 51, 234)',
        pointBackgroundColor: 'rgb(147, 51, 234)',
        pointBorderColor: 'rgb(147, 51, 234)',
        pointHoverBackgroundColor: 'rgb(147, 51, 234)',
        pointHoverBorderColor: 'rgb(147, 51, 234)',
      },
      {
        label: "Others' Performance",
        data: [28, 48, 40, 19, 96],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)',
      },
    ],
  };
  const pie_data = {
    labels: ['Red', 'Blue'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 1],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-2 items-center bg-slate-100 min-h-full">
      <span className="mb-1 font-bold ml-2 decoration-purple-500 animate-text text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-7xl">
        Scores
      </span>

      <div className="w-1/3 flex flex-row mx-auto">
        <Radar data={radar_data} />
      </div>

      <div className="w-1/2">
        <span className="self-start text-sm font-medium">Predicted Grade</span>
        <div className="bg-slate-200 rounded-full dark:bg-gray-700">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
            style={{ width: `${score}%` }}
          >
            {score}%
          </div>
        </div>
      </div>
      
      <div>
        
      </div>
      <Disclosure>
        <Disclosure.Button className="py-2 bg-white rounded-xl w-1/2 text-2xl font-semibold mt-5 text-black hover:bg-slate-200 focus:outline-none focus-visible:ring ">
          Grammar
        </Disclosure.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Disclosure.Panel className="text-gray-500 mx-auto text-center w-1/2">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum."
            <div className="w-1/2 mx-auto">
              <Pie data={pie_data} />
            </div>
          </Disclosure.Panel>
        </Transition>
      </Disclosure>
      <Disclosure>
        <Disclosure.Button className="py-2 bg-white rounded-xl w-1/2 text-2xl font-semibold mt-5 text-black hover:bg-slate-200 focus:outline-none focus-visible:ring ">
          Fluency
        </Disclosure.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Disclosure.Panel className="text-gray-500 mx-auto text-center w-1/2">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum."
            <div className="w-1/2 mx-auto">
              <Pie data={pie_data} />
            </div>
          </Disclosure.Panel>
        </Transition>
      </Disclosure>
      <Disclosure>
        <Disclosure.Button className="py-2 bg-white rounded-xl w-1/2 text-2xl font-semibold mt-5 text-black hover:bg-slate-200 focus:outline-none focus-visible:ring ">
          Pronounciation
        </Disclosure.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Disclosure.Panel className="text-gray-500  mx-auto text-center w-1/2">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum."
            <div className="w-1/2 mx-auto">
              <Pie data={pie_data} />
            </div>
          </Disclosure.Panel>
        </Transition>
      </Disclosure>
    </div>
  );
};

export default analytics;
