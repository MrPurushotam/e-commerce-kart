"use client"
import { cartState, productState } from "@/states/state"
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import ProductCard from "@/components/ProductCard"
import Button from "@/components/button";
export default function Home() {
  const [products, setProducts] = useRecoilState(productState)
  const [query,setQuery]=useState("")
  const [categories,setCategories]=useState([])
  
  const getCategories=useCallback(async()=>{
    try {
      const resp=await fetch("https://fakestoreapi.com/products/categories")
      if(resp.ok){
        const temp=await resp.json()
        setCategories(temp)
      }
      else{
        console.log("Error occured while fetching")
      }
    } catch (error) {
      console.log(error.message)
      
    }
  },[])

  const fetchProductData = useCallback(async (queryParam = "") => {
    try {
      console.log("fetching products");
      let url = "https://fakestoreapi.com/products/";
      if (queryParam) {
        url += `category/${queryParam}`;
      }
      const resp = await fetch(url);
      if (!resp.ok) {
        console.log("Couldn't fetch products.");
        return;
      }
      const prod = await resp.json();
      setProducts(prod);
    } catch (error) {
      console.log(error.message);
    }
  }, [setProducts]);

  useEffect(() => {
    getCategories();
    fetchProductData(query);
  }, [query, fetchProductData]); 
  
  return (
    <div className="text-base font-medium px-3 py-2 grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <div className="grid grid-rows-3 gap-2">
          <div className="bg-gray-100 p-4 rounded-md space-x-1 space-y-1">
            Select From categories
            {categories?.map((c)=>(
              <Button className={`font-semibold bg-gray-200 rounded-full border-2 border-gray-600 px-2 py-1 inline-block`} key={c} content={c} onClick={()=>setQuery(c)} />
            ))

            }
          </div>
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
