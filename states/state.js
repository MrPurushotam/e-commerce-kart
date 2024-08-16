import { atom } from "recoil";

export const currencyList = {
    rupee: "₹",
    dollar: "$",
    pound: "£",
    euro: "€",
};
export const cartState=atom({
    key:"cart",
    default:[]
})

export const productState=atom({
    key:"products",
    default:[]
})

export const currencyState=atom({
    key:"currency",
    default:currencyList.dollar
})