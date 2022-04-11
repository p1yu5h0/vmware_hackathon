import React, {useState} from 'react'

import {AiOutlineClockCircle} from 'react-icons/ai'
import {BsCheck2} from 'react-icons/bs';
import {MdClear} from 'react-icons/md';


const SideBarIcon = ({ icon, text = "tooltip 💡", link }) => {
  return (
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};


const Note = ()=>{
  return (
    <div className='bg-gray-50 p-3 rounded-md text-gray-600'>
      <div className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, ut...</div>
      <div className='mt-1 text-xs flex space-x-5'>
        <div className='flex text-xs items-center space-x-2'>
          <AiOutlineClockCircle/> {" "} <div>20 Jan 2021</div>
        </div>
        <div className='text-red-400 underline cursor-pointer'>Delete</div>
      </div>
    </div>
  )
}

const Notes = () => {
  const [note,setNote] = useState('');
  const handleSubmit = ()=>{
    console.log(note)
  }
  return (
    <div className='text-gray-900'>
    <div className='text-gray-900 font-semibold text-lg'>ADD NOTE</div>
    <div className='bg-gray-800 h-[1px] w-[40%] '></div>
    <div className='flex mt-4 space-x-3'>
    <div className=''>
        <label htmlFor="" className='block text-gray-500'></label>
        <textarea rows="3" cols="47" value={note} onChange={(e)=>setNote(e.target.value)} className='w-full mt-2 p-3 text-sm outline-none rounded-lg shadow-md' placeholder='Write note...'/>
    </div>
    <div className='flex flex-col items-center space-y-2 align-top pt-3'>
      <div onClick={handleSubmit} className='bg-green-500 hover:bg-green-700 transition-all p-1 rounded-lg text-white'>
        <BsCheck2 size={20}/>
      </div>
      <div onClick={()=>setNote('')} className='bg-red-400 hover:bg-red-600 p-1 rounded-lg text-white'>
        <MdClear size={19}/>
      </div>
    </div>
    </div>
    <div className='mt-7 p-3 w-full bg-white rounded-lg'>
      <div className='flex items-center justify-between p-2'> 
      <div className='font-semibold text-gray-600'>All Notes</div>
      <div className='text-sm underline cursor-pointer'>All Notes</div>
      </div>
      <div className=' overflow-y-auto mt-4 h-[200px]  space-y-3'>
        <Note/>
        <Note/>
        <Note/>
      </div>
    </div>
    </div>
  )
}

export default Notes