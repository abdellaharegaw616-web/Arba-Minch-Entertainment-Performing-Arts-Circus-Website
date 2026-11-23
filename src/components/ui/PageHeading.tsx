interface PageHeadingProps {
  badge?: string;
  title: string;
  description?: string;
}

export function PageHeading({ badge, title, description }: PageHeadingProps) {
  return (
    <section className="bg-[#17251F] text-[#F7F3EA] py-14 sm:py-16 border-b border-[#23382F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          {badge && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#23382F] text-[#D6A84F] text-xs font-bold uppercase tracking-wider border border-[#D6A84F]/30">
              {badge}
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F7F3EA]">
            {title}
          </h1>
          {description && (
            <p className="text-sm sm:text-base text-[#F7F3EA]/80 leading-relaxed font-light">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
