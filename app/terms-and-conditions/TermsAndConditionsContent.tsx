import React from 'react';

export const TermsAndConditionsContent = () => {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-4xl font-bold">Terms & Conditions</h1>
            <p className="text-md font-xs text-foreground/70 mt-2">Last updated April 30, 2025</p>

            <h2 className="text-xl font-semibold mt-12">AGREEMENT TO OUR LEGAL TERMS</h2>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                We are <a href="https://humanswithcomputers.com/" className="text-selection-text hover:text-selection-text/80 transition-colors">Humans With Computers</a> (<span className="font-bold">&quot;Company,&quot;</span> <span className="font-bold">&quot;we,&quot;</span> <span className="font-bold">&quot;us,&quot;</span> <span className="font-bold">&quot;our&quot;</span>).
            </p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                We operate the website <a href="http://www.zenpersonal.app" className="text-selection-text hover:text-selection-text/80 transition-colors">http://www.zenpersonal.app</a> (the <span className="font-bold">&quot;Site&quot;</span>), as well as any other related products and services that refer or link to these legal terms (the <span className="font-bold">&quot;Legal Terms&quot;</span>) (collectively, the <span className="font-bold">&quot;Services&quot;</span>).
            </p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                We provide an AI powered meditation generator system.
            </p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                You can contact us by email at <a href="mailto:zenpersonal.app@gmail.com" className="text-selection-text hover:text-selection-text/80 transition-colors">zenpersonal.app@gmail.com</a>.
            </p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (<span className="font-bold">&quot;you&quot;</span>), and Humans With Computers, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
            </p>

            <h2 id="table-of-contents" className="text-xl font-semibold mt-12">TABLE OF CONTENTS</h2>
            <ol className="list-decimal font-medium list-inside mt-4 leading-relaxed">
                {[
                    { id: "our-services", title: "OUR SERVICES" },
                    { id: "intellectual-property-rights", title: "INTELLECTUAL PROPERTY RIGHTS" },
                    { id: "user-representations", title: "USER REPRESENTATIONS" },
                    { id: "user-registration", title: "USER REGISTRATION" },
                    { id: "purchases-and-payment", title: "PURCHASES AND PAYMENT" },
                    { id: "prohibited-activities", title: "PROHIBITED ACTIVITIES" },
                    { id: "user-generated-contributions", title: "USER GENERATED CONTRIBUTIONS" },
                    { id: "contribution-license", title: "CONTRIBUTION LICENSE" },
                    { id: "third-party-websites", title: "THIRD-PARTY WEBSITES AND CONTENT" },
                    { id: "services-management", title: "SERVICES MANAGEMENT" },
                    { id: "privacy-policy", title: "PRIVACY POLICY" },
                    { id: "term-and-termination", title: "TERM AND TERMINATION" },
                    { id: "modifications", title: "MODIFICATIONS AND INTERRUPTIONS" },
                    { id: "governing-law", title: "GOVERNING LAW" },
                    { id: "dispute-resolution", title: "DISPUTE RESOLUTION" },
                    { id: "corrections", title: "CORRECTIONS" },
                    { id: "disclaimer", title: "DISCLAIMER" },
                    { id: "limitations-of-liability", title: "LIMITATIONS OF LIABILITY" },
                    { id: "indemnification", title: "INDEMNIFICATION" },
                    { id: "user-data", title: "USER DATA" },
                    { id: "electronic-communications", title: "ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES" },
                    { id: "california-users", title: "CALIFORNIA USERS AND RESIDENTS" },
                    { id: "miscellaneous", title: "MISCELLANEOUS" },
                    { id: "contact-us", title: "CONTACT US" }
                ].map((item) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            className="text-selection-text hover:text-selection-text/80 transition-colors"
                        >
                            {`${item.title}`}
                        </a>
                    </li>
                ))}
            </ol>

            {/* Section 1 */}
            <h2 id="our-services" className="text-xl font-semibold mt-12">1. OUR SERVICES</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
            </p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).
            </p>

            {/* Section 2 */}
            <h2 id="intellectual-property-rights" className="text-xl font-semibold mt-12">2. INTELLECTUAL PROPERTY RIGHTS</h2>

            <h3 className="text-lg font-semibold mt-8">Our intellectual property</h3>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the <span className="font-bold">&quot;Content&quot;</span>), as well as the trademarks, service marks, and logos contained therein (the <span className="font-bold">&quot;Marks&quot;</span>).
            </p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.
            </p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                The Content and Marks are provided in or through the Services &quot;AS IS&quot; for your personal, non-commercial use only.
            </p>

            <h3 className="text-lg font-semibold mt-8">Your use of our Services</h3>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                Subject to your compliance with these Legal Terms, including the <a href="#prohibited-activities" className="text-selection-text hover:text-selection-text/80 transition-colors">&quot;PROHIBITED ACTIVITIES&quot;</a> section below, we grant you a non-exclusive, non-transferable, revocable license to:
            </p>

            <ul className="list-disc list-inside mt-4 leading-relaxed">
                <li className="text-md font-regular text-foreground/70">access the Services; and</li>
                <li className="text-md font-regular text-foreground/70">download or print a copy of any portion of the Content to which you have properly gained access.</li>
            </ul>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                solely for your personal, non-commercial use.
            </p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to: <a href="mailto:zenpersonal.app@gmail.com" className="text-selection-text hover:text-selection-text/80 transition-colors">zenpersonal.app@gmail.com</a>.
            </p>

            {/* Section 3 */}
            <h2 id="user-representations" className="text-xl font-semibold mt-12">3. USER REPRESENTATIONS</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                By using the Services, you represent and warrant that:
            </p>

            <ol className="list-decimal list-inside mt-4 leading-relaxed">
                <li className="text-md font-regular text-foreground/70">all registration information you submit will be true, accurate, current, and complete;</li>
                <li className="text-md font-regular text-foreground/70">you will maintain the accuracy of such information and promptly update such registration information as necessary;</li>
                <li className="text-md font-regular text-foreground/70">you have the legal capacity and you agree to comply with these Legal Terms;</li>
                <li className="text-md font-regular text-foreground/70">you are not a minor in the jurisdiction in which you reside;</li>
                <li className="text-md font-regular text-foreground/70">you will not access the Services through automated or non-human means, whether through a bot, script or otherwise;</li>
                <li className="text-md font-regular text-foreground/70">you will not use the Services for any illegal or unauthorized purpose;</li>
                <li className="text-md font-regular text-foreground/70">your use of the Services will not violate any applicable law or regulation.</li>
            </ol>

            {/* Section 4 */}
            <h2 id="user-registration" className="text-xl font-semibold mt-12">4. USER REGISTRATION</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
            </p>

            {/* Section 5 */}
            <h2 id="purchases-and-payment" className="text-xl font-semibold mt-12">5. PURCHASES AND PAYMENT</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                All purchases are non-refundable.
            </p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                We accept the following forms of payment:
            </p>

            <ul className="list-inside mt-4 leading-relaxed">
                {[
                    'Visa',
                    'Mastercard',
                    'PayPal',
                    'Apple Pay',
                    'Google Pay',
                    'American Express',
                    'Discover',
                    'Diners Club',
                    'JCB',
                    'China UnionPay',
                    'Link',
                    'Blik',
                    'Bancontact',
                    'EPS',
                    'iDeal',
                    'Klarna'
                ].map((payment, index) => (
                    <li key={index} className="text-md font-regular text-foreground/70">- {payment}</li>
                ))}
            </ul>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in Euros.
            </p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorize us to charge your chosen payment provider for any such amounts upon placing your order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment.
            </p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same payment method, and/or orders that use the same billing or shipping address. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers, or distributors.
            </p>

            {/* Section 6 */}
            <h2 id="prohibited-activities" className="text-xl font-semibold mt-12">6. PROHIBITED ACTIVITIES</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                As a user of the Services, you agree not to:
            </p>

            <ul className="list-disc list-inside mt-4 leading-relaxed">
                <li className="text-md font-regular text-foreground/70 mb-2">Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Engage in unauthorized framing of or linking to the Services.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party&apos;s uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Delete the copyright or other proprietary rights notice from any Content.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Attempt to impersonate another user or person or use the username of another user.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (&quot;gifs&quot;), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as &quot;spyware&quot; or &quot;passive collection mechanisms&quot; or &quot;pcms&quot;).</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Copy or adapt the Services&apos; software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorized script or other software.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Use a buying agent or purchasing agent to make purchases on the Services.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
                <li className="text-md font-regular text-foreground/70 mb-2">Sell or otherwise transfer your profile.</li>
            </ul>

            {/* Section 7 */}
            <h2 id="user-generated-contributions" className="text-xl font-semibold mt-12">7. USER GENERATED CONTRIBUTIONS</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                The Services does not offer users to submit or post content.
            </p>

            {/* Section 8 */}
            <h2 id="contribution-license" className="text-xl font-semibold mt-12">8. CONTRIBUTION LICENSE</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                You and Services agree that we may access, store, process, and use any information and personal data that you provide and your choices (including settings).
            </p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                By submitting suggestions or other feedback regarding the Services, you agree that we can use and share such feedback for any purpose without compensation to you.
            </p>

            {/* Section 9 */}
            <h2 id="third-party-websites" className="text-xl font-semibold mt-12">9. THIRD-PARTY WEBSITES AND CONTENT</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                The Services may contain (or you may be sent via the Site) links to other websites (<span className="font-bold">&quot;Third-Party Websites&quot;</span>) as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties (<span className="font-bold">&quot;Third-Party Content&quot;</span>). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Services or any Third-Party Content posted on, available through, or installed from the Services, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content. Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us.
            </p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                If you decide to leave the Services and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Legal Terms no longer govern. You should review the applicable terms and policies, including privacy and data gathering practices, of any website to which you navigate from the Services or relating to any applications you use or install from the Services. Any purchases you make through Third-Party Websites will be through other websites and from other companies, and we take no responsibility whatsoever in relation to such purchases which are exclusively between you and the applicable third party.
            </p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                You agree and acknowledge that we do not endorse the products or services offered on Third-Party Websites and you shall hold us harmless from any harm caused by your purchase of such products or services. Additionally, you shall hold us harmless from any losses sustained by you or harm caused to you relating to or resulting in any way from any Third-Party Content or any contact with Third-Party Websites.
            </p>

            {/* Section 10 */}
            <h2 id="services-management" className="text-xl font-semibold mt-12">10. SERVICES MANAGEMENT</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                We reserve the right, but not the obligation, to:
            </p>

            <ol className="list-decimal list-inside mt-4">
                <li className="text-md font-regular text-foreground/70 mb-2">monitor the Services for violations of these Legal Terms;</li>
                <li className="text-md font-regular text-foreground/70 mb-2">take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities;</li>
                <li className="text-md font-regular text-foreground/70 mb-2">in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof;</li>
                <li className="text-md font-regular text-foreground/70 mb-2">in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems;</li>
                <li className="text-md font-regular text-foreground/70 mb-2">otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.</li>
            </ol>

            {/* Section 11 */}
            <h2 id="privacy-policy" className="text-xl font-semibold mt-12">11. PRIVACY POLICY</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                We care about data privacy and security. By using the Services, you agree to be bound by our Privacy Policy posted on the Services, which is incorporated into these Legal Terms. Please be advised the Services are hosted in Portugal. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in Portugal, then through your continued use of the Services, you are transferring your data to Portugal, and you expressly consent to have your data transferred to and processed in Portugal.
            </p>

            {/* Section 12 */}
            <h2 id="term-and-termination" className="text-xl font-semibold mt-12">12. TERM AND TERMINATION</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
            </p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.
            </p>

            {/* Section 13 */}
            <h2 id="modifications" className="text-xl font-semibold mt-12">13. MODIFICATIONS AND INTERRUPTIONS</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.
            </p>

            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith.
            </p>

            {/* Section 14 */}
            <h2 id="governing-law" className="text-xl font-semibold mt-12">14. GOVERNING LAW</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                These Legal Terms are governed by and interpreted following the laws of Portugal, and the use of the United Nations Convention of Contracts for the International Sales of Goods is expressly excluded. If your habitual residence is in the EU, and you are a consumer, you additionally possess the protection provided to you by obligatory provisions of the law in your country to residence. Humans With Computers and yourself both agree to submit to the non-exclusive jurisdiction of the courts of Lisbon, which means that you may make a claim to defend your consumer protection rights in regards to these Legal Terms in Portugal, or in the EU country in which you reside.
            </p>

            {/* Section 15 */}
            <h2 id="dispute-resolution" className="text-xl font-semibold mt-12">15. DISPUTE RESOLUTION</h2>

            <h3 className="text-lg font-semibold mt-8">Informal Negotiations</h3>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms (each a <span className="font-bold">&quot;Dispute&quot;</span> and collectively, the <span className="font-bold">&quot;Disputes&quot;</span>) brought by either you or us (individually, a <span className="font-bold">&quot;Party&quot;</span> and collectively, the <span className="font-bold">&quot;Parties&quot;</span>), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least thirty (30) days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.
            </p>

            <h3 className="text-lg font-semibold mt-8">Binding Arbitration</h3>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                Any dispute arising from the relationships between the Parties to these Legal Terms shall be determined by one arbitrator who will be chosen in accordance with the Arbitration and Internal Rules of the European Court of Arbitration being part of the European Centre of Arbitration having its seat in Strasbourg, and which are in force at the time the application for arbitration is filed, and of which adoption of this clause constitutes acceptance. The seat of arbitration shall be Lisbon, Portugal. The language of the proceedings shall be English. Applicable rules of substantive law shall be the law of Portugal.
            </p>

            <h3 className="text-lg font-semibold mt-8">Restrictions</h3>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis or to utilize class action procedures; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.
            </p>

            <h3 className="text-lg font-semibold mt-8">Exceptions to Informal Negotiations and Arbitration</h3>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                The Parties agree that the following Disputes are not subject to the above provisions concerning informal negotiations binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive relief. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.
            </p>

            {/* Section 16 */}
            <h2 id="corrections" className="text-xl font-semibold mt-12">16. CORRECTIONS</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
            </p>

            {/* Section 17 */}
            <h2 id="disclaimer" className="text-xl font-semibold mt-12">17. DISCLAIMER</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES&apos; CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
            </p>

            {/* Section 18 */}
            <h2 id="limitations-of-liability" className="text-xl font-semibold mt-12">18. LIMITATIONS OF LIABILITY</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE ONE (1) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
            </p>

            {/* Section 19 */}
            <h2 id="indemnification" className="text-xl font-semibold mt-12">19. INDEMNIFICATION</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys&apos; fees and expenses, made by any third party due to or arising out of: (1) use of the Services; (2) breach of these Legal Terms; (3) any breach of your representations and warranties set forth in these Legal Terms; (4) your violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any overt harmful act toward any other user of the Services with whom you connected via the Services. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.
            </p>

            {/* Section 20 */}
            <h2 id="user-data" className="text-xl font-semibold mt-12">20. USER DATA</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
            </p>

            {/* Section 21 */}
            <h2 id="electronic-communications" className="text-xl font-semibold mt-12">21. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.
            </p>

            {/* Section 22 */}
            <h2 id="california-users" className="text-xl font-semibold mt-12">22. CALIFORNIA USERS AND RESIDENTS</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (600) 952-5210 or (916) 445-1254.
            </p>

            {/* Section 23 */}
            <h2 id="miscellaneous" className="text-xl font-semibold mt-12">23. MISCELLANEOUS</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms.
            </p>

            {/* Section 24 */}
            <h2 id="contact-us" className="text-xl font-semibold mt-12">24. CONTACT US</h2>
            <p className="text-md font-regular text-foreground/70 leading-relaxed mt-4">
                In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
            </p>

            <p className="text-md font-medium text-foreground/70 leading-relaxed mt-1">
                <a href="mailto:zenpersonal.app@gmail.com" className="text-selection-text hover:text-selection-text/80 transition-colors">zenpersonal.app@gmail.com</a>
            </p>

        </div>
    );
};

export default TermsAndConditionsContent;