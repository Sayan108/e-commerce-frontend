import { Button } from "../ui/button";

export function MarketingVideo() {
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
        <div className="mt-8 aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
          <video
            className="w-full h-full object-cover"
            src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
            poster="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop"
            controls
            loop
            muted
            playsInline
          />
        </div>
        <div className="mt-8">
            <Button size="lg">Shop The Collection</Button>
        </div>
      </div>
    </section>
  );
}
