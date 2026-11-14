// MOCK: hilang saat halaman di-refresh. Hapus bersama file api/ mock lainnya saat tersambung ke backend.
export const mockProgress = {
  materiSelesai: new Set(),
  kuisCoba: new Set(),
  kuisLulus: new Set(),
}

export const mockScreening = new Map() // id_bayi -> hasil screening terakhir