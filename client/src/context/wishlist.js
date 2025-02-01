import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const localData = localStorage.getItem('wishlist');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.log('Error loading wishlist from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.log('Error saving wishlist to localStorage:', error);
    }
  }, [wishlist]);

  const addToWishlist = (productId) => {
    setWishlist(prev => [...new Set([...prev, productId])]);
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
