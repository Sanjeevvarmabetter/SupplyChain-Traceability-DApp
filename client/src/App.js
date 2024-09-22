import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Products from './components/Products.jsx';
import ProductsList from './components/ProductList.jsx';
import ChangeState from './components/ChangeState.jsx';
import abi from './contractJson/SupplyChain.json';



const App = () => {

	const [state,setState] = useState({
		provider:null,
		signer:null,
		contract:null,
	});

	const [account,setAccount] = useState('Not connected');

	useEffect(() => {
		const init = async () => {
			const contractAddress = "";
			const contractABI = abi.abi;

			try {
				const { ethereum } = window;

				const accounts = await ethereum.request({ method: 'eth_requestAccounts'});


				setAccount(accounts[0]);

				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();



				const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
				setState({ provider, signer, contract: contractInstance });
		

			} catch(error) {
				console.log(error);
			}

		};

		init();
	}, []);



	return (
		<div>
		<h1>Supply Chain Managgemtn System</h1>
		{contract && <Products contract={contract} />}
		{contract && <ProductsList contract={contract} />}
		{contract && <ChangeState contract={contract} productIds={productIds}/>}

		</div>
	);
};


export default App;