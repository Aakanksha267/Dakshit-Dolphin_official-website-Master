import { Target, Eye, Heart, Users } from 'lucide-react';
import Card from '../components/Card';

export default function AboutPage() {
  const timeline = [
    { year: '2018', title: 'Foundation', description: 'D.Dolphine was founded with a mission to empower students' },
    { year: '2019', title: 'First 1000 Students', description: 'Reached our first milestone of training 1000 students' },
    { year: '2020', title: 'Virtual Expansion', description: 'Adapted to online learning and expanded reach nationwide' },
    { year: '2021', title: 'Industry Partnerships', description: 'Partnered with 25+ leading companies for internships' },
    { year: '2023', title: 'International Recognition', description: 'Recognized as a leading student empowerment platform' },
    { year: '2024', title: '5000+ Students', description: 'Trained over 5000 students across multiple domains' },
  ];

  const team = [
    { name: 'Nitish Shivhare', role: 'Founder & CEO', initial: 'RK' },
    { name: 'Priya Sharma', role: 'Head of Operations', initial: 'PS' },
    { name: 'Amit Patel', role: 'Training Director', initial: 'AP' },
    { name: 'Sneha Reddy', role: 'Corporate Relations', initial: 'SR' },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About D.Dolphine</h1>
          <p className="text-xl text-teal-50 max-w-3xl">
            We are a multi-domain platform dedicated to empowering students through practical experience,
            industry exposure, and skill development opportunities.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                  <Target className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To bridge the gap between academic learning and industry requirements by providing
                  hands-on experience and practical skills to students across all domains.
                </p>
              </div>
            </Card>

            <Card>
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To become the leading platform for student empowerment, creating a generation of
                  skilled professionals ready to excel in their chosen careers.
                </p>
              </div>
            </Card>

            <Card>
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
                <p className="text-gray-600">
                  Excellence, Integrity, Innovation, and Student-Centricity drive everything we do.
                  We believe in creating lasting impact through quality education.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-teal-200"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card>
                      <div className="p-6">
                        <div className="text-2xl font-bold text-teal-600 mb-2">{item.year}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </Card>
                  </div>
                  <div className="w-8 h-8 bg-teal-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Users className="h-12 w-12 text-teal-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              Passionate professionals dedicated to your success
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} hoverable>
                <div className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                    {member.initial}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
