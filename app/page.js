"use client"
import { productState } from "@/states/state"
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import ProductCard from "@/components/ProductCard"
import InputBox from "@/components/input";
export default function Home() {
  const fetchData = useRef(true)
  const [products, setProducts] = useRecoilState(productState)
  const [search,setSearch]=useState("")
  async function fetchProductData() {
    try {
      console.log("fetching")
      const resp = await fetch(`https://fakestoreapi.com/products`)
      if (!resp.ok) {
        console.log("Couldn't fetch.")
        return
      }
      const prod = await resp.json();
      fetchData.current = false
      setProducts(prod)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (fetchData.current) {
      fetchProductData()
    }
  }, [])
  return (
    <div className="text-base font-medium px-3 py-2 grid grid-cols-4 gap-4">
      {/* Sidebar */}
      <div className="col-span-1">
        {/* add search bar , categoreis options */}
        <div className="grid grid-rows-3 gap-2">
          <div className="bg-gray-200 p-4 rounded-md">
            <InputBox 
            className={`w-full p-3 rounded-md text-base font-semibold autofocus`} 
            placeholder={"Search Product, Catgeory"} 
            onChange={(e)=>setSearch(e.target.value)}
            

            />
          </div>
          <div className="bg-gray-200 p-4 rounded-md">Sidebar Item 2</div>
          <div className="bg-gray-200 p-4 rounded-md">Sidebar Item 3</div>
        </div>
      </div>
  
      {/* Main Content */}
      <div className="col-span-3 grid grid-cols-3 gap-2">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((prod) => (
            <ProductCard product={prod} key={prod.id} />
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
  
}
