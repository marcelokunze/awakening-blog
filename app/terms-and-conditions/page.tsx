import { TermsAndConditionsContent } from './TermsAndConditionsContent'
import { Footer } from '@/components/Footer';

export default function TermsPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col pt-[48px]">
        <main className="min-h-screen py-12">
          <TermsAndConditionsContent />
        </main>
        <Footer />
      </div>
    </>
  );
}