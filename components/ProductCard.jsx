"use client";
import LazyImage from 'lazy-react-blur'
import React, { useState } from 'react';
import Button from "./button";
import { useRecoilState } from 'recoil';
import { cartState, currencyList, currencyState } from '@/states/state';

const ProductCard = ({ product }) => {
    const stockUrl = `https://media.tenor.com/lUIQnRFbpscAAAAi/loading.gif`;
    const [cart, setCart] = useRecoilState(cartState);
    const [currency, setCurrency] = useRecoilState(currencyState);
    const [isAdded, setIsAdded] = useState(false);

    const AddToCart = () => {
        const audio = new Audio('/notification.mp3');
        audio.play();
        setCart(prev => {
            const existingProduct = prev.findIndex(item => item.product.id === product.id);
            if (existingProduct !== -1) {
                return prev.map((item, idx) => idx === existingProduct ? { ...item, quantity: item.quantity + 1 } : item);
            } else {
                return [...prev, { product, quantity: 1 }];
            }
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500);
    };

    return (
        <div className='border-2 border-black p-2 rounded-md space-y-2 flex flex-col h-full'>
            <div className="aspect-[3/2] w-full overflow-hidden rounded-lg">
                <LazyImage
                    placeholder={stockUrl}
                    uri={product.image}
                    render={(src) =>
                        <img
                            src={src}
                            alt={product.title}
                            className="w-full h-full object-cover object-center"
                            style={{ transition: 'filter 0.3s ease-in-out' }}
                        />
                    }
                />
            </div>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center p-1 flex-grow'>
                <h2 className='text-xl font-semibold truncate w-full sm:w-auto mb-2 sm:mb-0'>{product.title}</h2>
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-normal w-full sm:w-auto'>
                    <select
                        id="currency-selector"
                        value={currency}
                        onChange={(event) => {
                            setCurrency(event.target.value);
                        }}
                        className="mt-1 block w-full sm:w-auto bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm mb-2 sm:mb-0 sm:mr-2"
                    >
                        {Object.entries(currencyList)?.map(([key,symbol]) => (
                            <option value={symbol} key={key}>{symbol}</option>
                        ))}
                    </select>
                    <h2 className='text-gray-500 font-semibold text-lg'>{currency}{product.price.toFixed(2)}</h2>
                </div>
            </div>
            <p className='text-base h-14 overflow-hidden flex-grow'>
                {product.description.length > 70
                    ? <>{product.description.substring(0, 70)}<i className="ph ph-dots-three font-bold text-lg"></i></>
                    : product.description}
            </p>
            <div className="w-full mt-auto">
                <Button
                    className={`bg-yellow-400 text-xl font-semibold rounded-md py-2 inline-block w-full hover:bg-yellow-500 ${isAdded ? 'tick-animation' : ''}`}
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