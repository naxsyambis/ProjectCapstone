import PageLayout from '../layouts/PageLayout'
import LegalDocument from '../components/legal/LegalDocument'
import { PRIVACY, TANGGAL_PEMBARUAN } from '../content/legal'

export default function PrivacyPolicyPage() {
  return (
    <PageLayout>
      <LegalDocument
        judul="Kebijakan Privasi"
        pembaruan={TANGGAL_PEMBARUAN}
        pengantar={PRIVACY.pengantar}
        bagian={PRIVACY.bagian}
      />
    </PageLayout>
  )
}