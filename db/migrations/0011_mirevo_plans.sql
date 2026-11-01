-- Rebrand to Mirevo: 12 packages (Bronze → VVIP), 40-day plans.
-- Existing rows are renamed in place by their old symbol so current holdings
-- keep pointing at the same share; the new 12th package (VVIP) is inserted.
update shares set name = v.name, symbol = v.symbol, description = v.descr,
       price = v.price, daily_earning = v.daily, tier = v.tier, display_order = v.ord
  from (values
    ('STK1',  'Bronze',    'BRZ',  'Mirevo Package',     4000,    1200,   'standard', 1),
    ('STK2',  'Silver',    'SLV',  'Mirevo Package',     8000,    2400,   'standard', 2),
    ('STK3',  'Gold',      'GLD',  'Mirevo Package',     12000,   3600,   'standard', 3),
    ('STK4',  'Platinum',  'PLT',  'Mirevo Package',     20000,   6000,   'standard', 4),
    ('STK5',  'Diamond',   'DIA',  'Mirevo Package',     40000,   12000,  'premium',  5),
    ('STK6',  'Premium',   'PRM',  'Mirevo Package',     60000,   18000,  'premium',  6),
    ('STK7',  'Ultimate',  'ULT',  'Mirevo Package',     80000,   24000,  'premium',  7),
    ('STK8',  'Elite',     'ELT',  'Mirevo Package',     100000,  30000,  'premium',  8),
    ('STK9',  'Master',    'MST',  'Mirevo Package',     200000,  60000,  'vip',      9),
    ('STK10', 'Executive', 'EXE',  'Mirevo Package',     300000,  90000,  'vip',      10),
    ('STK11', 'VIP',       'VIP',  'Mirevo VIP Package', 500000,  150000, 'vip',      11)
  ) as v(old_symbol, name, symbol, descr, price, daily, tier, ord)
 where shares.symbol = v.old_symbol;

insert into shares (name, symbol, description, price, daily_earning, tier, badge, status, display_order)
values ('VVIP', 'VVIP', 'Mirevo VIP Package', 1000000, 350000, 'vip', null, 'available', 12)
on conflict (symbol) do nothing;
