import React, { useEffect, useState } from 'react';
import Input from './components/Input';
import Pendings from './components/Pendings';
const App: React.FC = () => {

  return (
    <>
   <h3 className="text-2xl font-semibold text-white bg-green-600 p-4  shadow-md text-center">
  Today’s Todo -{" "}
  <span className="text-yellow-200">
      {new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}
    </span>
</h3>
        <div className="bg-slate-500 w-full justify-center items-center flex h-80">
        

      <div className="bg-slate-200 p-8 rounded-lg shadow-md"> 
        <h2 className="text-6xl text-center mb-4">Todo</h2>
        <Input />
      </div>
    </div>
    <Pendings />
    </>
  );
};

export default App;