import React from 'react';

export const PrivacyContent = () => {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-4xl font-bold">Privacy</h1>
            <p className="text-md font-xs text-foreground/70 mt-2">Last updated April 30, 2025</p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-12">
                ZenPersonal collects and shares only the minimal amount of data necessary. In summary:
            </p>

            <ul className="list-disc list-inside mt-4 leading-loose">
                <li className="text-md font-regular text-foreground/70">We do not place cookies on visitors&apos; browsers.</li>
                <li className="text-md font-regular text-foreground/70">We do not store personal data by default.</li>
                <li className="text-md font-regular text-foreground/70">We do not share any tracked visitor data with third parties.</li>
                <li className="text-md font-regular text-foreground/70">We only share the smallest amount of client data with a limited number of third parties, such as email information for transactional purposes or with our payment processor.</li>
                <li className="text-md font-regular text-foreground/70">We do not sell or monetize any data.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-12">ZenPersonal&apos;s clients data</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                We collect and use as little information from our clients as necessary to be operational.
            </p>

            <ul className="list-disc list-inside mt-4 leading-loose">
                <li className="text-md font-regular text-foreground/70">
                    An <a href="https://policies.google.com/privacy/embedded?hl=en-US" className="text-selection-text hover:text-selection-text/80 transition-colors">Google</a> Signup is needed in order to use ZenPersonal. The information we get from Google (and store in our database) is <strong>email address</strong>, <strong>name</strong> and <strong>profile picture</strong>. We rarely send essential messages, such as transactional emails or important product updates.
                </li>
                <li className="text-md font-regular text-foreground/70">
                    We share clients&apos; email addresses with <a href="https://resend.com/legal/privacy-policy" className="text-selection-text hover:text-selection-text/80 transition-colors">Resend</a>, our email service, and <a href="https://stripe.com/en-pt/privacy" className="text-selection-text hover:text-selection-text/80 transition-colors">Stripe</a>, our payment provider. Both of these services are privacy-focused and compliant with all legal regulations.
                </li>
                <li className="text-md font-regular text-foreground/70">
                    Our servers and databases are hosted in the European Union, using service providers that are fully secure. We use <a href="https://supabase.com/privacy" className="text-selection-text hover:text-selection-text/80 transition-colors">Supabase</a> for the Postgres database.
                </li>
                <li className="text-md font-regular text-foreground/70">
                    The only cookie we store is a first-party session cookie that remembers your login status. This cookie can be deleted at any time.
                </li>
            </ul>

            <h2 className="text-xl font-semibold mt-12">Is ZenPersonal GDPR compliant?</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                Yes, ZenPersonal is legally based in Portugal (EU) and complies with the GDPR framework.
            </p>

            <h2 className="text-xl font-semibold mt-12">ZenPersonal as a Data Controller</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                ZenPersonal serves as a Data Controller in its relationship with customers, managing the personal information provided for using our service (like registration information, such as email). ZenPersonal does not sell personal data to third parties, nor does it use such data for marketing or advertising purposes.
            </p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                We use as minimal amount of sub-processors as possible. Here is the full list:
            </p>

            <ul className="list-disc list-inside mt-4 leading-relaxed">
                <li className="text-md font-regular text-foreground/70">
                    <a href="https://stripe.com/en-pt/privacy" className="text-selection-text hover:text-selection-text/80 transition-colors">Stripe</a> as payment processor
                </li>
                <li className="text-md font-regular text-foreground/70">
                    <a href="https://resend.com/legal/privacy-policy" className="text-selection-text hover:text-selection-text/80 transition-colors">Resend</a> as email sending infrastructure
                </li>
            </ul>

            <h2 id="contact-us" className="text-xl font-semibold mt-12">Feel free to contact us</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                For any additional questions:
            </p>

            <p className="text-md font-medium text-foreground/70 leading-relaxed mt-1">
                <a href="mailto:zenpersonal.app@gmail.com" className="text-selection-text hover:text-selection-text/80 transition-colors">zenpersonal.app@gmail.com</a>
            </p>

        </div>
    );
};

export default PrivacyContent;