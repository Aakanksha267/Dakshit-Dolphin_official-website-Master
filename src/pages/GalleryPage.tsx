import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { GalleryImage } from '../types';
import { X, Image as ImageIcon } from 'lucide-react';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    const { data } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false });
    if (data) setImages(data);
  };

  const categories = ['All', 'Internships', 'Events', 'Workshops'];
  const filteredImages = filter === 'All' ? images : images.filter((img) => img.category === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Gallery</h1>
          <p className="text-xl text-teal-50">Moments captured from our events and programs</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === cat
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-teal-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="aspect-square bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg cursor-pointer overflow-hidden hover:opacity-90 transition-opacity"
              >
                <div className="w-full h-full flex items-center justify-center text-white">
                  <ImageIcon className="h-12 w-12" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No images in this category yet</p>
          </div>
        )}
      </section>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="max-w-4xl w-full">
            <div className="aspect-video bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center text-white">
              <ImageIcon className="h-24 w-24" />
            </div>
            <div className="text-white text-center mt-4">
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              {selectedImage.description && <p className="text-gray-300">{selectedImage.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
