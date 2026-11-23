export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F7F3EA] text-[#17251F]">
      <div className="w-12 h-12 rounded-full border-4 border-[#EBE5D6] border-t-[#C64B24] animate-spin mb-4" />
      <p className="text-xs font-semibold text-[#17251F]/70 uppercase tracking-wider">
        Loading AMEPAC Stage...
      </p>
    </div>
  );
}
