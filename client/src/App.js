import React, { useEffect } from 'react';
import Products from './components/Products';
import ProductList from './components/ProductList';
import './App.css';


const App = () => {
  const [contract,setContract] = useState(null);
  const [productIds, setProductsIds] = useState([]);

  const initContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const supplychaincontract = new ethers.Contract(
      '',
      supplychainartifact.abi,
      signer
    );
    
  setContract(supplychaincontract);
  
  };

  useEffect(() => {
    initContract();
  }, []);

  return (
    <div>
      <h1>Supply Chain DApp</h1>
      {contract && (
        <>
          <Products contract={contract} />
          <ProductList contract={contract} />
          <ChangeState contract={contract} productIds={productIds} />
        
        </>
      )}
    
    </div>
  );

};

export default App;
