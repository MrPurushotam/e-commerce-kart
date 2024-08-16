"use client"
import RecoilContextProvider from "./lib/RecoilContextProvider"

export const Provider=({children})=>{
    return (
        <RecoilContextProvider>
            {children}
        </RecoilContextProvider>
    )
}