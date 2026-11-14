const email = import.meta.env.VITE_SUPPORT_EMAIL

// null kalau belum diisi atau formatnya salah, jadi tidak ada tautan mailto yang rusak
export const SUPPORT_EMAIL =
  typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null