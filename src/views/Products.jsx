import React, { useEffect, useState } from 'react';
import { noData } from '../assets';

function Products() {
  const [products, setProducts] = useState([]);

  // API'den veri çek
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://back.ifly.com.uz/api/product');
      const data = await response.json();

      console.log('API Yanıtı:', data); // Burada API yanıtını konsola yazdırıyoruz.

      // Eğer data varsa, data.data ile ürünleri alalım
      setProducts(data?.data || []);
    } catch (error) {
      console.error('Ürünler alınamadı:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='shadow-md p-6 bg-white rounded-lg'>
      <div className='flex justify-between'>
        <h2 className='font-bold text-xl mb-6'>Products</h2>
        <button className='cursor-pointer text-white py-2 px-4 bg-green-500 hover:bg-green-600 rounded-lg mb-4 transition-all duration-150'>
          Add Product
        </button>
      </div>

      {products.length > 0 ? (
        <table className='min-w-full table-auto'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border border-gray-300 p-2'>№</th>
              <th className='border border-gray-300 p-2'>Image</th>
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
                <td className='border border-gray-300 p-2 w-[120px] h-[80px]'>
                  <img
                    src={product.images?.[0] || noData}
                    alt='product'
                    className='w-full h-full object-cover rounded-sm'
                  />
                </td>
                <td className='border border-gray-300 p-2'>{product.title || '—'}</td>
                <td className='border border-gray-300 p-2'>{product.description || '—'}</td>
                <td className='border border-gray-300 p-2'>{product.price ?? '—'}</td>
                <td className='border border-gray-300 p-2'>{product.category?.title || '—'}</td>
                <td className='border border-gray-300 p-2'>{product.colors?.join(', ') || '—'}</td>
                <td className='border border-gray-300 p-2'>{product.sizes?.join(', ') || '—'}</td>
                <td className='border border-gray-300 p-2'>{product.discount ?? '—'}</td>
                <td className='border border-gray-300 p-2'>{product.materials?.join(', ') || '—'}</td>
                <td className='border border-gray-300 p-2'>
                  <button className='px-4 py-2 mr-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition'>
                    Edit
                  </button>
                  <button className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className='text-center py-6'>
          <img src={noData} alt='No data' className='mx-auto w-20' />
          <p className='text-gray-500 mt-2'>No Products Found</p>
        </div>
      )}
    </div>
  );
}

export default Products;
