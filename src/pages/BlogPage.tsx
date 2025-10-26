import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Blog } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
import { ArrowRight, Calendar, User } from 'lucide-react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    // Remove .eq('published', true) and .order('published_at', ...) if columns do not exist
    const { data, error } = await supabase
      .from('blogs')
      .select('*');
    if (data) setBlogs(data);
    setLoading(false);
    if (error) {
      console.error('Error loading blogs:', error);
    }
  };

  const categories = ['All', 'Career Advice', 'Events', 'Technology', 'Learning'];
  const filteredBlogs =
    selectedCategory === 'All' ? blogs : blogs.filter((blog) => blog.category === selectedCategory);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog & News</h1>
          <p className="text-xl text-teal-50">
            Stay updated with career tips, industry insights, and success stories
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-teal-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p>Loading blogs...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">No blogs found.</div>
            ) : (
              filteredBlogs.map((blog) => (
                <Card key={blog.id} hoverable>
                  <div className="h-48 bg-gradient-to-br from-teal-400 to-blue-500"></div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-sm font-semibold rounded-full mb-3">
                      {blog.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{blog.title}</h3>
                    <p className="text-gray-600 mb-4">{blog.summary}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {blog.published_at
                            ? formatDate(blog.published_at)
                            : blog.created_at
                            ? formatDate(blog.created_at)
                            : ''}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
  Read Article <ArrowRight className="ml-2 h-4 w-4" />
</Button>


                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
}
