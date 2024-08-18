"use client"
import React from 'react'

const InputBox = ({type, placeholder,onChange ,className,disabled,isRequired , inputTitle,value,readOnly}) => {
  return (
    <>
        <input type={type} placeholder={placeholder} onChange={onChange } value={value} readOnly={readOnly} className={`${className}`} disabled={disabled} required={isRequired} title={inputTitle} />   
    </>
  )
}

export default InputBox
