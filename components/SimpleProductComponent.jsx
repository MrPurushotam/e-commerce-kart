"use client"
import React from 'react'
import ProgressiveImage from 'react-progressive-image';

const SimpleProductComponent = ({product,quantity,currency,increaseQunatity,decreaseQuantity,deleteItem}) => {
    const stockUrl = `https://media.tenor.com/lUIQnRFbpscAAAAi/loading.gif`;
    const currentTotalPrice= quantity * product.price
    return (
        <div className='flex w-full rounded-md items-center px-4 py-3 shadow-lg'>
            <div className="aspect-[3/2] max-w-32 max-h-32 overflow-hidden rounded-lg">
                <ProgressiveImage src={product.image} placeholder={stockUrl}>
                    {(src) => (
                        <img
                            src={src}
                            alt={product.title}
                            className="w-full h-full object-cover object-center"
                            style={{ transition: 'filter 0.3s ease-in-out' }}
                        />
                    )}
                </ProgressiveImage>
            </div>

            <div className='w-full flex flex-col shadow-sm px-1 py-2 '>
                <div className="flex justify-between items-center">
                    <h2 className='text-lg font-semibold '>{product.title}</h2>
                    <h2 className='font-semibold text-lg'>{currency} {product.price}</h2>
                </div>
                <div className="flex justify-between items-center ">
                    <div className='flex items-center space-x-2 p-2'>
                        <button
                            onClick={()=>decreaseQuantity(product.id)}
                            className='px-2 py-1 bg-gray-200 text-gray-800 font-bold rounded'>
                            -
                        </button>
                        <span className='font-semibold'>{quantity}</span>
                        <button
                            onClick={()=>increaseQunatity(product.id)}
                            className='px-2 py-1 bg-gray-200 text-gray-800 font-bold rounded'>
                            +
                        </button>
                        <i className="ph ph-trash text-2xl text-gray=700 hover:text-red-500" onClick={()=>deleteItem(product.id)}></i>
                    </div>
                    <h2 className='text-gray-500 font-bold text-lg'>Total {currency} {currentTotalPrice}</h2>
                </div>
            </div>
        </div>
    )
}

export default SimpleProductComponent
