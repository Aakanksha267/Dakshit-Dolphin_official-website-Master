import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Event } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import { Calendar, MapPin, Users, X, CheckCircle, Clock } from 'lucide-react';

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    message: '',
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const now = new Date().toISOString();
    const { data: upcoming } = await supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .gte('event_date', now)
      .order('event_date', { ascending: true });

    const { data: past } = await supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .lt('event_date', now)
      .order('event_date', { ascending: false })
      .limit(6);

    if (upcoming) setUpcomingEvents(upcoming);
    if (past) setPastEvents(past);
  };

  const handleRegister = (event: Event) => {
    setSelectedEvent(event);
    setShowRegistrationForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('event_registrations').insert([
      {
        event_id: selectedEvent?.id,
        ...formData,
      },
    ]);

    if (!error) {
      setSubmitted(true);
      setTimeout(() => {
        setShowRegistrationForm(false);
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          college: '',
          message: '',
        });
      }, 2000);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const EventCard = ({ event, isPast = false }: { event: Event; isPast?: boolean }) => (
    <Card hoverable>
      <div className="h-48 bg-gradient-to-br from-blue-500 to-teal-600 relative">
        {isPast && (
          <div className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Past Event
          </div>
        )}
      </div>
      <div className="p-6">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-3">
          {event.event_type}
        </span>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{formatDate(event.event_date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{formatTime(event.event_date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{event.mode} {event.location && `- ${event.location}`}</span>
          </div>
          {event.max_participants && (
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm">Max {event.max_participants} participants</span>
            </div>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
        {!isPast && (
          <Button onClick={() => handleRegister(event)} className="w-full">
            Register Now
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Events & Workshops</h1>
          <p className="text-xl text-blue-50 max-w-3xl">
            Join our engaging events, workshops, and seminars to enhance your skills and network with
            industry professionals
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 mb-16">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No upcoming events at the moment</p>
            <p className="text-gray-500">Check back soon for new opportunities</p>
          </div>
        )}

        {pastEvents.length > 0 && (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} isPast />
              ))}
            </div>
          </>
        )}
      </section>

      {showRegistrationForm && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Register for {selectedEvent.title}</h2>
              <button
                onClick={() => setShowRegistrationForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
                  <p className="text-gray-600">
                    You're all set! We'll send you event details and reminders via email.
                  </p>
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
                    label="College/University"
                    name="college"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    required
                  />
                  <TextArea
                    label="Any questions or special requirements?"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                  />
                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1">
                      Complete Registration
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowRegistrationForm(false)}
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
