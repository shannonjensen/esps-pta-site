-- DEMO DATA: simulates the ride being ~25 km in (just past 25 pings,
-- one per km along the real route, latest ping = right now so the page shows LIVE).
-- Run in the Supabase SQL editor. To clear afterwards:  delete from ride_locations;

delete from ride_locations;  -- start clean

insert into ride_locations (lat, lng, accuracy_m, speed_kmh, battery, recorded_at) values
  (51.46504, -0.2487, 8, 16.0, 95, now() - interval '75.0 minutes'),
  (51.46717, -0.23469, 8, 20.9, 95, now() - interval '72.0 minutes'),
  (51.4674, -0.21982, 8, 14.0, 94, now() - interval '68.7 minutes'),
  (51.46943, -0.20882, 8, 11.7, 94, now() - interval '65.7 minutes'),
  (51.47408, -0.19608, 8, 19.5, 94, now() - interval '62.5 minutes'),
  (51.4796, -0.18696, 8, 19.7, 93, now() - interval '59.8 minutes'),
  (51.48174, -0.17571, 8, 12.2, 93, now() - interval '56.9 minutes'),
  (51.48391, -0.16253, 8, 13.0, 93, now() - interval '53.9 minutes'),
  (51.48583, -0.14868, 8, 20.3, 93, now() - interval '51.0 minutes'),
  (51.48583, -0.13414, 8, 17.6, 92, now() - interval '47.9 minutes'),
  (51.49199, -0.12554, 8, 11.2, 92, now() - interval '45.0 minutes'),
  (51.50035, -0.12742, 8, 15.3, 92, now() - interval '42.0 minutes'),
  (51.50802, -0.12104, 8, 20.9, 91, now() - interval '38.6 minutes'),
  (51.51096, -0.11012, 8, 15.4, 91, now() - interval '36.0 minutes'),
  (51.5113, -0.09638, 8, 11.1, 91, now() - interval '33.0 minutes'),
  (51.51411, -0.08386, 8, 18.8, 90, now() - interval '29.6 minutes'),
  (51.51916, -0.07944, 8, 20.4, 90, now() - interval '27.0 minutes'),
  (51.52828, -0.07795, 8, 12.6, 90, now() - interval '23.8 minutes'),
  (51.53661, -0.07687, 8, 12.4, 90, now() - interval '21.0 minutes'),
  (51.546, -0.07568, 8, 20.1, 89, now() - interval '17.8 minutes'),
  (51.54829, -0.06363, 8, 18.3, 89, now() - interval '14.8 minutes'),
  (51.55557, -0.05682, 8, 11.2, 89, now() - interval '11.8 minutes'),
  (51.56077, -0.04909, 8, 15.1, 88, now() - interval '8.8 minutes'),
  (51.56606, -0.03664, 8, 21.0, 88, now() - interval '5.6 minutes'),
  (51.57023, -0.02566, 8, 16.1, 88, now() - interval '3.0 minutes');
