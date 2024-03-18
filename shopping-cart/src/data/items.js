const productList = [
    {
        "id": 1,
        "name": "AEROREADY SHIRT",
        "price": 25,
        "image": "assets/images/Products/product1.jpg"
    },
    {
        "id": 2,
        "name": "WIRELESS EARBUDS",
        "price": 100,
        "image": "assets/images/Products/product2.jpg"
    },
    {
        "id": 3,
        "name": "HOODED PARKA",
        "price": 45,
        "image": "assets/images/Products/product3.jpg"
    },
    {
        "id": 4,
        "name": "STRAW METAL BOTTLE",
        "price": 24,
        "image": "assets/images/Products/product4.jpg"
    },
    {
        "id": 5,
        "name": "METAL Sunglasses",
        "price": 50,
        "image": "assets/images/Products/product5.jpg"
    },
    {
        "id": 6,
        "name": "BACK HAT",
        "price": 50,
        "image": "assets/images/Products/product6.jpg"
    },
    {
        "id": 7,
        "name": "BACKPACK",
        "price": 70,
        "image": "assets/images/Products/product7.jpg"
    },
    {
        "id": 8,
        "name": "ULTRABOOST 22",
        "price": 45,
        "image": "assets/images/Products/product8.jpg"
    }
]

const getProductData = id => {
    const productData = productList.find(data => data.id === id);
    return productData
}

export {productList, getProductData}