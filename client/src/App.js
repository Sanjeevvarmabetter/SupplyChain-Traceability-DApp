import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Products from './components/Products.jsx';
import ProductsList from './components/ProductList.jsx';
import ChangeState from './components/ChangeState.jsx';
import abi from './contractJson/SupplyChain.json';

const App = () => {
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null,
    });

    const [account, setAccount] = useState('Not connected');
    const [productIds, setProductIds] = useState([]); 

    useEffect(() => {
        const init = async () => {
            const contractAddress = "0xf6ceB6BB9E293E6961f067b84ac8Bef978b7295d";
            const contractABI = abi.abi;

            try {
                const { ethereum } = window;

                if (!ethereum) {
                    console.error('Ethereum object not found, install Metamask.');
                    return;
                }

                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);

	
				const provider = new ethers.BrowserProvider(ethereum);

				const signer = provider.getSigner();

                const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
                setState({ provider, signer, contract: contractInstance });


            } catch (error) {
                console.log(error);
            }
        };

        init();
    }, []);


	const {  contract } = state;


    return (
        <div>
            <h1>Supply Chain Management System</h1>
			
            {state.contract && <Products contract={state.contract} />}
            {state.contract && <ProductsList contract={state.contract} />}
            {state.contract && <ChangeState contract={state.contract} productIds={productIds} />}
        </div>
    );
};

export default App;
