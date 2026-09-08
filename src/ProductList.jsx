import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892577-d433bc89d93e?w=300", cost: "$15", description: "Produces oxygen at night" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-3430187c2f40?w=300", cost: "$12", description: "Great for beginners" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=300", cost: "$18", description: "Beautiful white blooms" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300", cost: "$14", description: "Loves humidity" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=300", cost: "$20", description: "Glossy dark leaves" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300", cost: "$10", description: "Healing properties" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=300", cost: "$16", description: "Soothing scent" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592417817098-8f3d691a4bf5?w=300", cost: "$22", description: "Sweet nighttime aroma" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515584556987-483a45c383f4?w=300", cost: "$11", description: "Herbaceous fragrance" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628744876497-eb0045eef5f2?w=300", cost: "$8", description: "Fresh and invigorating" },
        { name: "Geranium", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=300", cost: "$13", description: "Citrusy scent" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1520412099551-62b6b6a5b1d3?w=300", cost: "$25", description: "Menthol aroma" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207215664-9ba62e0c309e?w=300", cost: "$19", description: "Thrives on neglect" },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1581783342894-3ee465337a09?w=300", cost: "$9", description: "Hardy trailing vine" },
        { name: "Cactus", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300", cost: "$7", description: "Requires very little water" },
        { name: "Succulent Mix", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300", cost: "$12", description: "Compact and colorful" },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1525498128493-380d1990a112?w=300", cost: "$24", description: "Virtually indestructible" },
        { name: "Chinese Evergreen", image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=300", cost: "$17", description: "Patterned foliage" }
      ]
    }
  ];

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prevState => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <a href="#home" onClick={() => setShowCart(false)}>Home</a>
        <a href="#plants" onClick={() => setShowCart(false)}>Plants</a>
        <div className="cart-icon" onClick={() => setShowCart(true)}>
          🛒 <span className="cart-count">{totalCartCount}</span>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h2>{category.category}</h2>
              <div className="plant-list">
                {category.plants.map((plant, pIndex) => (
                  <div className="plant-card" key={pIndex}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.cost}</p>
                    <p>{plant.description}</p>
                    <button 
                      className={`add-to-cart-btn ${addedToCart[plant.name] ? 'added' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
