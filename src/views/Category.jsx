import React, { useEffect, useState } from 'react'
import CategoryMadal from './modals/CategoryModal.jsx'
import { getToken } from '../utils/auth'
import { toast } from 'react-toastify'
import { noData } from '../assets'
import CategoryEdit from './editModals/CategoryEdit'
import DeleteConfirmModal from './modals/DeleteConfirmModal'

function Category() {

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
    deleteCategory(confirmDeleteId)
    closeDeleteModal()
  }

  // Open modal 
  const [open, setOpen] = useState(false)

  const [data, setData] = useState([])


  // get category 
  const getCategory = () => {
    fetch("https://testaoron.limsa.uz/api/category")
      .then(res => res.json())
      .then(item => setData(item?.data)
      )
  }

  useEffect(() => {
    getCategory()
  }, [])


  //delete category
  const deleteCategory = (id) => {

    fetch(`https://testaoron.limsa.uz/api/category/${id}`, {
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
          getCategory()
        } else {
          toast.error("Status-500 HATO")
        }
      })
  }

  //edit
  const [dataID, setDataID] = useState([])
  const [editID, setEditID] = useState("")
  // Edit modal 
  const [editOpen, seteditOpen] = useState(false)

  const getCategoryID = async (id) => {
    const res = await fetch(`https://testaoron.limsa.uz/api/category/${id}`);
    const item = await res.json();
    setDataID(item?.data);
    setEditID(id)
    seteditOpen(true)
  }



  return (
    <>
      <div className='shadow-md p-6 bg-white rounded-lg'>
        <div className='flex  justify-between'>
          <h2 className='font-bold text-xl mb-6'>Category</h2>
          <button
            onClick={() => setOpen(true)}
            className='cursor-pointer text-white py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg mb-4 transition-all duration-150  '>Add Category</button>
        </div>
        <div>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border border-gray-300 p-2'>№</th>
                <th className='border border-gray-300 p-2'>Title ENG</th>
                <th className='border border-gray-300 p-2'>Title RU</th>
                <th className='border border-gray-300 p-2'>Title DE	</th>
                <th className='border border-gray-300 p-2'>Actions</th>
              </tr>
            </thead>
            {data && <tbody>
              {data.map((item, i) => (
                <tr key={i} className='text-center hover:bg-gray-100'>
                  <td className='border border-gray-300 p-2'>{i + 1}</td>
                  <td className='border border-gray-300 p-2'>{item.name_en}</td>
                  <td className='border border-gray-300 p-2'>{item.name_ru}</td>
                  <td className='border border-gray-300 p-2'>{item.name_de}</td>
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

      {open && <CategoryMadal setOpen={setOpen} getCategory={getCategory} />}
      {editOpen && <CategoryEdit editID={editID} dataID={dataID} seteditOpen={seteditOpen} getCategory={getCategory} />}
    </>
  )
}

export default Category