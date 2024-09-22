import React, { useState } from "react";

const Products = ({ contract }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [producer, setProducer] = useState('');
  const [distributor, setDistributor] = useState('');
  const [retailer, setRetailer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tx = await contract.createProduct(name, quantity, producer, distributor, retailer);
      await tx.wait();
      alert('Product created');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
      />
      <input
        type="text"
        placeholder="Producer Address"
        value={producer}
        onChange={(e) => setProducer(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Distributor Address"
        value={distributor}
        onChange={(e) => setDistributor(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Retailer Address"
        value={retailer}
        onChange={(e) => setRetailer(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Product'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Products;
