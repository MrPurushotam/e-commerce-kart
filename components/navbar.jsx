"use client";
import { useRouter } from "next/navigation"
import Button from "./button"
import { useRecoilState } from "recoil";
import { cartState, currencyState } from "@/states/state";
import { useEffect, useRef } from "react";

const Navbar = () => {
  const router= useRouter()
  const [cart,setCart]=useRecoilState(cartState)
  const [currency,setCurrency]=useRecoilState(currencyState)
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      const localStorageCart = window.localStorage.getItem("ekart-cart");
      const currency=window.localStorage.getItem("ekart-currency");
      if (localStorageCart) {
        setCart(JSON.parse(localStorageCart));
      }
      if(currency){
        setCurrency(JSON.parse(currency))
      }
      isInitialMount.current = false;
    }
  }, [setCart]);

  useEffect(() => {
    if (!isInitialMount.current) {
      window.localStorage.setItem("ekart-cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (!isInitialMount.current) {
      window.localStorage.setItem("ekart-currency", JSON.stringify(currency));
    }
  }, [currency]);
  

  return (
    <div className={`flex justify-between items-center px-2 py-4 bg-black w-full`}>
        <div>
            <h2 className="text-2xl font-bold text-white cursor-default" onClick={()=>router.push("/")}>E-Kart</h2>
        </div>
        <div >
            <Button parentDivClassname={"relative inline-block"} content={<i className="ph ph-shopping-cart text-2xl"></i>} className={"text-xl font-bold text-white px-2 py-1  rounded-md"} onClick={()=>router.push("/cart")} isCartButton={true}  />
        </div>
    </div>
  )
}

export default Navbar
