
import React from 'react'

const SimpleCostComponenet = ({price=0 , quantity=1 , title="Product" , total=201,currency='$'}) => {
  return (
    <div className='w-full flex flex-col'>
        <div className='flex justify-between items-center'>
            <h3>{title}</h3>
            <h3>{currency} {price}</h3>
        </div>
        <div className='flex justify-between items-center text-semibold text-gray-500'>
            <h3>{quantity+ " X "+ price}</h3>
            <h3>+ {currency} {total}</h3>
        </div>
    </div>
  )
}

export default SimpleCostComponenet
