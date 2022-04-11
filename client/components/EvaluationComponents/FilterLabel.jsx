import React from 'react'
import {MdClear} from 'react-icons/md'
const FilterLabel = ({title}) => {
    return (
        <div className='flex items-center hover:bg-[#045663] transition-all cursor-pointer space-x-4 rounded-md bg-primary px-2 py-1'>
          <div className='text-sm'>{title}</div>
          <div><MdClear/></div>
        </div>
      )
}

export default FilterLabel