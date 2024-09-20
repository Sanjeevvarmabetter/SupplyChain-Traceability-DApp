import React, { ueState, useEffect } from 'react';

const ChangeState = ({ contract, productsIds}) => {
    const [selectedProductId, setSelectedProductId] = useState('');
  const [newState, setNewState] = useState('');

  const handleChangeState = async () => {
    const tx = await contract.changeState(selectedProductId, newState);
    await tx.wait();
    alert('State changed!');
  };

  return (
    <div>
              <select onChange={(e) => setSelectedProductId(e.target.value)}>
        <option value="">Select Product</option>
        {productIds.map((id) => (
          <option key={id} value={id}>{id}</option>
        ))}
      </select>
      <select onChange={(e) => setNewState(e.target.value)}>
        <option value="">Select New State</option>
        <option value="0">Created</option>
        <option value="1">InTransit</option>
        <option value="2">Delivered</option>
      </select>
      <button onClick={handleChangeState}>Change State</button>

    </div>
  );


};