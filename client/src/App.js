import React, { useEffect } from 'react';
import Products from './components/Products';
import ProductList from './components/ProductList';
import getContract from './Contract';
import './App.css';


const App = () => {

  return (
    <div>
      <h1>Supply Chain DApp</h1>
      {contract && (
        <>
          <Products contract={contract} />
          <ProductList contract={contract} />
          <ChangeState contract={contract} productIds={productIds} />
          <getContract />
        </>
      )}
    
    </div>
  );

};

export default App;
