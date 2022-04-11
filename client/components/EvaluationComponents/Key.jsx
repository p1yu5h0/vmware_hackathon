import React from 'react'

const Key = ({value,icon,title}) => {
    return (
        <div>
          <div className='flex space-x-5'>
            <div className='pt-2'>{icon}</div>
            <div >
              <div className='font-semibold text-gray-200'>{title}</div>
              <div className='mt-1 text-lg'>{value}</div>
            </div>
          </div>
          
        </div>
      )
}

export default Key