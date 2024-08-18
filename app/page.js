"use client"
import { cartState, productState } from "@/states/state"
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import ProductCard from "@/components/ProductCard"
import Button from "@/components/button";
import Loader from "@/components/Loading";
export default function Home() {
  const [products, setProducts] = useRecoilState(productState)
  const [query, setQuery] = useState("")
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const getCategories = useCallback(async () => {
    try {
      const resp = await fetch("https://fakestoreapi.com/products/categories")
      if (resp.ok) {
        const temp = await resp.json()
        setCategories(temp)
      }
      else {
        console.log("Error occured while fetching")
      }
    } catch (error) {
      console.log(error.message)

    }
  }, [])

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
    setLoading(false)
  }, [query, fetchProductData]);

  return (
    <>
      {loading && <Loader />}
      <div className="text-base font-medium px-3 py-2 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="col-span-1 mb-4 sm:mb-0">
          <div className="grid grid-cols-1 gap-2">
            <div className="bg-gray-100 p-4 rounded-md space-y-2">
              <p className="font-semibold mb-2">Select From categories</p>
              <div className="flex flex-wrap gap-2">
                {categories?.map((c) => (
                  <Button
                    className="font-semibold bg-gray-200 rounded-full border-2 border-gray-600 px-2 py-1"
                    key={c}
                    content={c}
                    onClick={() => setQuery(c)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="col-span-1 sm:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.isArray(products) && products.length > 0 ? (
              products.map((prod) => (
                <ProductCard product={prod} key={prod.id} />
              ))
            ) : (
              <div className="col-span-full">No products available</div>
            )}
          </div>
        </div>
      </div>
    </>);

}
