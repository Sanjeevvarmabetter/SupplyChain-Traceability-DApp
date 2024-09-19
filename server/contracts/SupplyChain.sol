// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract SupplyChain {
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
    address public owner;


    event ProductCreated(uint productId, string name, string origin,address owner);
    event ProductUpdated(uint productId, SupplyChainStatus status, string update);
    event ProductTransfered(uint productId,address from,address to);


    constructor() {
        owner = msg.sender;
    }
 
     modifier onlyOwner() {
        require(msg.sender == owner,"Caller is not the contract owner");
        _;

     }
 
        modifier onlyOwnerOf(uint _productId) {
        require(products[_productId].currentHolder == msg.sender, "Not the current holder");
        _;
    }


        
    function createProduct(string memory _name, string memory _origin) public onlyOwner {
        productCount++;


        products[productCount] = Product({
            id: productCount,
            name: _name,
            origin: _origin,
            currentHolder: msg.sender,
            status: SupplyChainStatus.Created,
            updates: new string
        });

        emit ProductCreated(productCount, _name, _origin,msg.sender);
    }

    // Function to update product details, only callable by the current holder
    function updateProduct(uint _productId,SupplyChainStatus _status, string memory _update) public onlyOwnerOf(_productId) {
        require(_status == SupplyChainStatus.InTransit,"the product is not yet started or dispatched");
        products[_productId].status = _status;
        products[_productId].updates.push(_update);

        emit ProductUpdated(_productId, products[_productId].status, _update);
    }

    function transferProduct(uint _productId,address _newowner) public onlyOwner {
        require(_newowner != address(0),"not a valid address");
        address previousHolder = products[_productId].currentHolder;
        products[_productId].currentHolder = _newowner;

    
        emit ProductTransfered(_productId,previousHolder,_newowner);
    
        }

    function getProductHistory(uint _productId) public view returns (Product memory) {
        return products[_productId];
    }
}