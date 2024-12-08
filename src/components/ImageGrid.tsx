import React from 'react';
import { useImageStore } from '../store/imageStore';
import { useAuthStore } from '../store/authStore';
import { ThumbsUp, ThumbsDown, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function ImageGrid() {
  const { images, deleteImage, toggleLike, toggleDislike } = useImageStore();
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <div key={image.id} className="bg-white rounded-lg shadow overflow-hidden">
          <img
            src={image.imageData}
            alt={image.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
            }}
          />
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{image.title}</h3>
                <p className="text-sm text-gray-500">
                  Posted by {image.username} • {formatDistanceToNow(new Date(image.createdAt))} ago
                </p>
              </div>
              {user.id === image.userId && (
                <button
                  onClick={() => deleteImage(image.id)}
                  className="text-gray-400 hover:text-red-500 focus:outline-none"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
            <p className="mt-2 text-gray-600">{image.description}</p>
            <div className="mt-4 flex items-center space-x-4">
              <button
                onClick={() => toggleLike(image.id, user.id)}
                className={`flex items-center space-x-1 ${
                  image.userLiked ? 'text-blue-500' : 'text-gray-500'
                } hover:text-blue-600 focus:outline-none`}
              >
                <ThumbsUp className="h-5 w-5" />
                <span>{image.likes}</span>
              </button>
              <button
                onClick={() => toggleDislike(image.id, user.id)}
                className={`flex items-center space-x-1 ${
                  image.userDisliked ? 'text-red-500' : 'text-gray-500'
                } hover:text-red-600 focus:outline-none`}
              >
                <ThumbsDown className="h-5 w-5" />
                <span>{image.dislikes}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      {images.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500">No images have been shared yet. Be the first to share!</p>
        </div>
      )}
    </div>
  );
}