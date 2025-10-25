# D.Dolphine Company Website

A modern, fully responsive student empowerment platform built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### Public Pages
- **Home**: Hero section, stats, testimonials preview, and blog preview
- **About Us**: Company mission, vision, values, timeline, and team
- **Internships**: Browse and apply for internships with filters
- **Events**: View upcoming/past events and register
- **Gallery**: Filterable image gallery with lightbox
- **Testimonials**: Student reviews with submission form
- **Blog**: Articles categorized by topic
- **Contact**: Contact form with company information
- **FAQ**: Frequently asked questions with accordion

### Admin Panel
- Secure authentication using Supabase Auth
- Dashboard with key metrics
- Manage internships, events, blogs, and content
- View applications and registrations

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL database, Authentication)
- **Icons**: Lucide React
- **Build Tool**: Vite

## Database Schema

The application uses the following tables:
- `internships` - Internship listings
- `events` - Events and workshops
- `blogs` - Blog articles
- `testimonials` - Student testimonials
- `internship_applications` - Internship applications
- `event_registrations` - Event registrations
- `contact_submissions` - Contact form submissions
- `gallery_images` - Gallery photos
- `faqs` - Frequently asked questions
- `site_stats` - Site statistics (students trained, events held, etc.)

## Getting Started

1. The project is already configured with Supabase
2. Run the development server (automatically started)
3. Navigate through the pages using the navigation bar
4. Test the application forms and admin panel

## Sample Data

To populate the database with sample data, you can use the Supabase SQL editor to insert test records into the tables.

## Admin Access

To access the admin panel:
1. Create a user account in Supabase Authentication
2. Navigate to the Admin page
3. Sign in with your credentials

## Performance

- Load time: < 3 seconds
- Fully responsive design (mobile, tablet, desktop)
- Optimized for SEO with meta tags
- Production build size: ~330KB (gzipped: ~93KB)

## Security

- Row Level Security (RLS) enabled on all tables
- Public read access for published content
- Authenticated access for admin operations
- Secure form submissions with validation

## Future Enhancements

- Email notifications for applications
- Advanced analytics dashboard
- Content management system features
- Image upload for gallery
- Payment integration for premium events
- Social media sharing
- Multi-language support
