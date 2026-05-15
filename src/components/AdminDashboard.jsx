import React, { useEffect, useState } from 'react'
import { FaBorderAll } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FaLaptop } from "react-icons/fa";
import { CgLaptop } from "react-icons/cg";
import { FaHeadphones } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import API from '../api/API';
export default function AdminDashboard() {
  const [category,setCategory]=useState("");
  const [image,setImage]=useState(null);
  const handleImage = (e)=>{
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onloadend = ()=>{
      setImage(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const [products,setProducts]=useState([])
  const [name,setName] = useState("");
  const [price,setPrice]= useState("")
  const [description, setDescription] = useState("")
  const [currentPage,setCurrentPage] = useState(1)
  const [edit,setEdit]=useState(null);
  const fetchAllProducts = async () =>{
  const resp = await API.get("")
  setProducts(resp.data)
 }
  useEffect(()=>{
    fetchAllProducts();
  },[])

  const fetchByCategory = async (cat) => {
    try{
      console.log("category CLicked : " , cat)
      const respo = await API.get(`/category/${cat}`)
      console.log("API products : ",respo)
      setProducts(respo.data)
      setCurrentPage(1)
    }
    catch(err){
      console.log(err)
    }
  }
  const itemPage=8;
  const startIndex= (currentPage - 1)* itemPage;
  const Products= products.slice(startIndex, startIndex + itemPage)
  const totalPages = Math.ceil(products.length / itemPage)

  const addProduct= async ()=>{
    const newProduct={
     prod_name:name,
     prod_price:price,
     prod_category:category,
     prod_description:description,
     image
    }
    const res = await fetch ("http://localhost:8080/api/products",{
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newProduct)
    })
    const saved = await res.json();
    setProducts(prev => [...prev, saved])

    if(res.ok){
      const saved = await res.json();
      setProducts(prev => [...prev, saved])
      alert("Product added successfully...!!")
    }else{
      alert("Product is not added. Please try again")
    }
  }

  const deleteProduct = async (id)=>{
    await fetch(`http://localhost:8080/api/products/${id}`,{
      method:"DELETE"
    })
    setProducts(products.filter(p =>p.prod_id !== id))
  }
  const updateProduct = async (id) => {
  const updatedData = {
     prod_name:name,
     prod_price:Number(price),
     prodCategory:category,
     prod_description:description,
     image
  };
  const res = await API.put(`/${id}`,updatedData)

  setProducts(prev => prev.map(p => p.prod_id === id ? updated : p));

   setEdit(null);
    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setImage(null);
};
const handleEdit = (item) => {
setEdit(item.prod_id);
  setName(item.prod_name);
  setPrice(item.prod_price);
  setCategory(item.prod_category);
  setDescription(item.prod_description);
  setImage(item.image);
};

  return (
    <>
    <div className='max-w-6xl max-auto bg-white p-12 rounded shadow-xl'>
      <h2 className='text-xl font-bold mb-4'>Add product</h2>
      <div className='grid grid-cols-2 gap-4'>
        <input type='text' placeholder='Title' className='border p-2 rounded w-full' onChange={(e)=>setName(e.target.value)}/>
        <input type='text' placeholder='Price' className='border p-2 rounded w-full'onChange={(e)=>setPrice(e.target.value)}/>
        <select value={category} onChange={(e)=>setCategory(e.target.value)} className='border p-2 rounded w-full'>
          <option value="">Select Category</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Laptop">Laptop</option>
          <option value="Appliances">Appliances</option>
          <option value="Watches">Watches</option>
          <option value="Headphones">Headphones</option>
        </select>
        <label className='border p-2 rounded cursor-pointer bg-gray-100'>
          Upload Image
          <input type='file' className='hidden' onChange={handleImage} />
        </label>
        <textarea placeholder='Description' className='border p-2 col-span-2 rounded' onChange={(e)=>setDescription(e.target.value)}></textarea>
        <button className='border p-2 bg-blue-500 text-white rounded cursor-pointer' onClick={edit ? () =>updateProduct(edit) : addProduct }>{edit ? "update Product" : "Add Product"}</button>
        </div>
    </div>
        <div>
            <div className='flex gap-10 max-w-6xl mx-auto py-6'>
                  <div className='flex flex-col items-center cursor-pointer'>
                    <FaBorderAll  onClick={fetchAllProducts} className='hover:bg-sky-500 hover:text-white hover:rounded-full rounded-full text-6xl p-4 shadow-xl/50'/>
                    <span className='py-2'>All</span>
                  </div>
          
                  <div className='flex flex-col items-center cursor-pointer'>
                    <FaMobileAlt onClick={()=>{fetchByCategory("Mobiles")}} className='hover:bg-sky-500 hover:text-white hover:rounded-full  rounded-full text-6xl p-4 shadow-xl/50'/>
                    <span className='py-2'>Mobiles</span>
                  </div>
          
                   <div className='flex flex-col items-center cursor-pointer'>
                    <FaLaptop onClick={()=>{fetchByCategory("Laptop")}} className='hover:bg-sky-500 hover:text-white hover:rounded-full  rounded-full text-6xl p-4 shadow-xl/50'/>
                    <span className='py-2'>Loptop</span>
                  </div>
          
                   <div className='flex flex-col items-center cursor-pointer'>
                    <CgLaptop onClick={()=>{fetchByCategory("Appliances")}} className='hover:bg-sky-500 hover:text-white hover:rounded-full  rounded-full text-6xl p-4 shadow-xl/50'/>
                    <span className='py-2'>Appliances</span>
                  </div>
          
                  <div className='flex flex-col items-center cursor-pointer'>
                    <IoTime onClick={()=>{fetchByCategory("Watches")}} className='hover:bg-sky-500 hover:text-white hover:rounded-full  rounded-full text-6xl p-4 shadow-xl/50'/>
                    <span className='py-2'>Watch</span>
                  </div>
          
                  <div className='flex flex-col items-center cursor-pointer'>
                    <FaHeadphones onClick={()=>{fetchByCategory("Headphones")}} className='hover:bg-sky-500 hover:text-white hover:rounded-full  rounded-full text-6xl p-4 shadow-xl/50'/>
                    <span className='py-2'>Headphones</span>
                  </div>
              </div>

               <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10 py-6'>
          {Products.map((item,index)=>(
        <div class="relative flex flex-col text-gray-700 bg-white shadow-xl/30 bg-clip-border rounded-xl w-full h-full justify-between">
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
                </div>
                 <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                       ₹ {item.prod_price}
                    </p>
            </div>
            <div class="p-6 pt-0 flex justify-center gap-24">
                <button onClick={()=>handleEdit(item)} className=' text-bold text-white bg-blue-500 p-2 cursor-pointer rounded w-full shadow-xl/30'>Edit</button>
                <button onClick={() => deleteProduct(item.prod_id)} className='cursor-pointer p-2 rounded bg-red-500 w-full text-white shadow-xl/30'>Delete</button>
            </div>
        </div>))}
        </div>
  <div className="flex justify-center items-center gap-2 pb-10 ">

  {/* Prev */}
  <button
    onClick={() => setCurrentPage(prev => prev - 1)}
    disabled={currentPage === 1}
    className="px-3 py-1 rounded disabled:opacity-50 shadow-xl/30"
  >
    Prev
  </button>

  {/* Page Numbers */}
  {[...Array(totalPages)].map((_, i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      className={`px-3 py-1 rounded  shadow-xl/30
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
    className="px-3 py-1 rounded disabled:opacity-50 shadow-xl/30"
  >
    Next
  </button>
</div>
</div>
    </>
  )
}
