import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { SiteStats, Testimonial, Blog } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import { Users, Calendar, Building2, Star, ArrowRight, Briefcase } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    loadStats();
    loadTestimonials();
    loadBlogs();
  }, []);

  const loadStats = async () => {
    const { data } = await supabase.from('site_stats').select('*').single();
    if (data) setStats(data);
  };

  const loadTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .limit(3);
    if (data) setTestimonials(data);
  };

  const loadBlogs = async () => {
    const { data } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(3);
    if (data) setBlogs(data);
  };

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-teal-600 via-teal-500 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Empowering Students Through Experience
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-teal-50 max-w-3xl mx-auto">
              Join thousands of students building their careers through hands-on internships,
              interactive workshops, and industry events
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => onNavigate('internships')} size="lg" variant="secondary">
                Apply for Internship
              </Button>
              <Button
                onClick={() => onNavigate('events')}
                size="lg"
                variant="outline"
                className="bg-white hover:bg-gray-100 border-white text-teal-600"
              >
                Join Events
              </Button>
            </div>
          </div>
        </div>
      </section>

      {stats && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                  <Users className="h-8 w-8 text-teal-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stats.students_trained.toLocaleString()}+
                </div>
                <div className="text-gray-600">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stats.events_held.toLocaleString()}+
                </div>
                <div className="text-gray-600">Events Held</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Building2 className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stats.institutions_partnered.toLocaleString()}+
                </div>
                <div className="text-gray-600">Institutions Partnered</div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from students who transformed their careers with us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} hoverable>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.testimonial}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.college}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button onClick={() => onNavigate('testimonials')} variant="outline">
              View All Testimonials <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest from Our Blog</h2>
            <p className="text-xl text-gray-600">
              Stay updated with career tips, industry insights, and success stories
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Card key={blog.id} hoverable>
                <div className="h-48 bg-gradient-to-br from-teal-400 to-blue-500"></div>
                <div className="p-6">
                  <div className="text-sm text-teal-600 font-semibold mb-2">{blog.category}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-4">{blog.summary}</p>
                  <Button onClick={() => onNavigate('blog')} variant="outline" size="sm">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button onClick={() => onNavigate('blog')} variant="outline">
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Briefcase className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-teal-50">
            Explore exciting internship opportunities and kickstart your career today
          </p>
          <Button onClick={() => onNavigate('internships')} size="lg" variant="secondary">
            Browse Internships
          </Button>
        </div>
      </section>
    </div>
  );
}
