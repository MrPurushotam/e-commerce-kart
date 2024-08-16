"use client"
import React from 'react'

const InputBox = ({type, placeholder,onChange,onClick ,className,disabled,isRequired}) => {
  return (
    <>
        <input type={type} placeholder={placeholder} onChange={onChange } onClick={onClick} className={`${className}`} disabled={disabled} required={isRequired} />   
    </>
  )
}

export default InputBox
