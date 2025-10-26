import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { X, Image as ImageIcon } from 'lucide-react';

// Change GalleryImage type as follows, or just use 'any' for quick testing:
type GalleryImage = {
  id: number;
  uploaded_at: string;
  image_url: string;
  caption: string;
  event: string;
};

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    const { data } = await supabase.from('gallery').select('*').order('uploaded_at', { ascending: false });
    if (data) setImages(data);
  };

  // Get unique events for filtering buttons
  const eventOptions = ['All', ...Array.from(new Set(images.map(img => img.event).filter(Boolean)))];

  const filteredImages =
    filter === 'All' ? images : images.filter(img => img.event === filter);

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
          {eventOptions.map(evt => (
            <button
              key={evt}
              onClick={() => setFilter(evt)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === evt
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-teal-50'
              }`}
            >
              {evt}
            </button>
          ))}
        </div>

        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="aspect-square bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg cursor-pointer overflow-hidden hover:opacity-90 transition-opacity relative group"
              >
                {image.image_url ? (
                  <img
                    src={image.image_url}
                    alt={image.caption || ''}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <ImageIcon className="h-12 w-12" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-30 p-2 text-white text-center text-xs group-hover:bg-opacity-70 transition">
                  {image.caption}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No images in this event yet</p>
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
            <img
              src={selectedImage.image_url}
              alt={selectedImage.caption || ''}
              className="w-full object-contain max-h-[70vh] rounded-lg"
            />
            <div className="text-white text-center mt-4">
              <h3 className="text-2xl font-bold mb-2">{selectedImage.caption}</h3>
              {selectedImage.event && (
                <p className="text-teal-300 text-sm">{selectedImage.event}</p>
              )}
              <p className="text-gray-300">
                {selectedImage.uploaded_at?.slice(0, 10)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
