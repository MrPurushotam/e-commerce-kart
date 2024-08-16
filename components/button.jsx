"use client"
import { cartState } from "@/states/state"
import { useRecoilValue } from "recoil"

const Button = ({content, onClick , className ,disabled ,isCartButton ,parentDivClassname}) => {
  const cart=useRecoilValue(cartState)
  return (
    <div className={`${parentDivClassname}`}>
        <button onClick={onClick} className={`relative ${className} `} disabled={disabled} >
          {content}
          {isCartButton &&cart.length>0 && <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-0 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ">{cart.length}</span>}
        </button> 
    </div>
  )
}

export default Button
