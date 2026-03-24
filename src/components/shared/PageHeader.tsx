interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

export function PageHeader({ eyebrow, title, description, className = "" }: PageHeaderProps) {
  return (
    <section className={`bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-20 lg:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-secondary-400 font-semibold text-sm uppercase tracking-wider mb-3">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display font-bold text-4xl lg:text-5xl xl:text-6xl leading-tight mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-white/80 text-lg leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </section>
  )
}
