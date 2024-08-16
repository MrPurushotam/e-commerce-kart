"use client"
import React from 'react'

const SimpleProductComponent = () => {
  return (
    <div className='flex w-full rounded-md border-2 border-black items-center'>
        <div className='w-30 h-30'>
            Progressiveimage
        </div>
        <div className='w-full flex flex-col gap-1'>
            <div className="flex justify-between items-center">
                <h2 className='text-lg font-semibold '>TItle</h2>
                <h2 className='font-semibold text-lg'>Price</h2>
            </div>
            <div>
                {/* + qut - */}
                <h2 className='text-gray-500 font-bold '>Sub total</h2>
            </div>
            {/* title , price  */}
            {/*  add , dec, total  */}
        </div>
    </div>
  )
}

export default SimpleProductComponent
