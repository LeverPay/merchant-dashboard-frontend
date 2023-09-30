import React from 'react'
import { useLocation } from "react-router-dom";
export default function Unpaid_invoice() {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  return (
    <div>Unpaid_invoice</div>
  )
}
