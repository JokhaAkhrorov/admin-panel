import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getToken } from '../utils/auth'
import DiscountModal from './modals/DiscountModal'
import { noData } from '../assets'
import DiscountEdit from './editModals/DiscountEdit'
import DeleteConfirmModal from './modals/DeleteConfirmModal'

function Discount() {

  // Yeni state'ler
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  // Modalı aç
  const openDeleteModal = (id) => {
    setConfirmDeleteId(id)
  }

  // Modalı kapat
  const closeDeleteModal = () => {
    setConfirmDeleteId(null)
  }

  // Silmeyi onayla
  const confirmDelete = () => {
    deleteDiscount(confirmDeleteId)
    closeDeleteModal()
  }

  // Open modal 
  const [open, setOpen] = useState(false)

  const [data, setData] = useState([])

  // get Discount 
  const getDiscounts = () => {
    fetch("https://testaoron.limsa.uz/api/discount")
      .then(res => res.json())
      .then(item => setData(item?.data))
  }

  useEffect(() => {
    getDiscounts()
  }, [])

  // delete Discount
  const deleteDiscount = (id) => {
    fetch(`https://testaoron.limsa.uz/api/discount/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(item => {
        if (item?.success) {
          // toast.success(item?.data?.message)
          toast.success("Silme işlemi başarılı")
          getDiscounts()
        } else {
          toast.error("Status-500 HATO")
        }
      })
  }



  const [dataID, setDataID] = useState([])
  const [editID, setEditID] = useState("")
  // Edit modal 
  const [editOpen, seteditOpen] = useState(false)
  const getCategoryID = async (id) => {
    const res = await fetch(`https://testaoron.limsa.uz/api/discount/${id}`);
    const item = await res.json();
    setDataID(item?.data);
    setEditID(id)
    seteditOpen(true)
  }

  return (
    <>
      <div className='shadow-md p-6 bg-white rounded-lg'>
        <div className='flex  justify-between'>
          <h2 className='font-bold text-xl mb-6'>Discounts</h2>
          <button
            onClick={() => setOpen(true)}
            className='cursor-pointer text-white py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg mb-4 transition-all duration-150  '>Add Discount</button>
        </div>
        <div>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border border-gray-300 p-2'>№</th>
                <th className='border border-gray-300 p-2'>Discount (%)</th>
                <th className='border border-gray-300 p-2'>Created Date</th>
                <th className='border border-gray-300 p-2'>Finished Date</th>
                <th className='border border-gray-300 p-2'>Status</th>
                <th className='border border-gray-300 p-2'>Actions</th>
              </tr>
            </thead>
            {data && <tbody >
              {data.map((item, i) => (
                <tr key={i} className='text-center hover:bg-gray-100'>
                  <td className='border border-gray-300 p-2'>{i + 1}</td>
                  <td className='border border-gray-300 p-2'>{item.discount}%</td>
                  <td className='border border-gray-300 p-2'>{item.started_at}</td>
                  <td className='border border-gray-300 p-2'>{item.finished_at}</td>
                  <td className={`border border-gray-300 p-2 ${item.status ? "text-green-600" : "text-red-600"}  `}>{item.status ? "Active" : "Inactive"}</td>
                  <td className='border border-gray-300 p-2 w-[200px]'>
                    <button
                      onClick={() => getCategoryID(item.id)}
                      className='px-4 py-2 mr-2 cursor-pointer bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition'>Edit</button>
                    <button
                      onClick={() => openDeleteModal(item.id)}
                      className='px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>}
          </table>
          {data.length === 0 ? <div className='text-center py-6'>
            <img src={noData} alt="nodata" className='mx-auto w-20' />
            <p className="text-gray-500 mt-2">No Data Available</p>
          </div> : <span></span>}
        </div>
      </div>

      {/* Silme Onay Modalı */}
      {confirmDeleteId && (
        <DeleteConfirmModal
          onCancel={closeDeleteModal}
          onDelete={confirmDelete}
        />
      )}


      {open && <DiscountModal setOpen={setOpen} getDiscounts={getDiscounts} />}
      {editOpen && <DiscountEdit dataID={dataID} editID={editID} seteditOpen={seteditOpen} getDiscounts={getDiscounts} />}
    </>
  )
}

export default Discount