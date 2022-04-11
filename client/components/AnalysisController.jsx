import React, { useState } from "react";
import { analysisNavigation } from "../utils";
import Notes from "./controllerComponents/Notes";

import {MdOutlineKeyboardArrowLeft} from 'react-icons/md'
import { motion } from "framer-motion";
import {MdClear}from 'react-icons/md'
import { AnimatePresence } from "framer-motion";
import EvaluationController from "./controllerComponents/EvaluationController";
import FilterController from "./controllerComponents/FilterController";


const variants = {
  hidden: { width: 0, opacity: 0},
  visible: { width: 550, opacity : 1 },
}

const AnalysisController = ({ view, setView, setAnalysis, analysis }) => {

  const Navigation = ()=>{

    return (
      <>
    {Object.values(analysisNavigation).map((nav,idx) => {
      const isSelected = view === nav;
      return (
        <div key={idx}
          onClick={() => setView(nav)}
          className={`${
            isSelected ? "text-[#000000]" : "text-[#8F8F8F]"
          } cursor-pointer font-semibold text-sm`}
        >
          {nav}
        </div>
      );
    })}
    </>
    )
  }
  const [close,setClose] = useState(false);
  return (
    <AnimatePresence initial={false}>
   {!close?<motion.div transition={{type : 'spring',  duration : '1s'}} exit="hidden"  initial="hidden"  animate="visible"  variants={variants} className="h-[600px] w-[550px] shadow-md bg-white rounded-xl p-8 px-10">
     <div className="flex justify-between items-center">
      <div className="flex space-x-5">
        <Navigation/>
      </div>
      <MdClear size={18} onClick={()=>setClose(true)} className="text-black"/>
      </div>
      <div className="mt-6 bg-gray-50 rounded-md p-4">
          {view===analysisNavigation.Notes&&<Notes/>}
          {view===analysisNavigation.Evaluation&&<EvaluationController analysis={analysis} setAnalysis={setAnalysis}/>}
          {view===analysisNavigation.Filters&&<FilterController  analysis={analysis} setAnalysis={setAnalysis}/>}
      </div >
    </motion.div>:<div className="flex items-center "><MdOutlineKeyboardArrowLeft onClick={()=>setClose(false)} size={32} className='animate-bounce'/><div className="h-[600px]  shadow-md bg-white space-y-6 rounded-xl w-[5px]">
      </div></div>}
    </AnimatePresence>
  );
};

export default AnalysisController;
