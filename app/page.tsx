import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { getFeaturedPosts } from "@/lib/mdx";
import ProblemCards from "@/components/ProblemCards"
import FAQHome from "@/components/FAQHome";
import { Footer } from "@/components/Footer";
import YouTubeHomeEmbed from "@/components/YouTubeHomeEmbed";
import HeroEclipse from "@/components/HeroEclipse";
import PersonalizationCarousel from "@/components/PersonalizationCarousel";
import { Testimonial } from "@/components/Testimonial";
import PricingTable from "@/components/PricingTable";
import CaseStudiesSection from "@/components/CaseStudies";
import NSDRBenefits from "@/components/NSDRBenefits";
import StartNowButton from "@/components/StartNowButton";
export default async function Home() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <div className="bg-black">
      <HeroEclipse />

      {/* The Challenge Section */}
      <section className="w-full max-w-4xl mx-auto px-6 md:px-4 my-24">
        <div className="text-left max-w-md mt-32 lg:mt-64">
          <div className="text-red-500 font-mono text-xs mb-3">THE ISSUE</div>
          <h2 className="text-3xl font-host font-regular mb-2">
            Rest isn&apos;t resetting your overworked brain
          </h2>
          <p className="text-muted-foreground font-host text-lg">
            Doom scrolling is preventing our brain to relax.
          </p>

        </div>
        {/* Problem Cards */}
        <ProblemCards />
      </section>

      {/* Solution Section */}
      <section className="w-full max-w-4xl mx-auto px-6 md:px-4 my-24">
        <div className="text-left max-w-md mt-32 lg:mt-64">
          <div className="text-selection-text font-mono text-xs mb-3">THE SOLUTION</div>
          <h2 className="text-3xl font-host font-regular mb-2">
            Turn off your brain with AI for a few minutes
          </h2>
          <p className="text-muted-foreground font-host text-lg">
            Meditation meets technology to help us achieve real rest.
          </p>
        </div>
        <PersonalizationCarousel />
        <div className="mt-24 flex justify-center">
          <StartNowButton className="w-full md:w-auto md:min-w-[300px] md:py-6 md:text-md" />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="w-full max-w-4xl mx-auto px-6 md:px-4 my-24">
        <Testimonial
          companyLogo="/adapta-logo.avif"
          quote="I was always skeptical about meditation, but the science‑based approach won me over. I use ZenPersonal daily to reset my mind before important meetings."
          highlightedText="reset my mind before important meetings"
          authorName="Max Peters"
          authorPosition={
            <>CEO at{" "}
              <a
                href="https://adapta.org/"
                style={{
                  color: "hsl(var(--selection-text))",
                }}
                className="no-underline hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Adapta
              </a>
            </>
          }
          authorImage="/authors/max-peters.jpg"
        />
      </section>

      {/* Use Cases Section */}
      <section className="bg-gradient-to-b from-slate-100 via-slate-300 to-slate-200">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-4 my-24">
          <CaseStudiesSection />
        </div>
      </section>

      <section className="w-full max-w-4xl mx-auto px-6 md:px-4 my-24">
        <div className="text-left max-w-md mt-32 lg:mt-64">
          <div className="text-selection-text font-mono text-xs mb-3">NSDR-PROTOCOL</div>
          <h2 className="text-3xl font-host font-regular mb-2">
            Built on top of the NSDR-Protocol
          </h2>
          <p className="text-muted-foreground font-host text-lg">
            Every session follows a strict structure and set of techniques based on how NSDR works for your brain.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <YouTubeHomeEmbed />
        </div>

        <div className="mt-12 flex justify-center">
        <NSDRBenefits />
        </div>

      </section>

      <section className="w-full max-w-4xl mx-auto px-6 md:px-4 my-24">
        <div className="text-left max-w-md mt-32 lg:mt-64">
          <div className="text-selection-text font-mono text-xs mb-3">PRICING</div>
          <h2 className="text-3xl font-host font-regular mb-2">
            Start 100% for free
          </h2>
          <p className="text-muted-foreground font-host text-lg">
            No credit card required. Upgrade for longer sessions whenever you need it.
          </p>
        </div>
        <PricingTable />
      </section>

      {/* Testimonial Section */}
      <section className="w-full max-w-4xl mx-auto px-6 md:px-4 my-24">
        <Testimonial
          companyLogo="/paladino-logo-white.webp"
          quote="After trying and deleting Headspace and Calm I finally established the habit of meditating with ZenPersonal."
          highlightedText="established the habit of meditating"
          authorName="Beto Galloni"
          authorPosition={
            <>Film Director at{" "}
              <a
                href="https://paladino.cc/"
                style={{
                  color: "hsl(var(--selection-text))",
                }}
                className="no-underline hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Paladino
              </a>
            </>
          }
          authorImage="/authors/beto-galloni.jpeg"
        />
      </section>

      {/* Blog Section */}
      <section className="w-full max-w-4xl mx-auto px-6 md:px-4 my-24">
        <div className="text-left max-w-md mt-32 lg:mt-64">
          <div className="text-selection-text font-mono text-xs mb-3">BLOG</div>
          <h2 className="text-3xl font-regular mb-2">
            Explore the science of modern meditation
          </h2>
          <p className="text-muted-foreground text-md">
            Evidence-backed guides and case studies for optimizing your daily practice.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {featuredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <BlogCard
                category={post.category}
                title={post.title}
                description={post.description || ""}
                date={post.date}
                readTime={post.readingTime || ""}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Sponsor Section */}
      <section className="w-full max-w-4xl mx-auto px-6 md:px-4 py-12 text-center">
        <div className="text-selection-text font-mono text-xs mt-24 mb-3">
          BUILT WITH THE BEST
        </div>
        <a
          href="https://elevenlabs.io/text-to-speech"
          className="inline-block"
        >
          <img
            src="/elevenlabs-grants-logo-white.png"
            alt="Text to Speech"
            className="w-48 block mx-auto"
          />
        </a>
      </section>

      <FAQHome />

      <Footer />
    </div>
  );
}
