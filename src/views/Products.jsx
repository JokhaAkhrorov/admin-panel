import React, { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://aoron.nippon.com.uz/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Veri alınırken hata oluştu:', error);
      });
  }, []);

  return (
    <div className='shadow-md p-6 bg-white rounded-lg'>
      <div className='flex justify-between'>
        <h2 className='font-bold text-xl mb-6'>Products</h2>
        <button className='cursor-pointer text-white py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg mb-4 transition-all duration-150'>
          Add Product
        </button>
      </div>

      <div className='overflow-x-auto'>
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
            {products.map((product, index) => (
              <tr key={product.id} className='text-center hover:bg-gray-100'>
                <td className='border border-gray-300 p-2'>{index + 1}</td>
                <td className='border border-gray-300 p-2 w-[150px] h-[100px]'>
                  <img
                    src={product.images?.[0]}
                    alt='Product'
                    className='w-full h-full object-cover rounded-sm'
                  />
                </td>
                <td className='border border-gray-300 p-2'>{product.title || '—'}</td>
                <td className='border border-gray-300 p-2'>{product.description || '—'}</td>
                <td className='border border-gray-300 p-2'>{product.price}</td>
                <td className='border border-gray-300 p-2'>{product.category?.title || '—'}</td>
                <td className='border border-gray-300 p-2'>{product.colors?.join(', ') || '—'}</td>
                <td className='border border-gray-300 p-2'>{product.sizes?.join(', ') || '—'}</td>
                <td className='border border-gray-300 p-2'>{product.discount || '—'}</td>
                <td className='border border-gray-300 p-2'>{product.materials || '—'}</td>
                <td className='border border-gray-300 p-2'>
                  <button className='px-4 py-2 mr-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition cursor-pointer'>
                    Edit
                  </button>
                  <button className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
