import React, { useEffect, useState } from 'react'
import { getToken } from '../utils/auth'
import { toast } from 'react-toastify'
import { noData } from '../assets'
import NewsModal from './modals/NewsModal'
import DeleteConfirmModal from './modals/DeleteConfirmModal'

function News() {

  // Open modal 
  // Modal durumları
  const [open, setOpen] = useState(false) // open modal
  const [imageModalOpen, setImageModalOpen] = useState(false) // image modal 
  const [selectedImage, setSelectedImage] = useState(null) // selected image
  const [confirmDeleteId, setConfirmDeleteId] = useState(null) // cancel or delete

  const [data, setData] = useState([])

  // get News 
  const getNews = () => {
    fetch("https://back.ifly.com.uz/api/news")
      .then(res => res.json())
      .then(item => setData(item?.data)
      )
  }

  useEffect(() => {
    getNews()
  }, [])


  //delete News
  const deleteNews = (id) => {

    fetch(`https://back.ifly.com.uz/api/news/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(item => {
        if (item?.success) {
          // toast.success(item?.data?.message)
          toast.success("Silme işlemi başarılı")
          getNews()
        } else {
          toast.error(item?.message?.message)
        }
      })
  }


  // Resim modalını aç
  const openImageModal = (image) => {
    setSelectedImage(`https://back.ifly.com.uz/${image}`)
    setImageModalOpen(true)
  }

  // Resim modalını kapat
  const closeImageModal = () => {
    setImageModalOpen(false)
    setSelectedImage(null) // Resim modalı kapatıldığında resmi sıfırla
  }

  // Silme onayı modalını aç
  const openDeleteModal = (id) => {
    setConfirmDeleteId(id)
  }

  // Silme onayı modalını kapat
  const closeDeleteModal = () => {
    setConfirmDeleteId(null)
  }

  // Silme işlemini onayla
  const confirmDelete = () => {
    deleteNews(confirmDeleteId) // ✅ doğru fonksiyon adı
    closeDeleteModal()
  }

  // edit 
  const [editData, setEditData] = useState()

  return (
    <>
      <div className='shadow-md p-6 bg-white rounded-lg'>
        <div className='flex  justify-between'>
          <h2 className='font-bold text-xl mb-6'>News</h2>
          <button
            onClick={() => {
              setOpen(true)
              setEditData(null);
            }}
            className='cursor-pointer text-white py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg mb-4 transition-all duration-150  '>Add News</button>
        </div>
        <div>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border border-gray-300 p-2'>№</th>
                <th className='border border-gray-300 p-2'>Image</th>
                <th className='border border-gray-300 p-2'>Title (EN)</th>
                <th className='border border-gray-300 p-2'>Description</th>
                <th className='border border-gray-300 p-2'>Actions</th>
              </tr>
            </thead>
            {data && <tbody >
              {data.map((item, i) => (
                <tr key={i} className='text-center hover:bg-gray-100'>
                  <td className='border border-gray-300 p-2'>{i + 1}</td>
                  <td className='border border-gray-300 p-2 cursor-pointer'
                    onClick={() => openImageModal(item.image)} // Resme tıklanınca modal aç
                  >
                    <img src={`https://back.ifly.com.uz/${item.image}`} alt="img" className='w-16 h-16 object-cover mx-auto rounded' />
                  </td>
                  <td className='border border-gray-300 p-2'>{item.title_en}</td>
                  <td className='border border-gray-300 p-2'>{item.description_en}</td>
                  <td className='border border-gray-300 p-2 w-[200px]'>
                    <button
                      onClick={() => {
                        setEditData(item)
                        setOpen(true)
                      }}
                      className='px-4 py-2 mr-2 cursor-pointer bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition'>Edit</button>
                    <button
                      onClick={() => openDeleteModal(item.id)} // Silme modalını aç
                      className='px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition'>Delete</button>
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

      {/* Resim Modalı */}
      {imageModalOpen && selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <img src={selectedImage} alt="Selected" className="max-w-full max-h-[80vh]" />
            <button onClick={closeImageModal} className="mt-4 block mx-auto bg-red-500 text-white px-4 py-2 rounded">
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

      {open && <NewsModal editData={editData} setOpen={setOpen} getNews={getNews} />}
    </>
  )
}

export default News