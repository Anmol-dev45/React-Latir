import React from 'react';

const Restart = ({ handleRestart }) => {
  return (
    <div className="flex flex-col justify-between py-8 px-2 absolute inset-0 z-20  mx-auto w-full h-full  bg-slate-800 font-mono  ">
      <p className='text-center text-white text-xl'>You are a looser ! I will give you  a chance</p>
      <button
        className="bg-violet-500 text-white py-4 rounded font-bold text-lg " 
        onClick={handleRestart}
      >
        Restart
      </button>
    </div>
  );
};

export default Restart;
