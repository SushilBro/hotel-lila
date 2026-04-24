insert into public.rooms (slug,title,summary,description,price_per_night,max_guests,is_published,featured)
values
  ('deluxe-mountain','Deluxe Mountain Room','Mountain-facing comfort for couples and small families.','Spacious room with warm interiors, modern bedding, and clear mountain and valley views inspired by the calm vibe around Methlang.',6800,3,true,true),
  ('family-comfort','Family Comfort Room','Flexible setup for family-friendly stays.','Designed for family trips with extra space, practical storage, and a peaceful environment after a day around Pokhara.',8200,5,true,true),
  ('premium-suite','Premium Suite','Premium comfort for longer relaxing stays.','Our best suite with separate seating, premium amenities, and a quiet setting suitable for both leisure and work trips.',11000,4,true,true)
on conflict (slug) do nothing;

insert into public.room_images (room_id,image_url,caption,category,sort_order)
select r.id, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80', 'Cozy premium room interior', 'room', 1 from public.rooms r where r.slug='deluxe-mountain'
union all
select r.id, 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80', 'Family room setup', 'room', 2 from public.rooms r where r.slug='family-comfort'
union all
select r.id, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80', 'Lounge in suite room', 'room', 3 from public.rooms r where r.slug='premium-suite';

insert into public.amenities (title, icon, description, sort_order, is_published)
values
  ('Free WiFi','wifi','Reliable high-speed internet for all guests.',1,true),
  ('Mountain Views','mountain','Panoramic hill and valley outlook inspired by Methlang landscape.',2,true),
  ('Family Support','users','Helpful staff and room options for family-friendly stays.',3,true),
  ('Airport/Local Pickup','car','Convenient transport coordination on request.',4,true)
on conflict do nothing;

insert into public.testimonials (guest_name,quote,rating,is_published)
values
  ('Ritika Karki','Warm service, clean rooms, and peaceful nights. Perfect for our Pokhara trip.',5,true),
  ('Suman Thapa','Loved the hospitality and quiet location feel near the hills.',5,true),
  ('Anita Gurung','Great for family stay, and staff gave us useful local recommendations.',5,true)
on conflict do nothing;

insert into public.offers (title,description,price_hint,is_active)
values
  ('Family Weekend Package','Two-night family package with breakfast and guided local tips.', 'From NPR 15,500', true),
  ('Adventure + Relax Stay','Stay plus curated recommendations for Pokhara adventure activities.', 'From NPR 12,000', true)
on conflict do nothing;

insert into public.site_settings (key, value)
values
  ('hero_title','Experience peaceful premium comfort in Pokhara'),
  ('hero_subtitle','HotelLilaIn blends modern comfort with warm Nepali hospitality in a nature-connected setting near Methlang.'),
  ('feature_show_offers','true'),
  ('feature_show_testimonials','true'),
  ('faq_1','faq|What is check-in time?|Check-in is from 2 PM, and early check-in can be requested based on availability.'),
  ('faq_2','faq|Do you support family stays?|Yes, HotelLilaIn is family-friendly with flexible room options.'),
  ('faq_3','faq|How far is the hotel from major attractions?|Phewa Lake and key Pokhara highlights are easily accessible.')
on conflict (key) do update set value = excluded.value;

insert into public.seo_pages (page_key,title,description,canonical)
values
  ('home','HotelLilaIn | Peaceful Premium Stay in Pokhara','Stay at HotelLilaIn for premium comfort, warm hospitality, and easy access to Pokhara highlights and Methlang hills.','https://hotellilain.com'),
  ('rooms','Rooms | HotelLilaIn Pokhara','Browse cozy and premium rooms designed for comfort and family-friendly stays in Pokhara.','https://hotellilain.com/rooms'),
  ('gallery','Gallery | HotelLilaIn','See rooms, amenities, and the local atmosphere around Pokhara and Methlang.','https://hotellilain.com/gallery'),
  ('about','About | HotelLilaIn','Learn about HotelLilaIn and owner Sushil Gautam''s warm hospitality mission.','https://hotellilain.com/about'),
  ('offers','Offers | HotelLilaIn','Explore active stay packages and seasonal offers at HotelLilaIn.','https://hotellilain.com/offers'),
  ('faq','FAQ | HotelLilaIn','Get quick answers about bookings, amenities, and local stay details.','https://hotellilain.com/faq'),
  ('contact','Contact | HotelLilaIn','Send an inquiry and connect directly with HotelLilaIn in Pokhara.','https://hotellilain.com/contact')
on conflict (page_key) do update set
  title = excluded.title,
  description = excluded.description,
  canonical = excluded.canonical;
