import React from 'react'
import { Triangle } from  'react-loader-spinner'
import { motion } from 'framer-motion'
const Loading = ({text}) => {
  return (
    <motion.div exit={{opacity : 0}} animate= {{opacity : 1}} initial={{opacity : 0}} className=' h-[88vh] w-full flex-col space-y-4 flex items-center justify-center'>
        <Triangle
    height="120"
    width="120"
    color='#429FAD'
    ariaLabel='loading'
  />
  <div className='text-gray-500 '>{text || 'Cooking Your Data....'}</div>
    </motion.div>
  )
}

export default Loading

