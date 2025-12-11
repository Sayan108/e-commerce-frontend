import { useEffect, useState } from "react";
import { Video } from "@/lib/redux/types/dashboard.types";
import { Button } from "../ui/button";

interface MarketingVideoProps {
  videos: Video[];
  loading: boolean;
}

export function MarketingVideo({ videos, loading }: MarketingVideoProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ AUTO SLIDE
  useEffect(() => {
    if (!videos || videos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [videos]);

  if (loading) {
    return (
      <section className="bg-muted py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <div className="h-10 w-64 mx-auto bg-muted-foreground/20 rounded mb-4 animate-pulse" />
          <div className="mt-8 aspect-video max-w-4xl mx-auto rounded-lg bg-muted-foreground/20 animate-pulse" />
        </div>
      </section>
    );
  }

  if (!videos.length) return null;

  const currentVideo = videos[currentIndex];

  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Experience Our Style
        </h2>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Watch our latest collection in action and get inspired by the trends
          that are defining the season.
        </p>

        {/* ✅ VIDEO SLIDER */}
        <div className="relative mt-8 aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
          <video
            key={currentVideo.videolink} // forces reload on change
            className="w-full h-full object-cover"
            // src={currentVideo.videolink}
            poster={currentVideo.thumbnail}
            autoPlay
            loop
            muted
            playsInline
          />

          {/* ✅ SLIDER CONTROLS */}
          <button
            onClick={() =>
              setCurrentIndex((prev) =>
                prev === 0 ? videos.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-full"
          >
            ‹
          </button>

          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % videos.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-full"
          >
            ›
          </button>
        </div>

        {/* ✅ VIDEO TITLE + DESC */}
        <div className="mt-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold">{currentVideo.title}</h3>
          <p className="mt-2 text-muted-foreground">
            {currentVideo.description}
          </p>
        </div>

        {/* ✅ CTA */}
        <div className="mt-8">
          <Button size="lg">Shop The Collection</Button>
        </div>
      </div>
    </section>
  );
}
