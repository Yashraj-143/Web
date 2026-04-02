import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore, MOCK_PRODUCTS } from '../store/useStore';
import type { Review } from '../store/useStore';
import { Star, ShoppingCart, ArrowLeft, Image as ImageIcon, Video, Send, Zap } from 'lucide-react';
import { format } from 'date-fns';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const { addToCart, isLoggedIn, user, setCheckoutItems } = useStore();
  
  const [reviews, setReviews] = useState<Review[]>(product?.reviews || []);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [mediaType, setMediaType] = useState<'none' | 'image' | 'video'>('none');

  if (!product) {
    return <div className="text-center py-20 text-xl font-bold uppercase tracking-widest dark:text-white">Product not found</div>;
  }

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate('/login', { state: { from: { pathname: `/product/${id}` } } });
      return;
    }
    
    if (!newReview.trim()) return;

    const review: Review = {
      id: Math.random().toString(36).substr(2, 9),
      userName: user?.name || 'Anonymous',
      rating,
      comment: newReview,
      date: new Date().toISOString(),
      ...(mediaType === 'image' && { mediaUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', mediaType: 'image' }),
      ...(mediaType === 'video' && { mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', mediaType: 'video' }),
    };

    setReviews([review, ...reviews]);
    setNewReview('');
    setRating(5);
    setMediaType('none');
  };

  const handleBuyNow = () => {
    setCheckoutItems([{ ...product, quantity: 1 }]);
    navigate('/checkout', { state: { fromCart: false } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </button>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1 rounded-none overflow-hidden bg-gray-100 dark:bg-gray-800 mb-8 lg:mb-0 border border-gray-200 dark:border-gray-700">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">{product.category}</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl uppercase">{product.name}</h1>
          <div className="mt-4 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((ratingValue) => (
                <Star
                  key={ratingValue}
                  className={`h-5 w-5 flex-shrink-0 ${
                    product.rating > ratingValue ? 'text-emerald-500 fill-current' : 'text-gray-300 dark:text-gray-600'
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="ml-3 text-sm font-medium text-gray-500 dark:text-gray-400">{reviews.length} reviews</p>
          </div>

          <p className="mt-8 text-3xl text-emerald-600 dark:text-emerald-400 font-bold">${product.price.toFixed(2)}</p>
          
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">Description</h3>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-white dark:bg-gray-800 border-2 border-gray-900 dark:border-gray-700 rounded-none py-4 px-8 flex items-center justify-center text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-gray-900 dark:bg-emerald-600 border-2 border-gray-900 dark:border-emerald-600 rounded-none py-4 px-8 flex items-center justify-center text-sm font-bold uppercase tracking-wider text-white hover:bg-gray-800 dark:hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
            >
              <Zap className="h-5 w-5 mr-2" />
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-24 border-t border-gray-200 dark:border-gray-800 pt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 uppercase tracking-wider">Customer Reviews</h2>
        
        {/* Review Form */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-none p-8 mb-12 border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-6">Write a Review</h3>
          <form onSubmit={handleAddReview} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star className={`h-6 w-6 ${rating >= star ? 'text-emerald-500 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">Your Review</label>
              <textarea
                rows={4}
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="w-full rounded-none border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-4 border transition-colors"
                placeholder="What did you think about this product?"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setMediaType(mediaType === 'image' ? 'none' : 'image')}
                  className={`flex items-center text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-none border transition-colors ${mediaType === 'image' ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700 dark:text-emerald-300' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <ImageIcon className="h-4 w-4 mr-2" /> Add Photo
                </button>
                <button
                  type="button"
                  onClick={() => setMediaType(mediaType === 'video' ? 'none' : 'video')}
                  className={`flex items-center text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-none border transition-colors ${mediaType === 'video' ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700 dark:text-emerald-300' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <Video className="h-4 w-4 mr-2" /> Add Video
                </button>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-none shadow-sm text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none transition-colors w-full sm:w-auto"
              >
                <Send className="h-4 w-4 mr-2" /> Post Review
              </button>
            </div>
          </form>
        </div>

        {/* Reviews List */}
        <div className="space-y-12">
          {reviews.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 italic">No reviews yet. Be the first to review this product!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 dark:border-gray-800 pb-12">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-none bg-gray-900 dark:bg-gray-700 flex items-center justify-center text-white font-bold mr-4 text-lg">
                    {review.userName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">{review.userName}</h4>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'text-emerald-500 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                      ))}
                      <span className="ml-3 text-xs font-medium text-gray-500 dark:text-gray-400">{format(new Date(review.date), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">{review.comment}</p>
                
                {review.mediaUrl && (
                  <div className="mt-6">
                    {review.mediaType === 'image' ? (
                      <img src={review.mediaUrl} alt="Review attachment" className="h-48 w-auto rounded-none object-cover border border-gray-200 dark:border-gray-700" />
                    ) : (
                      <video src={review.mediaUrl} controls className="h-48 w-auto rounded-none bg-black border border-gray-200 dark:border-gray-700" />
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
