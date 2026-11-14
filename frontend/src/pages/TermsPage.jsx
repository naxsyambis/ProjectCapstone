import PageLayout from '../layouts/PageLayout'
import LegalDocument from '../components/legal/LegalDocument'
import { TERMS, TANGGAL_PEMBARUAN } from '../content/legal'

export default function TermsPage() {
  return (
    <PageLayout>
      <LegalDocument
        judul="Ketentuan Layanan"
        pembaruan={TANGGAL_PEMBARUAN}
        pengantar={TERMS.pengantar}
        bagian={TERMS.bagian}
      />
    </PageLayout>
  )
}