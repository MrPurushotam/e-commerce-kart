"use client";
import { useRouter } from "next/navigation"
import Button from "./button"
import { useRecoilState } from "recoil";
import { cartState } from "@/states/state";
import { useEffect, useRef } from "react";

const Navbar = () => {
  const router= useRouter()
  const [cart,setCart]=useRecoilState(cartState)
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      const localStorageCart = window.localStorage.getItem("ekart-cart");
      if (localStorageCart) {
        setCart(JSON.parse(localStorageCart));
      }
      isInitialMount.current = false;
    }
  }, [setCart]);

  useEffect(() => {
    if (!isInitialMount.current) {
      window.localStorage.setItem("ekart-cart", JSON.stringify(cart));
    }
  }, [cart]);
  

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
