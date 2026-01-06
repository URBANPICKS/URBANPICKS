interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-8 text-center md:text-left">
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
          <div className="h-1 w-12 bg-[#D4AF37] rounded-full"></div>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>
      )}
    </div>
  );
}
