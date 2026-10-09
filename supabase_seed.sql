-- ============================================================
-- Seed Data for Brainy Kings & Queens CMS
-- Run this AFTER running supabase_schema.sql
-- ============================================================

-- 1. Site Settings
INSERT INTO site_settings (phone, email, address, hours, copyright_year, privacy_policy_link)
VALUES (
  '0591664392',
  'admissions@brainykings.edu',
  'Anwomaso - Ankaa Junction, Kumasi, Ashanti Region, Ghana',
  'Mon – Fri: 7:00 AM – 4:00 PM',
  2026,
  '#'
)
ON CONFLICT DO NOTHING;

-- 2. Hero Slides (from HeroSlideshow.tsx)
WITH seeded_slides(title, display_order) AS (
  VALUES
    ('Welcome', 1),
    ('Community', 2),
    ('Culture', 3),
    ('Campus', 4),
    ('Uniform', 5),
    ('Youth', 6)
)
DELETE FROM public.hero_slides AS duplicate
USING seeded_slides AS seed
WHERE duplicate.title = seed.title
  AND duplicate.display_order = seed.display_order
  AND duplicate.id <> (
    SELECT keep.id
    FROM public.hero_slides AS keep
    WHERE keep.title = seed.title
      AND keep.display_order = seed.display_order
    ORDER BY keep.is_active DESC, keep.created_at, keep.id
    LIMIT 1
  );

INSERT INTO public.hero_slides (title, subtitle, image_url, alt_text, link, display_order, is_active)
SELECT seed.*
FROM (VALUES
  ('Welcome', 'Kumasi · Ghana · Est. 2010', '/images/students-group-pavilion.jpeg', 'Students at the school pavilion', '/admissions', 1, true),
  ('Community', 'Our school community', '/images/students-large-group-photo.jpeg', 'Our school community', '/about', 2, true),
  ('Culture', 'Cultural celebration day', '/images/students-cultural-day.jpeg', 'Cultural celebration day', '/about', 3, true),
  ('Campus', 'Brainy Kings & Queens campus', '/images/school-building.jpeg', 'Brainy Kings & Queens campus', '/curriculum', 4, true),
  ('Uniform', 'Students in uniform at Brainy Kings & Queens', '/images/students-uniform-outdoor-group.jpeg', 'Students in uniform at Brainy Kings & Queens', '/admissions', 5, true),
  ('Youth', 'Young students in Brainy Kings & Queens uniform', '/images/students-preschool-twins.jpeg', 'Young students in Brainy Kings & Queens uniform', '/admissions', 6, true)
) AS seed(title, subtitle, image_url, alt_text, link, display_order, is_active)
WHERE NOT EXISTS (
  SELECT 1
  FROM public.hero_slides AS existing
  WHERE existing.title = seed.title
    AND existing.display_order = seed.display_order
);

-- 3. Values (from about/page.tsx)
INSERT INTO values (icon, title, body, display_order)
VALUES
  ('workspace_premium', 'Dignity First', 'Every child is treated with the respect owed to a future leader. Discipline is built on self-mastery, never fear.', 1),
  ('psychology', 'Curiosity Over Compliance', 'We ask "why?" before "what." The Montessori method honours the child''s natural drive to understand the world.', 2),
  ('groups', 'Community as Classroom', 'Mixed-age groups and collaborative projects teach our students that leadership is always in service of others.', 3)
ON CONFLICT DO NOTHING;

-- 4. Principles (from curriculum/page.tsx)
INSERT INTO principles (icon, title, body, display_order)
VALUES
  ('psychology', 'Child-Led Discovery', 'Children choose their work, building intrinsic motivation and deep understanding.', 1),
  ('diversity_3', 'Mixed-Age Groups', 'Older students mentor younger ones — the most powerful form of learning.', 2),
  ('palette', 'Hands-On Materials', 'Montessori materials are self-correcting: children see their own errors and fix them.', 3),
  ('public', 'Cosmic Education', 'Every subject connects to a larger story — how humans and the universe are one.', 4)
ON CONFLICT DO NOTHING;

-- 5. Programs (from curriculum/page.tsx and ProgramsSection.tsx)
INSERT INTO programs (number, level, age_range, tagline, description, features, icon, image_url, border_color, accent_text_color, display_order, is_published)
VALUES
  ('01', 'Pre-School', 'Ages 2.5 – 5', 'The Prepared Environment', 'Montessori materials build fine motor skills, self-regulation, and early literacy.', 
   ARRAY['Sensorial Learning', 'Practical Life Skills', 'Phonetic Reading', 'Basic Mathematics', 'Emotional Self-Regulation'],
   'child_care', '/images/students-preschool-standing.jpeg', 'border-primary', 'text-primary', 1, true),
  ('02', 'Primary', 'Grades 1 – 6', 'Growing Minds', 'From the Great Lessons to leadership projects — confident, curious thinkers.',
   ARRAY['Literacy & Creative Writing', 'Mathematics & Sciences', 'Computational Thinking', 'Public Speaking & Debate', 'Research & Leadership Projects'],
   'auto_stories', '/images/students-classroom-fun.jpeg', 'border-secondary', 'text-secondary', 2, true),
  ('03', 'Junior High', 'JHS 1 – 3', 'Excellence & Achievement', 'Core subjects, critical thinking, and BECE preparation for secondary success.',
   ARRAY['English Language & Literature', 'Mathematics & Integrated Science', 'ICT & Computing', 'Social & Civic Studies', 'BECE Examination Preparation'],
   'military_tech', '/images/students-teacher-outdoor.jpeg', 'border-primary', 'text-primary', 3, true)
ON CONFLICT DO NOTHING;

-- 5A. Editable page-section copy. Existing edits are preserved on reruns.
INSERT INTO public.page_sections (
  page_key, section_key, eyebrow, heading, body, secondary_body,
  image_url, cta_label, cta_href, is_published, display_order
)
VALUES
  ('home', 'hero', 'Kumasi · Ghana · Est. 2010', 'Every Child is Born a King. We Help Them Reign.', 'Brainy Kings and Queens Montessori — where independent thinking, royal character, and academic excellence converge from age 2.5 through JHS 3.', NULL, NULL, 'Apply for Admission', '/admissions', true, 1),
  ('home', 'mission', 'Our Philosophy', 'We don''t just teach children. We crown them.', 'The Montessori method recognises that children are natural learners — born with curiosity, dignity, and the capacity to lead. Our role is simply to prepare the environment and step aside.', NULL, NULL, NULL, NULL, true, 2),
  ('home', 'cta', 'Admissions Open', 'Secure Your Child''s Place Today', 'Enrolment for the upcoming academic year is now open. Join a community that believes every child deserves a royal education.', NULL, NULL, 'Apply Now', '/admissions', true, 3),
  ('about', 'hero', 'Est. 2010 · Kumasi, Ghana', 'We Crown Children. Not Just Educate Them.', 'For over 15 years, Brainy Kings & Queens Montessori has been Kumasi''s most trusted name in early childhood excellence — rooted in dignity, driven by curiosity.', '/images/students-large-group-photo.jpeg', 'Enrol Your Child', '/admissions', true, 1),
  ('about', 'story', 'Our Story', 'A School Built on a Simple Belief', 'Brainy Kings & Queens was founded on one conviction: that the children of Kumasi deserve an education worthy of their potential. The Montessori method gave us the framework — our community gave us the heart.', 'Over 15 years, we have grown from a small pre-school to a full primary school serving over 250 students, from ages 2.5 through JHS 3. But our promise remains unchanged: to see each child as the leader they already are.', '/images/students-cultural-day.jpeg', NULL, NULL, true, 2),
  ('about', 'cta', 'Admissions Open', 'Join Our Royal Community', 'Enrolment for the upcoming academic year is now open. Give your child the royal start they deserve.', NULL, NULL, 'Apply Now', '/admissions', true, 3),
  ('home', 'programs', 'Academic Programs', 'A Royal Path Through Every Stage', NULL, NULL, NULL, NULL, NULL, true, 4),
  ('home', 'gallery', 'Campus Life', 'Life at Brainy Kings & Queens', NULL, NULL, NULL, 'See more', '/about', true, 5),
  ('home', 'testimonials', 'What Parents Say', 'Stories from Our Royal Community', NULL, NULL, NULL, NULL, NULL, true, 6),
  ('about', 'values', 'Our Values', 'What We Stand For', NULL, NULL, NULL, NULL, NULL, true, 4),
  ('about', 'gallery', 'Campus Life', 'Life at Brainy Kings & Queens', NULL, NULL, NULL, NULL, NULL, true, 5),
  ('about', 'team', 'Our People', 'Meet the team', NULL, NULL, NULL, NULL, NULL, true, 6),
  ('curriculum', 'hero', 'Academic Programs', 'A Royal Path Through Every Stage', 'Our Montessori-inspired curriculum blends rigorous academic standards with the dignity of self-paced exploration — from age 2.5 through JHS 3.', '/images/school-building.jpeg', NULL, NULL, NULL, true, 1),
  ('curriculum', 'principles', 'The Brainy Way', 'Four Principles That Guide Every Lesson', 'A philosophy that respects the child as a natural learner. Every classroom decision flows from these four commitments.', NULL, NULL, NULL, NULL, true, 2),
  ('curriculum', 'quote', '— Maria Montessori', 'The child is both a hope and a promise for mankind.', 'This is the spirit that drives every lesson at Brainy Kings & Queens. We do not teach children what to think — we create the conditions for them to discover how to think.', '/images/students-classroom-primary.jpeg', NULL, NULL, true, 3),
  ('curriculum', 'cta', 'Start the Journey', 'Secure Your Child''s Place Today', 'Enrolment for the upcoming academic year is now open. Join a community that believes every child deserves a royal education.', NULL, NULL, 'Apply Now', '/admissions', true, 4),
  ('curriculum', 'programs', 'Curriculum Detail', 'What Your Child Will Learn', NULL, NULL, NULL, NULL, NULL, true, 5),
  ('admissions', 'hero', 'Admissions Open', 'Begin Your Child''s Royal Journey', 'A royal education starts with one step. Complete the inquiry form below and our team will reach out within 24 hours.', '/images/student-uniform-portrait.jpeg', NULL, NULL, NULL, true, 1),
  ('admissions', 'steps', 'How It Works', 'Four Steps to Enrolment', NULL, NULL, NULL, NULL, NULL, true, 2)
ON CONFLICT (page_key, section_key) DO NOTHING;

-- 6. Testimonials (from TestimonialsSection.tsx)
INSERT INTO testimonials (quote, name, role, display_order, is_published)
VALUES
  ('My daughter woke up one morning and said, ''Mum, I can''t wait to get to school.'' That told me everything I needed to know.', 'Abena K.', 'Parent · Pre-School', 1, true),
  ('The Montessori approach here is unlike anything I''ve seen elsewhere in Kumasi. The children learn to think, not just memorize facts.', 'Dr. Emmanuel O.', 'Parent · Lower Primary', 2, true),
  ('Watching our son grow into a confident, curious young man has been remarkable. Brainy Kings & Queens gave him that foundation.', 'Josephine M.', 'Parent · Upper Primary', 3, true)
ON CONFLICT DO NOTHING;

-- 7. Gallery Items (from home page - page.tsx)
-- Seed by gallery slot so reruns preserve admin edits and do not duplicate rows.
INSERT INTO public.gallery_items (
  page_key, row_index, column_index, image_url, alt_text, caption, display_order, is_published
)
SELECT seed.*
FROM (VALUES
  ('home', 0, 0, '/images/students-large-group-photo.jpeg', 'Our entire school community', 'Our school family', 1, true),
  ('home', 0, 1, '/images/students-uniform-badges.jpeg', 'Students proudly showing school badges', 'Royal pride', 2, true),
  ('home', 0, 2, '/images/students-teacher-outdoor.jpeg', 'Teacher with students outdoors', 'Mentorship', 3, true),
  ('home', 1, 0, '/images/student-field-trip-bench-2.jpeg', 'Young student at field trip', 'Field trip explorer', 1, true),
  ('home', 1, 1, '/images/students-preschool-twins-2.jpeg', 'Two pre-school girls in uniform', 'Our youngest royals', 2, true),
  ('home', 1, 2, '/images/student-field-trip-tree.jpeg', 'Student at field trip by large tree', 'Beyond the classroom', 3, true),
  ('home', 1, 3, '/images/students-cultural-day.jpeg', 'Cultural celebration day', 'Cultural day', 4, true),
  ('home', 2, 0, '/images/students-preschool-standing.jpeg', 'Pre-school students in uniform', 'Ready for the day', 1, true),
  ('home', 2, 1, '/images/students-classroom-fun.jpeg', 'Students enjoying classroom learning', 'Classroom joy', 2, true),
  ('home', 2, 2, '/images/students-preschool-lunch-group.jpeg', 'Pre-school students sharing lunch', 'Shared meals', 3, true),
  ('home', 3, 0, '/images/students-school-building-front.jpeg', 'Students in front of the Brainy Kings and Queens school building', 'Our Campus', 1, true),
  ('home', 3, 1, '/images/students-montessori-classroom.jpeg', 'Young students learning in the Montessori classroom', 'Learning Through Play', 2, true),
  ('about', 0, 0, '/images/students-group-pavilion.jpeg', 'Students at the school pavilion', 'The Pavilion', 1, true),
  ('about', 0, 1, '/images/students-preschool-cubbies.jpeg', 'Pre-school students organising their belongings', 'Practical Life', 2, true),
  ('about', 0, 2, '/images/students-preschool-lunch-closeup.jpeg', 'Pre-school children enjoying lunch at school', 'Nourished & Cared For', 3, true)
) AS seed(page_key, row_index, column_index, image_url, alt_text, caption, display_order, is_published)
WHERE NOT EXISTS (
  SELECT 1
  FROM public.gallery_items existing
  WHERE existing.page_key = seed.page_key
    AND existing.row_index = seed.row_index
    AND existing.column_index = seed.column_index
);

-- 8. Admissions Steps (from admissions/page.tsx)
INSERT INTO admissions_steps (number, icon, title, body, display_order, is_published)
VALUES
  ('01', 'edit_note', 'Submit Inquiry', 'Fill out the form below. Our admissions team reads every inquiry personally.', 1, true),
  ('02', 'fact_check', 'Assessment Visit', 'We invite your child for a relaxed, play-based assessment — no pressure, just observation.', 2, true),
  ('03', 'assignment', 'Application Review', 'Our team reviews your child''s profile and matches them with the right classroom environment.', 3, true),
  ('04', 'verified', 'Enrolment Confirmed', 'Receive your official acceptance letter and welcome pack from Brainy Kings & Queens.', 4, true)
ON CONFLICT DO NOTHING;

-- Note: For team members and blog posts, we'll leave them empty initially
-- and let admins create them through the CMS.