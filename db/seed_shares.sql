-- ─────────────────────────────────────────────────────────────────────
-- MIREVO PACKAGES SEED. Run with:  npm run db:seed
-- Idempotent (keyed on symbol): edit a price here and re-run to update it.
--
-- tier:   'standard' | 'premium' | 'vip'
-- status: 'available' | 'sold_out' | 'coming_soon' | 'hidden'
-- badge:  optional short label shown next to the name, e.g. 'Popular'
--
-- Each package runs for 40 days (see PLAN_DURATION_DAYS in src/lib/config.ts).
-- Tiers below are a default split and can be changed freely.
-- ─────────────────────────────────────────────────────────────────────

insert into public.shares (name, symbol, description, price, daily_earning, tier, badge, status, display_order)
values
  ('Bronze',    'BRZ',  'Mirevo Package',     4000,    1200,   'standard', null, 'available', 1),
  ('Silver',    'SLV',  'Mirevo Package',     8000,    2400,   'standard', null, 'available', 2),
  ('Gold',      'GLD',  'Mirevo Package',     12000,   3600,   'standard', null, 'available', 3),
  ('Platinum',  'PLT',  'Mirevo Package',     20000,   6000,   'standard', null, 'available', 4),
  ('Diamond',   'DIA',  'Mirevo Package',     40000,   12000,  'premium',  null, 'available', 5),
  ('Premium',   'PRM',  'Mirevo Package',     60000,   18000,  'premium',  null, 'available', 6),
  ('Ultimate',  'ULT',  'Mirevo Package',     80000,   24000,  'premium',  null, 'available', 7),
  ('Elite',     'ELT',  'Mirevo Package',     100000,  30000,  'premium',  null, 'available', 8),
  ('Master',    'MST',  'Mirevo Package',     200000,  60000,  'vip',      null, 'available', 9),
  ('Executive', 'EXE',  'Mirevo Package',     300000,  90000,  'vip',      null, 'available', 10),
  ('VIP',       'VIP',  'Mirevo VIP Package', 500000,  150000, 'vip',      null, 'available', 11),
  ('VVIP',      'VVIP', 'Mirevo VIP Package', 1000000, 350000, 'vip',      null, 'available', 12)
on conflict (symbol) do update set
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  daily_earning = excluded.daily_earning,
  tier = excluded.tier,
  badge = excluded.badge,
  status = excluded.status,
  display_order = excluded.display_order;
