import React, { useEffect, useState } from 'react';

const ProductList = ({ contract }) => {
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const count = await contract.productId();
      setProductCount(count);
      const productList = [];
      for (let i = 1; i <= count; i++) {
        const product = await contract.getProductDetails(i);
        productList.push(product);
      }
      setProducts(productList);
    };

    fetchProducts();
  }, [contract]);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h3>{product[0]}</h3>
            <p>Quantity: {product[1]}</p>
            <p>Producer: {product[2]}</p>
            <p>Distributor: {product[3]}</p>
            <p>Retailer: {product[4]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProductList;