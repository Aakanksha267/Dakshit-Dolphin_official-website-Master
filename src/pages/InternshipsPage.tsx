import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Internship } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import { Briefcase, MapPin, Clock, DollarSign, X, CheckCircle } from 'lucide-react';

export default function InternshipsPage() {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterMode, setFilterMode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    college: '',
    message: '',
  });

  useEffect(() => {
    loadInternships();
  }, []);

  useEffect(() => {
    filterInternships();
  }, [internships, filterDepartment, filterMode]);

  const loadInternships = async () => {
    const { data } = await supabase
      .from('internships')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (data) setInternships(data);
  };

  const filterInternships = () => {
    let filtered = [...internships];
    if (filterDepartment) {
      filtered = filtered.filter((i) => i.department === filterDepartment);
    }
    if (filterMode) {
      filtered = filtered.filter((i) => i.mode === filterMode);
    }
    setFilteredInternships(filtered);
  };

  const handleApply = (internship: Internship) => {
    setSelectedInternship(internship);
    setShowApplicationForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('internship_applications').insert([
      {
        internship_id: selectedInternship?.id,
        ...formData,
      },
    ]);

    if (!error) {
      setSubmitted(true);
      setTimeout(() => {
        setShowApplicationForm(false);
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          department: '',
          college: '',
          message: '',
        });
      }, 2000);
    }
  };

  const departments = [...new Set(internships.map((i) => i.department))];
  const modes = [...new Set(internships.map((i) => i.mode))];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Internship Opportunities</h1>
          <p className="text-xl text-teal-50 max-w-3xl">
            Kickstart your career with hands-on experience in top companies
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Filter by Department"
              name="department"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              options={departments.map((d) => ({ value: d, label: d }))}
            />
            <Select
              label="Filter by Mode"
              name="mode"
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
              options={modes.map((m) => ({ value: m, label: m }))}
            />
            <div className="flex items-end">
              <Button
                onClick={() => {
                  setFilterDepartment('');
                  setFilterMode('');
                }}
                variant="outline"
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((internship) => (
            <Card key={internship.id} hoverable>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{internship.title}</h3>
                    <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-sm font-semibold rounded-full">
                      {internship.department}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{internship.mode}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{internship.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span className="text-sm">{internship.stipend}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 text-sm line-clamp-3">{internship.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {internship.skills_required.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {internship.skills_required.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{internship.skills_required.length - 3} more
                    </span>
                  )}
                </div>

                <Button onClick={() => handleApply(internship)} className="w-full">
                  Apply Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No internships found matching your criteria</p>
          </div>
        )}
      </section>

      {showApplicationForm && selectedInternship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Apply for {selectedInternship.title}</h2>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                  <p className="text-gray-600">We'll review your application and get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  <Input
                    label="Department/Field of Study"
                    name="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    required
                  />
                  <Input
                    label="College/University"
                    name="college"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    required
                  />
                  <TextArea
                    label="Why are you interested in this internship?"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                  />
                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1">
                      Submit Application
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowApplicationForm(false)}
                    >
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
