"use client"
import Button from '@/components/button';
import InputBox from '@/components/input';
import SimpleCostComponenet from '@/components/SimpleCostComponenet';
import SimpleProductComponent from '@/components/SimpleProductComponent';
import { cartState, currencyState } from '@/states/state';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

const CartPage = () => {
  let total = 0;
  const [currency,setCurrency]=useRecoilState(currencyState)
  const [cart, setCart] = useRecoilState(cartState)
  const [discountCode, setDiscountCode] = useState("");
  const [discountApproved, setDiscountApproved] = useState(false);
  const discountValue = useRef(0);

  useEffect(() => {
    const applyDiscount = () => {
      if (discountCode.toUpperCase() === "XXXXXX") {
        discountValue.current = total * 0.10; // 10% discount
        setDiscountApproved(true);
      } else {
        discountValue.current = 0;
        setDiscountApproved(false);
      }
    };

    applyDiscount();
  }, [discountCode]);

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
    ? { ...item, quantity: item.quantity + 1 }
    : item
  )
);
};

const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeProduct = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  
  return (
    <div className='w-full p-2'>
  <h2 className='text-2xl font-bold my-2 text-center'>Your Cart</h2>
  <div className='border-2 border-black rounded-md w-full mx-auto grid grid-cols-1 sm:grid-cols-[2fr_1fr] h-auto sm:h-[80vh] overflow-hidden'>
    <div className='h-full w-full p-2 space-y-2 overflow-auto max-h-[50vh] sm:max-h-full'>
      {cart.length < 1 && <span className='text-center mx-auto block font-semibold'>Your cart is empty</span>}
      {cart?.map((item) => (
        <SimpleProductComponent 
          key={item.product.id} 
          product={item.product} 
          quantity={item.quantity} 
          currency={currency} 
          decreaseQuantity={decreaseQuantity} 
          increaseQunatity={increaseQuantity} 
          deleteItem={removeProduct} 
        />
      ))}
    </div>
    <div className='w-full h-full bg-yellow-400 p-2 rounded-md space-y-3 mt-4 sm:mt-0'>
      <h2 className='text-center text-2xl font-bold'>Subtotal</h2>
      <div className='overflow-auto h-[200px] sm:h-[55%]'>
        {cart.length < 1 && <span className='text-center mx-auto block font-semibold'>Your cart is empty</span>}
        {cart?.map((item) => {
          const currentTotalPrice = item.product.price * item.quantity;
          total += currentTotalPrice;
          return (
            <SimpleCostComponenet 
              key={item.product.id} 
              price={item.product.price} 
              quantity={item.quantity} 
              title={item.product.title} 
              total={currentTotalPrice} 
              currency={currency} 
            />
          );
        })}
      </div>
      <hr className='bg-black p-[0.1vh] my-1' />
      <div>
        <div>
          <div className='flex justify-between font-bold'>
            <h3>Total(in {currency})</h3>
            <h3>{total}</h3>
          </div>
          <div className='flex justify-between font-bold items-center'>
            <h3>Discount(in {currency})</h3>
            <h3>- {discountValue.current.toFixed(2)}</h3>
          </div>
        </div>
        <div>
          <hr className='bg-black p-[0.1vh] my-1' />
          <div>
            <div className='flex justify-between font-bold'>
              <h3>Final Amount(in {currency})</h3>
              <h3>{(total - discountValue.current).toFixed(2)}</h3>
            </div>
          </div>
        </div>
        <div className='font-bold flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2'>
          <span className='mb-2 sm:mb-0'>DISCOUNT CODE</span>
          <div className='flex items-center w-full sm:w-2/3'>
            <InputBox
              onChange={(e) => {
                if (e.target.value.length <= 6) {
                  setDiscountCode(e.target.value);
                }
              }}
              value={discountCode}
              className="w-full p-1 text-semibold uppercase bg-gray-200 text-black rounded-md border-2 border-gray-500"
              inputTitle="Apply Discount Code to get sexy discounts!"
              placeholder="Coupon"
            />
            {discountApproved && <span className='ml-2'>✔️</span>}
          </div>
        </div>
        <Button 
          className="w-full py-2 border-2 border-black rounded-md bg-gray-100 hover:bg-gray-200 font-bold text-lg my-2" 
          content="Checkout" 
        />
      </div>
    </div>
  </div>
</div>
  );
}

export default CartPage;
