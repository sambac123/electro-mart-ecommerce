import React, { useEffect, useState } from 'react'
import { FaBorderAll } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FaLaptop } from "react-icons/fa";
import { CgLaptop } from "react-icons/cg";
import { FaHeadphones } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import API from "../api/API"
export default function UserDashboard() {
  const [products, setProducts] = useState([]);
   const [selectCategory,setSelectCategory]=useState("All")
   const filterProducts = selectCategory === "All" ? products:products.filter((item)=>item.prod_category === selectCategory)
   useEffect(()=>{
    fetchProducts();
   },[])
   const fetchProducts = async () =>{
    try{
      const res = await  API.get()
      setProducts(res.data)
    }catch(err){
      console.log(err)
    }
   }
  const [currentPage,setCurrentPage]=useState(1);
  const itemPage=8;
  const startIndex= (currentPage - 1)* itemPage;
  const paginatedProduct= filterProducts.slice(startIndex, startIndex + itemPage)
  const totalPages = Math.ceil(filterProducts.length / itemPage)
  
  return (
    <>
    <div className='bg-slate-100 px-10'>
    <div className='flex gap-10 max-w-6xl mx-auto'>
        <div className='flex flex-col items-center cursor-pointer'>
          <FaBorderAll  onClick={()=>{setSelectCategory("All"),  setCurrentPage(1)}} className='hover:bg-sky-500 hover:text-white hover:rounded-full border rounded-full text-6xl p-4'/>
          <span className='py-2'>All</span>
        </div>

        <div className='flex flex-col items-center cursor-pointer'>
          <FaMobileAlt onClick={()=>{setSelectCategory("Mobiles"), setCurrentPage(1)}} className='hover:bg-sky-500 hover:text-white hover:rounded-full border rounded-full text-6xl p-4'/>
          <span className='py-2'>Mobiles</span>
        </div>

         <div className='flex flex-col items-center cursor-pointer'>
          <FaLaptop onClick={()=>{setSelectCategory("Laptop"), setCurrentPage(1)}} className='hover:bg-sky-500 hover:text-white hover:rounded-full border rounded-full text-6xl p-4'/>
          <span className='py-2'>Loptop</span>
        </div>

         <div className='flex flex-col items-center cursor-pointer'>
          <CgLaptop onClick={()=>{setSelectCategory("Appliances"), setCurrentPage(1)}} className='hover:bg-sky-500 hover:text-white hover:rounded-full border rounded-full text-6xl p-4'/>
          <span className='py-2'>Appliances</span>
        </div>

        <div className='flex flex-col items-center cursor-pointer'>
          <IoTime onClick={()=>{setSelectCategory("Watches"), setCurrentPage(1)}} className='hover:bg-sky-500 hover:text-white hover:rounded-full border rounded-full text-6xl p-4'/>
          <span className='py-2'>Watch</span>
        </div>

        <div className='flex flex-col items-center cursor-pointer'>
          <FaHeadphones onClick={()=>{setSelectCategory("Headphones"), setCurrentPage(1)}} className='hover:bg-sky-500 hover:text-white hover:rounded-full border rounded-full text-6xl p-4'/>
          <span className='py-2'>Headphones</span>
        </div>
    </div>
     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10 py-6'>
          {paginatedProduct.map((item,index)=>(
        <div class="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
            <div key={item.prod_id} class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-65">
                <img
                    src={item.image}
                    alt="card-image" class=" w-full h-full transition-transform duration-300 ease-in-out hover:scale-110" />
            </div>
            <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                    <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        {item.prod_name}
                    </p>
                    <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                       ₹ {item.prod_price}
                    </p>
                </div>
                <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                    {item.prod_description}
                </p>
            </div>
            <div class="p-6 pt-0">
                <button
                    class="w-full bg-green-500 hover:bg-blue-500 hover:text-white text-white py-2 rounded transition"
                    type="button">
                    Add to Cart
                </button>
            </div>
        </div>))}
        </div>
        <div className="flex justify-center items-center gap-2 pb-10">

  {/* Prev */}
  <button
    onClick={() => setCurrentPage(prev => prev - 1)}
    disabled={currentPage === 1}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Prev
  </button>

  {/* Page Numbers */}
  {[...Array(totalPages)].map((_, i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      className={`px-3 py-1 rounded border 
        ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"}
      `}
    >
      {i + 1}
    </button>
  ))}

  {/* Next */}
  <button
    onClick={() => setCurrentPage(prev => prev + 1)}
    disabled={currentPage === totalPages}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Next
  </button>

</div>
        </div>
    </>
  )
}
