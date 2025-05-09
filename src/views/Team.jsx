import React, { useEffect, useState } from 'react'
import { getToken } from '../utils/auth'
import { toast } from 'react-toastify'
import { noData } from '../assets'
import TeamModal from './modals/TeamModal'
import DeleteConfirmModal from './modals/DeleteConfirmModal'

function Team() {
  // Modal durumları
  const [open, setOpen] = useState(false) // open modal
  const [imageModalOpen, setImageModalOpen] = useState(false) // image modal 
  const [selectedImage, setSelectedImage] = useState(null) // selected image
  const [confirmDeleteId, setConfirmDeleteId] = useState(null) // cancel or delete

  const [data, setData] = useState([])

  // get Team
  const getTeam = () => {
    fetch("https://testaoron.limsa.uz/api/team-section")
      .then(res => res.json())
      .then(item => setData(item?.data))
  }

  useEffect(() => {
    getTeam()
  }, [])

  // Silme işlemi
  const deleteTeam = (id) => {
    fetch(`https://testaoron.limsa.uz/api/team-section/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(item => {
        if (item?.success) {
          toast.success(item?.data?.message)
          getTeam()
        } else {
          // toast.error(item?.message?.message)
          toast.error("Status-500 HATO")

        }
      })
  }

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
    deleteTeam(confirmDeleteId)
    closeDeleteModal()
  }

  // edit 
  const [editData, setEditData] = useState()

  return (
    <>
      <div className='shadow-md p-6 bg-white rounded-lg'>
        <div className='flex justify-between'>
          <h2 className='font-bold text-xl mb-6'>Team Members</h2>
          <button onClick={() => {
            setOpen(true)
            setEditData(null);
          }} className='cursor-pointer text-white py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg mb-4 transition-all duration-150'>Add Team Members</button>
        </div>
        <div>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border border-gray-300 p-2'>№</th>
                <th className='border border-gray-300 p-2'>Image</th>
                <th className='border border-gray-300 p-2'>Full Name</th>
                <th className='border border-gray-300 p-2'>Position</th>
                <th className='border border-gray-300 p-2'>Actions</th>
              </tr>
            </thead>
            {data && <tbody>
              {data.map((item, i) => (
                <tr key={i} className='text-center hover:bg-gray-100'>
                  <td className='border border-gray-300 p-2'>{i + 1}</td>
                  <td className='border border-gray-300 p-2 cursor-pointer'
                    onClick={() => openImageModal(item.image)} // Resme tıklanınca modal aç
                  >
                    <img src={`https://testaoron.limsa.uz/${item.image}`} alt="img" className='w-16 h-16 object-cover mx-auto rounded' />
                  </td>
                  <td className='border border-gray-300 p-2'>{item.full_name}</td>
                  <td className='border border-gray-300 p-2'>{item.position_en}</td>
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

      {open && <TeamModal editData={editData} setOpen={setOpen} getTeam={getTeam} />}
    </>
  )
}

export default Team
