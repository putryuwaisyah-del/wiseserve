INSERT INTO menu_items (id, name, price, category, cost_to_produce, status)
VALUES
  (1, 'Chicken Rice', 6.50, 'Mains', 2.50, 'active'),
  (2, 'Nasi Lemak', 5.00, 'Mains', 1.80, 'active'),
  (3, 'Iced Lemon Tea', 2.50, 'Drinks', 0.60, 'active'),
  (4, 'Fruit Salad', 3.00, 'Snacks', 1.00, 'active')
ON CONFLICT (id) DO NOTHING;

INSERT INTO daily_records (menu_item_id, record_date, qty_prepared, qty_sold, qty_leftover)
VALUES
  (1, CURRENT_DATE - INTERVAL '2 days', 50, 45, 5),
  (2, CURRENT_DATE - INTERVAL '2 days', 40, 38, 2),
  (3, CURRENT_DATE - INTERVAL '2 days', 60, 55, 5),
  (1, CURRENT_DATE - INTERVAL '1 day', 50, 40, 10),
  (2, CURRENT_DATE - INTERVAL '1 day', 35, 30, 5),
  (3, CURRENT_DATE - INTERVAL '1 day', 60, 50, 10),
  (1, CURRENT_DATE, 50, 42, 8),
  (2, CURRENT_DATE, 30, 28, 2),
  (3, CURRENT_DATE, 40, 38, 2)
ON CONFLICT DO NOTHING;
