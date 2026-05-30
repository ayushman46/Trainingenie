import { PAST_TRAININGS } from "@/data";

export function PastTrainingsCarousel() {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6">
      {/* Native horizontal scrolling container */}
      <div className="flex overflow-x-auto pb-12 pt-4 snap-x snap-mandatory gap-5 sm:gap-6 no-scrollbar">
        {PAST_TRAININGS.map((training) => (
          /* Added flex-none and absolute widths to prevent stretching */
          <div
            key={training.id}
            className="snap-start flex-none w-[280px] sm:w-[300px] md:w-[320px]"
          >
            {/* Standardized height to 380px to match target design */}
            <div className="h-[380px] bg-white rounded-3xl shadow-[0_8px_24px_rgb(0,0,0,0.04)] border border-[#f0f4f1] overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-[0_12px_32px_rgb(0,0,0,0.08)] hover:-translate-y-1">
              {/* Image Section */}
              <div className="relative h-[50%] overflow-hidden bg-muted shrink-0">
                <img
                  src={training.image}
                  alt={training.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                {/* Completed Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#0b2818]/80 backdrop-blur-md text-white text-[10px] font-bold rounded-full border border-white/10 shadow-sm">
                  {training.status}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-5 flex flex-col flex-grow bg-white">
                <h3 className="text-base sm:text-lg font-bold tracking-tight mb-3 text-[#1a3a28] leading-snug group-hover:text-[#2d4a36] transition-colors line-clamp-2">
                  {training.title}
                </h3>
                <div className="mt-auto flex flex-wrap gap-2">
                  {training.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-[#f0f4f1] text-[#596d60] text-[10px] font-bold tracking-wide rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}