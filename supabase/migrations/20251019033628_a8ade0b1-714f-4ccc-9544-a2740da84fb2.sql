-- Forzar moneda VES (Bolívares) en toda la plataforma

-- 1. Actualizar tabla vehicles: currency = 'VES' por defecto
ALTER TABLE public.vehicles 
  ALTER COLUMN currency SET DEFAULT 'VES';

-- Agregar constraint para validar que currency sea siempre 'VES'
ALTER TABLE public.vehicles 
  DROP CONSTRAINT IF EXISTS vehicles_currency_ves_check;

ALTER TABLE public.vehicles 
  ADD CONSTRAINT vehicles_currency_ves_check 
  CHECK (currency = 'VES');

-- Actualizar vehículos existentes a VES
UPDATE public.vehicles 
SET currency = 'VES' 
WHERE currency IS NULL OR currency != 'VES';

-- 2. Actualizar tabla payments: currency = 'VES' por defecto
-- Nota: La tabla payments usa 'COP' como default actual, cambiar a 'VES'
ALTER TABLE public.payments 
  ALTER COLUMN currency SET DEFAULT 'VES';

-- Constraint para payments
ALTER TABLE public.payments 
  DROP CONSTRAINT IF EXISTS payments_currency_ves_check;

ALTER TABLE public.payments 
  ADD CONSTRAINT payments_currency_ves_check 
  CHECK (currency = 'VES');

-- Actualizar pagos existentes a VES (si hay alguno con otra moneda)
UPDATE public.payments 
SET currency = 'VES' 
WHERE currency IS NULL OR currency != 'VES';

-- 3. Comentarios para documentar el cambio
COMMENT ON COLUMN public.vehicles.currency IS 'Moneda del vehículo. Siempre VES (Bolívares). No modificar.';
COMMENT ON COLUMN public.payments.currency IS 'Moneda del pago. Siempre VES (Bolívares). No modificar.';