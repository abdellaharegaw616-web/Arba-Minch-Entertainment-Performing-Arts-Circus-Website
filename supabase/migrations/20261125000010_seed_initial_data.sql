-- Migration 000010: Initial Seed Data with Verified Client Information
-- Description: Seeds verified troupes, 16 artists (preserving Melat Muluken's multi-troupe membership),
-- services, events, milestones, impact stories, and official organization contacts.

-- 1. Site Settings Seed
insert into public.site_settings (
    key,
    organization_name,
    parent_organization_name,
    circus_established_year,
    parent_org_registered_date,
    physical_location,
    primary_phone,
    primary_email,
    social_links,
    meta_description
) values (
    'general',
    'Arba Minch Entertainment Performing Arts & Circus (AMEPAC)',
    'Building Tomorrow Integrated Youth & Community Development Organization',
    2011,
    'November 2022',
    'Mehal Ketema Kebele, Nech Sar Sub-city, Arba Minch, South Ethiopia, Ethiopia',
    '+251-913-949-209',
    'Arbaminch.circus@gmail.com',
    '{"telegram": "@arbaminchcircus", "facebook": "ArbaMinchCircus", "youtube": "AMEPACLive"}'::jsonb,
    'Official website of AMEPAC Arba Minch circus and performing arts group, established 2011.'
) on conflict (key) do update set
    primary_phone = excluded.primary_phone,
    primary_email = excluded.primary_email,
    physical_location = excluded.physical_location,
    updated_at = timezone('utc'::text, now());

-- 2. Troupes Seed
insert into public.troupes (id, slug, name, sub_title, members_count, description, acts, featured_image, is_featured, order_index, is_published)
values
(
    '00000000-0000-0000-0000-000000000001',
    'troupe-black-lioness',
    'Troupe Black Lioness',
    'All-Female Power, Balance & Antipode Artistry',
    4,
    'A dynamic all-female troupe defying convention through remarkable physical strength, poetic elegance, and fearless balance. Renowned for their trio equilibria, multi-ring hula hoop mastery, and rare antipode (foot-juggling) choreography.',
    array['Trio Balance Equilibrium', 'Hula Hoop Choreography', 'Dynamic Acrobatic Stacking', 'Antipode (Foot Juggling)', 'Expressive Dance Fusion'],
    '/images/troupe_black_lioness.png',
    true,
    1,
    true
),
(
    '00000000-0000-0000-0000-000000000002',
    'yoga-brothers',
    'Arba Minch Yoga Brothers',
    'Extreme Contortion & Hyper-Flexibility Duo',
    2,
    'Samuel Filto and Dagmawi Babena form this globally celebrated duo known as the ''Yoga Brothers''. Their acts feature extreme front and back bending, shoulder dislocations, and astonishing spinal flexibility that astound audiences and redefine human biomechanics.',
    array['Extreme Front & Back Bending', 'Joint Articulation & Dislocation', 'Neck & Torso Twisting', 'Synchronized Duo Contortion'],
    '/images/troupe_yoga_brothers.png',
    true,
    2,
    true
),
(
    '00000000-0000-0000-0000-000000000003',
    'troupe-gamo-bayira',
    'Troupe Gamo Bayira',
    'High-Energy Acrobatics, Chinese Pole & Object Manipulation',
    5,
    'Honoring the highland spirit of Gamo, this 5-artist ensemble delivers electrifying aerial hoop dives, precision hat and club juggling, Chinese pole ascents, and synchronized geometric cube routines.',
    array['Hoop Diving', 'Chinese Pole', 'Acrobatic Human Pyramid', 'Geometric Cube Manipulation', 'Club Juggling', 'Traditional Hat Juggling'],
    '/images/troupe_gamo_bayira.png',
    true,
    3,
    true
),
(
    '00000000-0000-0000-0000-000000000004',
    'troupe-african-pride',
    'Troupe African Pride',
    'Dynamic 8-Performer Acrobatics & Aerial Feats',
    8,
    'A flagship powerhouse troupe comprising 8 seasoned circus performers. Their signature spectacles blend breathtaking physical courage with rhythmic Ethiopian stage presence, executing high-voltage banquine tosses, Cyr wheel fluidity, and multi-tier human pyramids.',
    array['Hand Voltage / Banquine', 'Cyr Wheel', 'Acrobatic Human Pyramid', 'Free Ladder', 'Rola Bola Balancing', 'Hand to Hand Equilibrium'],
    '/images/circus_performance_1.png',
    true,
    4,
    true
),
(
    '00000000-0000-0000-0000-000000000005',
    'kefeni-queen-of-gamo',
    'Kefeni — Queen of Gamo',
    'World-Class Solo Contortionist',
    1,
    'Kefeni Teshome discovered circus arts at an early age in Arba Minch. Through relentless discipline, she has transformed into one of the country''s most celebrated solo contortionists, performing mesmerizing balance pedestals, scorpion backbends, and poignant emotive solos.',
    array['Solo Pedestal Contortion', 'Scorpion Backbend Architecture', 'Extreme Flexibility Equilibrium', 'Ethereal Storytelling Movement'],
    '/images/circus_performance_2.png',
    true,
    5,
    true
)
on conflict (slug) do update set
    name = excluded.name,
    sub_title = excluded.sub_title,
    description = excluded.description,
    acts = excluded.acts,
    featured_image = excluded.featured_image,
    is_featured = excluded.is_featured,
    order_index = excluded.order_index;

-- 3. Unique Artists Seed (All 16 Performer Profiles)
insert into public.artists (id, slug, full_name, stage_name, bio, disciplines, photo_url, is_coach)
values
('10000000-0000-0000-0000-000000000001', 'samuel-filto', 'Samuel Filto', 'Yoga Brother Samuel', 'Professional extreme contortionist and founding duo member of Arba Minch Yoga Brothers.', array['Extreme Front & Back Bending', 'Joint Dislocation', 'Equilibrium'], '/images/troupe_yoga_brothers.png', false),
('10000000-0000-0000-0000-000000000002', 'dagmawi-babena', 'Dagmawi Babena', 'Yoga Brother Dagmawi', 'Professional extreme contortionist and hyper-flexibility performer.', array['Extreme Front & Back Bending', 'Joint Dislocation', 'Torso Twisting'], '/images/troupe_yoga_brothers.png', false),
('10000000-0000-0000-0000-000000000003', 'kefeni-teshome', 'Kefeni Teshome', 'Queen of Gamo', 'World-class solo contortionist trained in Arba Minch from early childhood.', array['Solo Pedestal Contortion', 'Scorpion Backbends', 'Flexibility Equilibrium'], '/images/circus_performance_2.png', false),
('10000000-0000-0000-0000-000000000004', 'rehobot-abreham', 'Rehobot Abreham', null, 'Professional acrobat and Chinese pole specialist in Troupe Gamo Bayira.', array['Chinese Pole', 'Acrobatic Human Pyramid'], '/images/troupe_gamo_bayira.png', false),
('10000000-0000-0000-0000-000000000005', 'temesgen-daniel', 'Temesgen Daniel', 'Skanche', 'Senior acrobat and precision hat juggler.', array['Traditional Hat Juggling', 'Hoop Diving', 'Acrobatic Pyramid'], '/images/troupe_gamo_bayira.png', false),
('10000000-0000-0000-0000-000000000006', 'fasika-shewa', 'Fasika Shewa', null, 'Professional acrobat and geometric cube manipulator.', array['Geometric Cube Manipulation', 'Club Juggling'], '/images/troupe_gamo_bayira.png', false),
('10000000-0000-0000-0000-000000000007', 'mintesinot-geremew', 'Mintesinot Geremew', null, 'High-energy hoop diver and tumbler in Troupe Gamo Bayira.', array['Hoop Diving', 'Acrobatic Stacking'], '/images/troupe_gamo_bayira.png', false),
('10000000-0000-0000-0000-000000000008', 'biniam-degu', 'Biniam Degu', null, 'Precision club and object juggler.', array['Club Juggling', 'Chinese Pole Assist'], '/images/troupe_gamo_bayira.png', false),
('10000000-0000-0000-0000-000000000009', 'sintayehu-adimasu', 'Sintayehu Adimasu', null, 'Lead base and banquine powerhouse in Troupe African Pride.', array['Hand Voltage / Banquine', 'Human Pyramid', 'Hand to Hand'], '/images/circus_performance_1.png', false),
('10000000-0000-0000-0000-000000000010', 'cherinet-tomas', 'Cherinet Tomas', null, 'Senior acrobat and Cyr wheel specialist.', array['Cyr Wheel', 'Banquine Tosses'], '/images/circus_performance_1.png', false),
('10000000-0000-0000-0000-000000000011', 'desta-teshome', 'Desta Teshome', null, 'Equilibrium and free ladder acrobat.', array['Free Ladder', 'Rola Bola Balancing'], '/images/circus_performance_1.png', false),
('10000000-0000-0000-0000-000000000012', 'abiot-ayele', 'Abiot Ayele', null, 'Senior flyer and acrobat in high-voltage launches.', array['Hand Voltage Flyer', 'Pyramid Apex'], '/images/circus_performance_1.png', false),
('10000000-0000-0000-0000-000000000013', 'ashenafi-ayele', 'Ashenafi Ayele', null, 'Middle and base balancer in human pyramids.', array['Acrobatic Pyramid', 'Hand to Hand'], '/images/circus_performance_1.png', false),
('10000000-0000-0000-0000-000000000014', 'daniel-eyassu', 'Daniel Eyassu', null, 'Rola bola and balance equilibrium artist.', array['Rola Bola Balancing', 'Banquine Base'], '/images/circus_performance_1.png', false),
('10000000-0000-0000-0000-000000000015', 'tamirat-hamesa', 'Tamirat Hamesa', null, 'Hand to hand equilibrium acrobat.', array['Hand to Hand Equilibrium', 'Pyramid'], '/images/circus_performance_1.png', false),
('10000000-0000-0000-0000-000000000016', 'melat-muluken', 'Melat Muluken', null, 'Versatile acrobat and antipode artist performing in both Troupe African Pride and Troupe Black Lioness.', array['Hand Voltage Flyer', 'Antipode (Foot Juggling)', 'Trio Balance Equilibrium'], '/images/troupe_black_lioness.png', false),
('10000000-0000-0000-0000-000000000017', 'bilen-mala', 'Bilen Mala', null, 'All-female troupe lead and trio balance artist.', array['Trio Balance Equilibrium', 'Dynamic Stacking'], '/images/troupe_black_lioness.png', false),
('10000000-0000-0000-0000-000000000018', 'lemlem-hareru', 'Lemlem Hareru', null, 'Multi-ring hula hoop soloist and acrobat.', array['Hula Hoop Choreography', 'Expressive Dance'], '/images/troupe_black_lioness.png', false),
('10000000-0000-0000-0000-000000000019', 'dibora-getachew', 'Dibora Getachew', null, 'Antipode foot-juggling and balance artist.', array['Antipode (Foot Juggling)', 'Trio Balance'], '/images/troupe_black_lioness.png', false)
on conflict (slug) do update set
    full_name = excluded.full_name,
    disciplines = excluded.disciplines,
    bio = excluded.bio;

-- 4. Troupe Members (Preserves Melat Muluken in BOTH African Pride and Black Lioness)
insert into public.troupe_members (troupe_id, artist_id, role_in_troupe, is_lead, order_index)
values
-- Yoga Brothers (2 members)
('00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Co-Founder / Contortionist', true, 1),
('00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'Co-Founder / Contortionist', false, 2),

-- Kefeni - Queen of Gamo (1 solo member)
('00000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000003', 'Solo Contortionist', true, 1),

-- Troupe Gamo Bayira (5 members)
('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000004', 'Lead Acrobat', true, 1),
('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000005', 'Senior Juggler', false, 2),
('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000006', 'Acrobat & Cube Manipulator', false, 3),
('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000007', 'Hoop Diver & Tumbler', false, 4),
('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000008', 'Juggler & Acrobat', false, 5),

-- Troupe African Pride (8 members)
('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000009', 'Lead Base / Banquine', true, 1),
('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000010', 'Cyr Wheel Specialist', false, 2),
('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000011', 'Equilibrium & Free Ladder', false, 3),
('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000012', 'Senior Flyer', false, 4),
('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000013', 'Middle Balancer', false, 5),
('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000014', 'Rola Bola Artist', false, 6),
('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000015', 'Hand to Hand Equilibrium', false, 7),
('00000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000016', 'Flyer & Acrobatic Artist', false, 8),

-- Troupe Black Lioness (4 members, including Melat Muluken)
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000017', 'Lead Artist / Trio Balance', true, 1),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000018', 'Hula Hoop Soloist', false, 2),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000019', 'Antipode Artist', false, 3),
('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000016', 'Antipode & Balance Acrobat', false, 4)
on conflict (troupe_id, artist_id) do nothing;

-- 5. Fundraising Campaigns Seed
insert into public.fundraising_campaigns (slug, title, goal_amount, currency, summary, description, target_use, external_donation_url, is_active, is_featured)
values (
    'training-hall-roof-restoration',
    'Emergency Training Hall Roof & Safety Matting Restoration',
    15000.00,
    'USD',
    'Help us waterproof our makeshift rehearsal shed and install professional impact gymnastics mats for 80+ practicing youth.',
    'During the heavy rainy seasons in Arba Minch, rain floods our makeshift rehearsal hall with severe roof leaks onto bare soil floors. Our trainees risk head injuries and slipping on wet ground while practicing high banquine launches and acrobatics. Donations directly fund corrugated iron roofing, timber trusses, and shock-absorbing gymnastics crash mats.',
    'Corrugated iron roofing, structural timber, waterproof sealing, and 12 FIG-standard gymnastics landing mats.',
    null,
    true,
    true
) on conflict (slug) do nothing;
