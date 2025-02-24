//import React, { useState } from "react";
import { Dispatch } from "react";
import { SuperScores } from "../SuperApp";

  type countKeys = keyof SuperScores;

  function HumanButton({
    // Declare a state variable to keep track of the count
    handleCount,
    successKey,
    failKey,
    count,
  
  
  }:{
    handleCount: (key: countKeys) => void;
    successKey: countKeys;
    failKey: countKeys;
    count: SuperScores;
    className?:string;
  }){
   return (
    <>
    <p 
    className={'mt-8 text-white text-2xl'}>
    Successes
    </p>
    
      <button
        // className="mt-10 p-10 mx-4 bg-green-500 text-white Ftext-2xl rounded"
        onClick={() => handleCount(successKey)}
        className='mt-10 mb-5 p-10 mx-4 bg-green-500 text-white text-2xl rounded' 

        id='one'>
          <p>
            {count[successKey]}
          </p>
     </button>
 

<br/>
     <p
    
     className={'mt-8 text-white text-2xl'}>
      <div/>
     Fails</p>
     <button
        className='mt-10 mb-5 p-10 mx-4 bg-red-500 text-white text-2xl rounded' 
        onClick={() => handleCount(failKey)}
        id='one'>
          <p>
            {count[failKey]}
          </p>
     </button>
     
    </>
   ); 
  };

function HumanCounter({
    count, 
    className,
    setCount,
     
  }:{
    
    count: SuperScores;
    className?:string;
    setCount:Dispatch<SuperScores>;
    
  }){

    const handleCount = (key: countKeys) => {
      // get current human count 
      const grabCount = {...count};
      grabCount[key] = (grabCount[key] || 0) + 1;
      setCount(grabCount);
      // add 1 to specific 

  };

return(
    <>
      <HumanButton
        handleCount={handleCount}
        successKey='Success'
        failKey='Failed'
        count={count}
        className={className}
      />
    </>
  );


};

export default HumanCounter;

//mt-10 p-10 mx-4 bg-red-500 text-white text-2xl rounded