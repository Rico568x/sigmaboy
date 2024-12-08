import { create } from 'zustand';
import { Image } from '../types';

interface ImageState {
  images: Image[];
  addImage: (image: Omit<Image, 'id' | 'createdAt' | 'likes' | 'dislikes'>) => void;
  deleteImage: (imageId: string) => void;
  toggleLike: (imageId: string, userId: string) => void;
  toggleDislike: (imageId: string, userId: string) => void;
}

const IMAGES_KEY = 'social_image_images';

const getStoredImages = (): Image[] => {
  const images = localStorage.getItem(IMAGES_KEY);
  return images ? JSON.parse(images) : [];
};

export const useImageStore = create<ImageState>((set, get) => ({
  images: getStoredImages(),

  addImage: (imageData) => {
    const newImage: Image = {
      ...imageData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      likes: 0,
      dislikes: 0,
    };

    set((state) => {
      const updatedImages = [...state.images, newImage];
      localStorage.setItem(IMAGES_KEY, JSON.stringify(updatedImages));
      return { images: updatedImages };
    });
  },

  deleteImage: (imageId) => {
    set((state) => {
      const updatedImages = state.images.filter((img) => img.id !== imageId);
      localStorage.setItem(IMAGES_KEY, JSON.stringify(updatedImages));
      return { images: updatedImages };
    });
  },

  toggleLike: (imageId, userId) => {
    set((state) => {
      const updatedImages = state.images.map((img) => {
        if (img.id === imageId) {
          const wasLiked = img.userLiked;
          const wasDisliked = img.userDisliked;
          
          return {
            ...img,
            likes: wasLiked ? img.likes - 1 : img.likes + 1,
            dislikes: wasDisliked ? img.dislikes - 1 : img.dislikes,
            userLiked: !wasLiked,
            userDisliked: false,
          };
        }
        return img;
      });

      localStorage.setItem(IMAGES_KEY, JSON.stringify(updatedImages));
      return { images: updatedImages };
    });
  },

  toggleDislike: (imageId, userId) => {
    set((state) => {
      const updatedImages = state.images.map((img) => {
        if (img.id === imageId) {
          const wasLiked = img.userLiked;
          const wasDisliked = img.userDisliked;
          
          return {
            ...img,
            likes: wasLiked ? img.likes - 1 : img.likes,
            dislikes: wasDisliked ? img.dislikes - 1 : img.dislikes + 1,
            userLiked: false,
            userDisliked: !wasDisliked,
          };
        }
        return img;
      });

      localStorage.setItem(IMAGES_KEY, JSON.stringify(updatedImages));
      return { images: updatedImages };
    });
  },
}));