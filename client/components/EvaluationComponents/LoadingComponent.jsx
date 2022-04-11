import React from 'react'
import { Triangle } from 'react-loader-spinner'

const LoadingComponent = () => {
  return (
    <div className='w-[700px] h-full flex-col flex items-center justify-center'>
          <Triangle
    height="120"
    width="120"
    color='#429FAD'
    ariaLabel='loading'
  />
  <div className='mt-2 text-gray-400 animate-pulse'>Loading...</div>
</div>
  )
}

export default LoadingComponent