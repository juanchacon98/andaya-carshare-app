// Formato de moneda para Bolívares (VES)
export function formatBs(value: number | null | undefined): string {
  if (value === null || value === undefined) return 'Bs 0,00';
  
  const formatted = new Intl.NumberFormat('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  
  return `Bs ${formatted}`;
}

// Normalizar teléfono venezolano a formato E.164 (+58XXXXXXXXXX)
export function normalizeVePhone(input: string | null | undefined): string | null {
  if (!input) return null;
  
  // Eliminar espacios, guiones y símbolos
  const cleaned = input.replace(/[\s\-\(\)\.]/g, '');
  
  // Intentar extraer los 10 dígitos después del código de país
  let digits = cleaned;
  
  // Si empieza con +58, quitar ese prefijo
  if (digits.startsWith('+58')) {
    digits = digits.substring(3);
  } else if (digits.startsWith('58')) {
    digits = digits.substring(2);
  } else if (digits.startsWith('0')) {
    // Si empieza con 0, quitar el 0 inicial
    digits = digits.substring(1);
  }
  
  // Validar que tenga exactamente 10 dígitos
  if (!/^\d{10}$/.test(digits)) {
    return null;
  }
  
  // Retornar en formato E.164
  return `+58${digits}`;
}

// DEPRECATED: Mantener solo para uso interno de admin
// No usar en UI de usuario final
export function formatUsd(value: number | null | undefined): string {
  if (value === null || value === undefined) return '$0.00';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// DEPRECATED: Mantener solo para uso interno de admin
export function formatEur(value: number | null | undefined): string {
  if (value === null || value === undefined) return '€0.00';
  
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// DEPRECATED: Mantener solo para uso interno de admin
export function convertTo(
  target: 'USD' | 'EUR' | 'VES',
  amount: number,
  rateValue: number,
  sourceCode: string = 'VES'
): number {
  if (target === sourceCode) return amount;
  
  if (target === 'VES') {
    return amount * rateValue;
  } else {
    return amount / rateValue;
  }
}