export default function FeatureCard({ icon: Icon, iconClass, title, description }) {
  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${iconClass}`}>
        <Icon size={28} />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </article>
  )
}