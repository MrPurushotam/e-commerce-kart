"use client";

import React, { useState } from 'react';
import Button from "./button";
import ProgressiveImage from "react-progressive-image";
import { useRecoilState } from 'recoil';
import { cartState, currencyList, currencyState } from '@/states/state';

const ProductCard = ({ product }) => {
    const stockUrl = `https://media.tenor.com/lUIQnRFbpscAAAAi/loading.gif`;
    const [cart, setCart] = useRecoilState(cartState)
    const [currency, setCurrency] = useRecoilState(currencyState);
    const [isAdded, setIsAdded] = useState(false);

    const AddToCart = () => {
        // Add to cart functionality here
        const audio = new Audio('/notification.mp3');
        audio.play();

        setCart(prev => {
            const existingProduct = prev.findIndex(item => item.product.id === product.id)
            if (existingProduct !== -1) {
                return prev.map((item, idx) => idx === existingProduct ? { ...item, quantity: item.quantity + 1 } : item)
            } else {
                return [...prev, { product, quantity: 1 }]
            }
        })
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
    };

    return (
        <div className='border-2 border-black p-2 rounded-md space-y-2'>
            <div className="aspect-[3/2] w-full overflow-hidden rounded-lg">
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
            <div className='flex justify-between items-center p-1'>
                <h2 className='text-xl font-semibold truncate flex-1'>{product.title}</h2>
                <div className='flex items-center justify-normal'>
                    <select
                        id="currency-selector"
                        value={currency}
                        onChange={(event) => {
                            setCurrency(event.target.value);
                          }}
                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        {Object.entries(currencyList)?.map(([key,symbol])=>(
                            <option value={symbol} key={key} >{symbol}</option>
                        ))}
                    </select>
                    <h2 className='text-gray-500 font-semibold text-lg ml-2'>${product.price.toFixed(2)}</h2>
                </div>
            </div>
            <p className='text-base h-14 overflow-hidden'>
                {product.description.length > 70
                    ? <>{product.description.substring(0, 70)}<i className="ph ph-dots-three font-bold text-lg"></i></>
                    : product.description}
            </p>
            <div className="w-full">
                <Button
                    className={`bg-yellow-400 text-xl font-semibold  rounded-md py-2 inline-block w-full hover:bg-yellow-500 ${isAdded ? 'tick-animation' : ''}`}
                    content={isAdded
                        ? <>✔ Added</>
                        : <>Add to Cart <i className="ph ph-shopping-cart text-xl ml-2"></i></>}
                    onClick={AddToCart}
                    disabled={isAdded}
                />
            </div>
        </div>
    );
};

export default ProductCard;