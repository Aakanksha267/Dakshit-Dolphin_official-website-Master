import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import { Star, CheckCircle } from 'lucide-react';

interface Testimonial {
  id: number;
  student_name: string;
  department: string;
  quote: string;
  photo_url?: string;
  rating: number;
  // add any more fields if needed
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    student_name: '',
    department: '',
    quote: '',
    photo_url: '',
    rating: 5,
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  // loadTestimonials must be async INSIDE a function, not at the top level
  const loadTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching testimonials:', error);
    }
    if (Array.isArray(data)) {
      setTestimonials(data);
    } else {
      setTestimonials([]);
    }
  };

  // Correct async handleSubmit with event type if needed
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // New submissions default to status='pending'
    const { error } = await supabase.from('testimonials').insert([
      { ...formData, status: 'pending' }
    ]);
    if (error) {
      console.error('Error submitting testimonial:', error);
      alert(error.message || "Form submission failed. Check Supabase columns and policies.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      setFormData({
        student_name: '',
        department: '',
        quote: '',
        photo_url: '',
        rating: 5,
      });
      // Optionally reload testimonials in case of admin auto-approval
      // loadTestimonials();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Student Testimonials</h1>
          <p className="text-xl text-teal-50 mb-6">
            Hear from students who have transformed their careers with us
          </p>
          <Button onClick={() => setShowForm(true)} variant="secondary">
            Share Your Story
          </Button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.id}>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{t.quote}"</p>
                <div className="flex items-center">
                  {t.photo_url ? (
                    <img src={t.photo_url} alt={t.student_name} className="w-12 h-12 rounded-full" />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {t.student_name?.charAt(0)}
                    </div>
                  )}
                  <div className="ml-3">
                    <div className="font-semibold text-gray-900">{t.student_name}</div>
                    <div className="text-xs text-teal-600">{t.department}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Share Your Testimonial</h2>
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">
                    Your testimonial has been submitted and will be reviewed by our team.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Full Name"
                    name="student_name"
                    value={formData.student_name}
                    onChange={e => setFormData({ ...formData, student_name: e.target.value })}
                    required
                  />
                  <Input
                    label="Department"
                    name="department"
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    required
                  />
                  <TextArea
                    label="Testimonial"
                    name="quote"
                    value={formData.quote}
                    onChange={e => setFormData({ ...formData, quote: e.target.value })}
                    rows={4}
                    required
                  />
                  <Input
                    label="Photo URL (optional)"
                    name="photo_url"
                    value={formData.photo_url}
                    onChange={e => setFormData({ ...formData, photo_url: e.target.value })}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating })}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              rating <= formData.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1">
                      Submit Testimonial
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
