import { supabase } from '../lib/supabase';

export async function seedDatabase() {
  const internships = [
    {
      title: 'Full Stack Development Intern',
      department: 'Web Development',
      mode: 'Remote',
      duration: '3 months',
      stipend: '₹15,000/month',
      skills_required: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      description: 'Join our team to build modern web applications using cutting-edge technologies.',
      requirements: 'Basic knowledge of JavaScript, HTML, and CSS required.',
      is_active: true,
    },
    {
      title: 'Data Science Intern',
      department: 'Data Science',
      mode: 'Hybrid',
      duration: '6 months',
      stipend: '₹20,000/month',
      skills_required: ['Python', 'Machine Learning', 'Pandas', 'SQL'],
      description: 'Work on real-world data analysis projects and build predictive models.',
      requirements: 'Knowledge of statistics and Python programming.',
      is_active: true,
    },
    {
      title: 'UI/UX Design Intern',
      department: 'Design',
      mode: 'On-site',
      duration: '2 months',
      stipend: '₹12,000/month',
      skills_required: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      description: 'Create beautiful and intuitive user interfaces for our products.',
      requirements: 'Portfolio demonstrating design skills required.',
      is_active: true,
    },
  ];

  const events = [
    {
      title: 'Web Development Workshop',
      description: 'Learn modern web development from industry experts',
      event_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      event_type: 'Workshop',
      mode: 'Online',
      location: 'Zoom',
      max_participants: 100,
      registration_deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      is_active: true,
    },
    {
      title: 'Career Guidance Seminar',
      description: 'Get insights on building a successful career in tech',
      event_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      event_type: 'Seminar',
      mode: 'Hybrid',
      location: 'Tech Hub, Bangalore',
      max_participants: 200,
      registration_deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      is_active: true,
    },
  ];

  const blogs = [
    {
      title: 'How to Ace Your First Internship Interview',
      slug: 'ace-first-internship-interview',
      content: 'Complete guide to preparing for your first internship interview...',
      summary: 'Learn essential tips and strategies to succeed in your first internship interview.',
      category: 'Career Advice',
      author: 'Priya Sharma',
      published: true,
      published_at: new Date().toISOString(),
    },
    {
      title: 'Top 10 Skills Every Software Developer Needs',
      slug: 'top-10-developer-skills',
      content: 'In-depth analysis of must-have skills for modern developers...',
      summary: 'Discover the most important technical and soft skills for software developers.',
      category: 'Technology',
      author: 'Amit Patel',
      published: true,
      published_at: new Date().toISOString(),
    },
  ];

  const testimonials = [
    {
      name: 'Rahul Verma',
      college: 'IIT Delhi',
      program: 'Full Stack Development Internship',
      testimonial: 'Amazing experience! The mentorship and real-world projects helped me land my dream job.',
      rating: 5,
      approved: true,
    },
    {
      name: 'Ananya Singh',
      college: 'BITS Pilani',
      program: 'Data Science Workshop',
      testimonial: 'The workshop was incredibly well-structured. I learned practical skills that I use daily.',
      rating: 5,
      approved: true,
    },
    {
      name: 'Karthik Reddy',
      college: 'NIT Trichy',
      program: 'UI/UX Design Internship',
      testimonial: 'Great learning environment with supportive mentors. Highly recommend to all students!',
      rating: 5,
      approved: true,
    },
  ];

  const faqs = [
    {
      question: 'How do I apply for an internship?',
      answer: 'Click on any internship listing and fill out the application form. You will need to provide your resume and basic information.',
      category: 'Internships',
      order_index: 1,
      is_active: true,
    },
    {
      question: 'Are the internships paid?',
      answer: 'Most of our internships offer stipends. The stipend amount varies by role and is mentioned in each internship listing.',
      category: 'Internships',
      order_index: 2,
      is_active: true,
    },
    {
      question: 'How do I register for events?',
      answer: 'Navigate to the Events page, select the event you want to attend, and click the Register button to fill out the registration form.',
      category: 'Events',
      order_index: 3,
      is_active: true,
    },
    {
      question: 'Can I participate in events from other cities?',
      answer: 'Yes! We offer both online and hybrid events. Online events can be attended from anywhere.',
      category: 'Events',
      order_index: 4,
      is_active: true,
    },
  ];

  try {
    await supabase.from('internships').insert(internships);
    await supabase.from('events').insert(events);
    await supabase.from('blogs').insert(blogs);
    await supabase.from('testimonials').insert(testimonials);
    await supabase.from('faqs').insert(faqs);

    console.log('Sample data inserted successfully!');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
}
