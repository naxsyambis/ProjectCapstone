export function namaSapaan(user) {
  return user?.nama_panggilan || (user?.nama_lengkap ?? '').split(' ')[0] || ''
}