import React, { useState } from 'react'
import { MdClose } from "react-icons/md";
import { getToken } from '../../utils/auth';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';


function ContactModal({ setOpen, getContact }) {


  const [phone_number, setPhone_number] = useState("");
  const [email, setEmail] = useState("");
  const [address_en, setAddressEn] = useState("");
  const [address_ru, setAddressRu] = useState("");
  const [address_de, setAddressDe] = useState("");

  const addContactItem = (e) => {
    e.preventDefault()

    fetch("https://testaoron.limsa.uz/api/contact", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        "phone_number": phone_number,
        "email": email,
        "address_en": address_en,
        "address_ru": address_ru,
        "address_de": address_de
      })
    })
      .then(res => res.json())
      .then(item => {
        if (item?.success) {
          toast.success(),
            // ma'lumotlarni yangilash 
            getContact()
          // modalni yopish 
          setOpen(false)
        } else {
          toast.error(item?.message?.message[0])
        }
      })

    // formni tozalash 
    setPhone_number("")
    setEmail("")
    setAddressEn("")
    setAddressRu("")
    setAddressDe("")
  }


  return (
    <div onClick={() => setOpen(false)} className='fixed inset-0 bg-black/60 flex  justify-center items-center z-50 overflow-y-auto' >
      <div onClick={(e) => e.stopPropagation()} className='bg-white rounded-lg relative  overflow-y-auto shadow-md p-6 max-h-[90vh] w-[45%]'>
        <button
          onClick={() => setOpen(false)}
          className='absolute top-2 right-2 text-white bg-red-500 px-2 py-2 cursor-pointer rounded-full'><MdClose /></button>
        <h2 className='font-bold text-xl mb-4'>Add Contact</h2>
        <form onSubmit={addContactItem}>
          <label>
            <p className='block mb-1 text-sm font-medium'>Phone Number</p>
            <PhoneInput
              country={'uz'}
              value={phone_number}
              onChange={(value) => {
                if (!value.startsWith('+')) {
                  setPhone_number('+' + value);
                } else {
                  setPhone_number(value);
                }
              }}
              inputClass="!w-full p-2  pl-10 border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
              containerClass="w-full"
              buttonClass="border-r border-gray-300 px-2 bg-white"
              dropdownClass="bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-auto !text-sm"
            />
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Email</p>
            <input
              required
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="email" />
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Address (EN)</p>
            <textarea
              required
              value={address_en}
              onChange={(e) => setAddressEn(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text">
            </textarea>
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Address (RU)</p>
            <textarea
              required
              value={address_ru}
              onChange={(e) => setAddressRu(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text">
            </textarea>
          </label>
          <label>
            <p className='block mb-1 text-sm font-medium'>Address (DE)</p>
            <textarea
              required
              value={address_de}
              onChange={(e) => setAddressDe(e.target.value)}
              className='outline-none w-full p-2 border border-gray-300 rounded mb-1'
              type="text">
            </textarea>
          </label>
          <button className='w-full mt-4 cursor-pointer p-2 bg-green-500 hover:bg-green-600  text-white rounded-lg'>Add Contact</button>
        </form>
      </div>
    </div>
  )
}

export default ContactModal