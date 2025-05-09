import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getToken } from '../utils/auth'
import ProductsModal from "./modals/ProductsModal"
import { noData } from '../assets'
import DeleteConfirmModal from './modals/DeleteConfirmModal'

function Products() {

  // Resim modalını aç
  const openImageModal = (image) => {
    setSelectedImage(`https://testaoron.limsa.uz/${image}`)
    setImageModalOpen(true)
  }

  // Resim modalını kapat
  const closeImageModal = () => {
    setImageModalOpen(false)
    setSelectedImage(null) // Resim modalı kapatıldığında resmi sıfırla
  }

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
    deleteProduccts(confirmDeleteId)
    closeDeleteModal()
  }

  // Open modal 
  // Modal durumları
  const [open, setOpen] = useState(false) // open modal
  const [imageModalOpen, setImageModalOpen] = useState(false) // image modal 
  const [selectedImage, setSelectedImage] = useState(null) // selected image

  const [data, setData] = useState([])

  const getProducts = async () => {
    const res = await fetch("https://testaoron.limsa.uz/api/product?page=1&limit=10&min_sell=1")
    const item = await res.json()
    setData(item?.data?.products);
    console.log(item?.data?.products);
  }

  useEffect(() => {
    getProducts()
  }, [])



  const deleteProduccts = async (id) => {
    const res = await fetch(`https://testaoron.limsa.uz/api/product/${id}`, {
      method: "Delete",
      headers: { "Authorization": `Bearer ${getToken()}` }
    })
    const item = await res.json();
    if (item?.success) {
      // toast.success("Product delete success")
      toast.success("Silme işlemi başarılı")
      getProducts()
    } else {
      toast.error("Product delete error")
    }
  }


  // edit 
  const [editData, setEditData] = useState()


  return (
    <>
      <div className='shadow-md p-6 bg-white rounded-lg'>
        <div className='flex  justify-between'>
          <h2 className='font-bold text-xl mb-6'>Products</h2>
          <button onClick={() => {
            setOpen(true)
            setEditData(null)
          }} className='cursor-pointer text-white py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg mb-4 transition-all duration-150  '>Add Product</button>
        </div>
        <div>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border border-gray-300 p-2'>№</th>
                <th className='border border-gray-300 p-2'>Images</th>
                <th className='border border-gray-300 p-2'>Title</th>
                <th className='border border-gray-300 p-2'>Description</th>
                <th className='border border-gray-300 p-2'>Price</th>
                <th className='border border-gray-300 p-2'>Category</th>
                <th className='border border-gray-300 p-2'>Colors</th>
                <th className='border border-gray-300 p-2'>Sizes</th>
                <th className='border border-gray-300 p-2'>Discount</th>
                <th className='border border-gray-300 p-2'>Materials</th>
                <th className='border border-gray-300 p-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={item.id} className='text-center hover:bg-gray-100'>
                  <td className='border border-gray-300 p-2'>{i + 1}</td>
                  <td className='border border-gray-300 p-2 cursor-pointer w-[150px] h-[100px]'
                    onClick={() => openImageModal(item?.images?.[0])} // Resme tıklanınca modal aç
                  >
                    <img
                      src={`https://testaoron.limsa.uz/${item?.images?.[0]}`}
                      className='w-full h-full rounded-sm'
                      alt="img"
                    />
                  </td>
                  <td className='border border-gray-300 p-2'>{item?.title_en}</td>
                  <td className='border border-gray-300 p-2'>{item?.description_en}</td>
                  <td className='border border-gray-300 p-2'>{item?.price}</td>
                  <td className='border border-gray-300 p-2'>{item?.category?.name_en}</td>
                  <td className='border border-gray-300 p-2'>{item?.colors?.[0]?.color_en}</td>
                  <td className='border border-gray-300 p-2'>{item?.sizes?.[0]?.size}</td>
                  <td className='border border-gray-300 p-2'>{item?.discount?.discount}</td>
                  <td className='border border-gray-300 p-2'>{Object.keys(item.materials)[0]}                </td>
                  <td className='border border-gray-300 p-2'>
                    <button
                      onClick={() => {
                        setOpen(true)
                        setEditData(item)
                      }}
                      className='px-4 py-2 mr-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition cursor-pointer'>Edit</button>
                    <button
                      onClick={() => openDeleteModal(item.id)}
                      className='px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
              }
            </tbody>
          </table>
          {data.length === 0 ? <div className='text-center py-6'>
            <img src={noData} alt="nodata" className='mx-auto w-20' />
            <p className="text-gray-500 mt-2">No Data Available</p>
          </div> : <span></span>}
        </div>
      </div>

      {/* Resim acma Modalı */}
      {imageModalOpen && selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <img src={selectedImage} alt="Selected" className="max-w-full max-h-[80vh]" />
            <button onClick={() => setImageModalOpen(false)} className="mt-4 block mx-auto bg-red-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Silme Onay Modalı */}
      {confirmDeleteId && (
        <DeleteConfirmModal
          onCancel={closeDeleteModal}
          onDelete={confirmDelete}
        />
      )}

      {open && <ProductsModal editData={editData} setOpen={setOpen} getProducts={getProducts} />}
    </>
  )
}

export default Products