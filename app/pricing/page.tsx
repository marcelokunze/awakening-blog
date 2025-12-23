import PricingTable from '@/components/PricingTable';
import FAQPricing from '@/components/FAQPricing';
import { Footer } from '@/components/Footer';

export default function PricingPage() {
  return (
    <>
      <div className="bg-black text-white">
        <section className="w-full max-w-5xl mx-auto px-6 md:px-4 my-24">
          <div className="text-center max-w-md mx-auto mb-4 mt-18">
            <h1 className="text-3xl font-regular mb-2">Pick your plan</h1>
            <p className="text-muted-foreground text-md">
              Get access to more sessions, premium voices and background tracks.
            </p>
          </div>

          <PricingTable />

          {/* FAQs inline below pricing table */}
          <FAQPricing />
        </section>
        <Footer />
      </div>
    </>
  );
}