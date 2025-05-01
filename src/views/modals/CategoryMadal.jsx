import React, { useState } from 'react'
import { MdClose } from "react-icons/md";
import { getToken } from '../../utils/auth';
import { toast } from 'react-toastify';

function CategoryMadal({setOpen , getCategory}) {
  
  const [nameEn,setNameEn]= useState("");
  const [nameRu,setNameRu]= useState("");
  const [nameDe,setNameDe]= useState("");

  const addCategoryItem =(e)=>{
    e.preventDefault()

    fetch("https://back.ifly.com.uz/api/category",{
      method:"POST",
      headers:{
        "Content-type":"application/json",
        "Authorization" : `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        "name_en": nameEn,
        "name_de": nameDe,
        "name_ru": nameRu
      })
    })
    .then(res=>res.json())
    .then(item=> {
      if(item?.success){
        toast.success("Category successfully"),
        // ma'lumotlarni yangilash 
        getCategory()
        // modalni yopish 
        setOpen(false)
      }else{
        toast.error("Category failed")
      }
    })

    // formni tozalash 
    setNameEn(""),
    setNameDe(""),
    setNameRu("")   
  }


  return (
    <div onClick={()=>setOpen(false)}   className='fixed inset-0 bg-black/60 flex  justify-center items-center z-50 overflow-y-auto' >
      <div onClick={(e) => e.stopPropagation()} className='bg-white rounded-lg relative  shadow-md p-6 max-h-[90vh] w-[45%]'>
        <button
          onClick={()=>setOpen(false)} 
          className='absolute top-2 right-2 text-white bg-red-500 px-2 py-2 cursor-pointer rounded-full'><MdClose /></button>
        <h2 className='font-bold text-xl mb-4'>Add Category</h2>
        <form onSubmit={addCategoryItem}>
          <label>
            <p className='block mb-1 text-sm font-medium'>Category Name (EN)</p>
            <input
              required
              value={nameEn}
              onChange={(e)=>setNameEn(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1' 
              type="text" />
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Category Name (RU)</p>
            <input
              required
              value={nameRu}
              onChange={(e)=>setNameRu(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1' 
              type="text" />
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Category Name (DE)</p>
            <input
              required
              value={nameDe}
              onChange={(e)=>setNameDe(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1' 
              type="text" />
          </label>
          <button className='w-full mt-4 cursor-pointer p-2 bg-green-500 hover:bg-green-600  text-white rounded-lg'>Add Category</button>
        </form>
      </div>
    </div>
  )
}

export default CategoryMadal