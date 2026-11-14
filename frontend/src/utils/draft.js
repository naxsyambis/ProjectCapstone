export function loadDraft(key) {
  try {
    return JSON.parse(sessionStorage.getItem(key)) ?? {}
  } catch {
    return {}
  }
}

export function saveDraft(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch {
    // penyimpanan diblokir atau penuh: abaikan, aplikasi tetap jalan
  }
}

export function clearDraft(key) {
  try {
    sessionStorage.removeItem(key)
  } catch {
    // abaikan
  }
}