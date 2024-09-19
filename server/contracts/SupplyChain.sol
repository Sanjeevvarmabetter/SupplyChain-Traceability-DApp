// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SupplyChain is Ownable {
    enum SupplyChainStatus { Created, InTransit, Delivered }

    struct Product {
        uint id;
        string name;
        string origin;
        address currentHolder;
        SupplyChainStatus status;
        string[] updates;
    }

    mapping(uint => Product) public products;
    uint public productCount = 0;

    event ProductCreated(uint productId, string name, string origin);
    event ProductUpdated(uint productId, SupplyChainStatus status, string update);

    // Modifier to check if msg.sender is the current holder of the product
    modifier onlyOwnerOf(uint _productId) {
        require(products[_productId].currentHolder == msg.sender, "Not the current holder");
        _;
    }

    // Function to create a new product
    function createProduct(string memory _name, string memory _origin) public onlyOwner {
        productCount++;

        // Properly initialize the product and the updates array
        products[productCount] = Product({
            id: productCount,
            name: _name,
            origin: _origin,
            currentHolder: msg.sender,
            status: SupplyChainStatus.Created,
            updates: new string[](0)  // Initialize an empty string array
        });

        emit ProductCreated(productCount, _name, _origin);
    }

    // Function to update product details, only callable by the current holder
    function updateProduct(uint _productId, string memory _update) public onlyOwnerOf(_productId) {
        products[_productId].status = SupplyChainStatus.InTransit;
        products[_productId].updates.push(_update);
        emit ProductUpdated(_productId, products[_productId].status, _update);
    }

    // Function to get the product history including updates
    function getProductHistory(uint _productId) public view returns (Product memory) {
        return products[_productId];
    }
}