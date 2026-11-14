import ReactMarkdown from 'react-markdown'

const styled = (Tag, className) =>
  function Styled({ children }) {
    return <Tag className={className}>{children}</Tag>
  }

const components = {
  h2: styled('h2', 'mt-8 text-xl font-bold text-slate-900'),
  h3: styled('h3', 'mt-6 text-lg font-semibold text-slate-900'),
  p: styled('p', 'mt-4 text-[17px] leading-relaxed text-slate-700'),
  strong: styled('strong', 'font-semibold text-slate-900'),
  ul: styled('ul', 'mt-4 list-disc space-y-3 pl-6 text-[17px] leading-relaxed text-slate-700'),
  ol: styled('ol', 'mt-4 list-decimal space-y-3 pl-6 text-[17px] leading-relaxed text-slate-700'),
  blockquote: styled(
    'blockquote',
    'mt-6 rounded-r-xl border-l-4 border-brand-600 bg-brand-50 px-5 py-4 italic [&>p]:mt-0 [&>p]:text-brand-700',
  ),
  a: function Tautan({ href, children }) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-600 underline">
        {children}
      </a>
    )
  },
}

export default function ArticleBody({ markdown }) {
  return (
    <div className="mt-2">
      <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
    </div>
  )
}