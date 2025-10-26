# D.Dolphin Official Website

This project is a portal for events, internships, blogs, testimonials, and more.

## Setup Instructions

1. Clone or fork this repository.
2. Run `npm install` to install dependencies.
3. Create a `.env.local` file in the project root:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

4. Set up your Supabase tables as described below.

## Database Schema

### events
- id: int8 (Primary Key)
- created_at: timestamp (default now())
- title: text
- description: text
- date: date
- time: text
- is_past: bool
- image_url: text

### event_registrations
- id: int8 (Primary Key)
- created_at: timestamp (default now())
- event_id: int8
- name: text
- email: text
- college: text
- message: text
- phone: text

### testimonials
- id: int8 (Primary Key)
- created_at: timestamp (default now())
- student_name: text
- department: text
- quote: text
- photo_url: text
- rating: int8
- status: text

### gallery
- id: int8 (Primary Key)
- uploaded_at: timestamp (default now())
- image_url: text
- caption: text
- event: text

### blogs
- id: int8 (Primary Key)
- created_at: timestamp (default now())
- title: text
- summary: text
- content: text
- author: text
- category: text
- image_url: text

### internships
- id: int8 (Primary Key)
- title: text
- description: text
- department: text
- mode: text
- duration: text
- stipend: numeric
- skills_required: text
- created_at: timestamp (default now())
- is_active: bool

### internship_applications
- id: int8 (Primary Key)
- created_at: timestamp (default now())
- internship_id: int8
- name: text
- email: text
- department: text
- resume_url: text
- message: text
- college: text
- phone: int8

### contacts
- created_at: timestamp (default now())
- full_name: text
- email: text
- subject: text
- message: text
