"use client";
import Link from 'next/link';
import Script from 'next/script';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { useEffect, useRef, useState } from 'react';

interface PageData {
  title: string;
  slug: string;
}

interface FooterLink {
  label: string;
  url: string;
  style: string;
  newTab?: boolean; // add this
}

interface FooterData {
  title: string;
  links: FooterLink[];
}

function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    const fetchFooter = async () => {
      const data = await client.fetch(
        groq`*[_type == "footer"][0]{
          title,
          links[]{
            label,
            style,
            url,
            newTab // fetch the new field
          }
        }`
      );
      setFooterData(data);
    };
    fetchFooter();
  }, []);

  return (
    <>
      {footerData?.links?.map((link) => (
        <Link
          key={link.label}
          className={link.style === 'button' ? 'footer-button' : 'menuitem'}
          href={link.url}
          target={link.newTab ? '_blank' : undefined} // open in new tab if true
          rel={link.newTab ? 'noopener noreferrer' : undefined}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}

interface FormData {
  contactPreference: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  address1: string;
  address2: string;
  postcode: string;
  province: string;
  representedByAgent: string;
  floorplans: string[];
}

export default function ContactForm() {
  const [teamPage, setTeamPage] = useState<PageData | null>(null);
  const [legalPage, setLegalPage] = useState<PageData | null>(null);
  const [isAgent, setIsAgent] = useState<boolean>(false);
  const [iAm, setIAm] = useState<string>("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const [formData, setFormData] = useState<FormData>({
    contactPreference: '',
    firstName: '',
    lastName: '',
    email: '',
    country: '214', // United States by default
    address1: '',
    address2: '',
    postcode: '',
    province: '',
    representedByAgent: '',
    floorplans: [],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Initialize jQuery Nice Select for enhanced dropdown styling
    // Load only on client after hydration
    (async () => {
      if (typeof window === 'undefined') return;
      try {
        const jqMod: any = await import('jquery');
        const $: any = jqMod.default || jqMod;
        (window as any).jQuery = $;
        (window as any).$ = $;
        await import('jquery-nice-select');
        if (typeof $.fn?.niceSelect === 'function') {
          // Initialize all select.select-reset fields, including #answers_24670
          const $targets = $('select.select-reset');
          $targets.each((_: any, el: any) => {
            const $el = $(el);
            if ($el.next('.nice-select').length) {
              $el.niceSelect('destroy');
            }
          });
          $targets.niceSelect();
        }
      } catch {
        // ignore if plugin not available
      }
    })();
    const fetchData = async () => {
      const teamdata = await client.fetch(
        groq`*[_id == "d8f59a49-e8bc-4e49-b6ba-5c1bb6ee979b"][0]{
          title,
          "slug": slug.current
        }`
      );
      setTeamPage(teamdata);

      const legaldata = await client.fetch(
        groq`*[_id == "ecd6ff2b-434b-4a36-88c3-d88484466fe3"][0]{
          title,
          "slug": slug.current
        }`
      );
      setLegalPage(legaldata);
    };
    fetchData();
  }, []);

  // Keep Nice Select instance for the "Are you represented by an agent?" dropdown
  // in sync when it is conditionally shown/hidden based on iAm
  useEffect(() => {
    (async () => {
      if (typeof window === 'undefined') return;
      try {
        const jqMod: any = await import('jquery');
        const $: any = jqMod.default || jqMod;
        // If plugin not available yet just bail silently
        if (typeof $.fn?.niceSelect !== 'function') return;
        const $rep = $('#answers_24098');
        if ($rep.length === 0) return;

        if (iAm !== 'Agent') {
          // Ensure it's initialized/updated when becoming visible
          if ($rep.next('.nice-select').length) {
            $rep.niceSelect('update');
          } else {
            $rep.niceSelect();
          }
        } else {
          // Destroy when hidden so React can remount cleanly later
          if ($rep.next('.nice-select').length) {
            $rep.niceSelect('destroy');
          }
        }
      } catch {}
    })();
  }, [iAm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      const checked = target.checked;
      setFormData((prev) => {
        const arr = prev.floorplans;
        if (checked) {
          return { ...prev, floorplans: [...arr, value] };
        } else {
          return { ...prev, floorplans: arr.filter((v) => v !== value) };
        }
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.contactPreference) newErrors.contactPreference = 'Required';
    if (!formData.firstName) newErrors.firstName = 'Required';
    if (!formData.lastName) newErrors.lastName = 'Required';
    if (!formData.email) newErrors.email = 'Required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.country) newErrors.country = 'Required';
    if (!formData.address1) newErrors.address1 = 'Required';
    if (!formData.postcode) newErrors.postcode = 'Required';
    if (!formData.province) newErrors.province = 'Required';
    if (!formData.representedByAgent) newErrors.representedByAgent = 'Required';
    if (formData.floorplans.length === 0) newErrors.floorplans = 'Select at least one';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    // Rely on native required attributes and Spark's backend validation

    // Spam trap hide (defensive; also hidden via CSS/useEffect)
    const trap = document.getElementById("are_you_simulated") as HTMLInputElement | null;
    if (trap) trap.style.display = "none";

    // Disable duplicate submissions briefly
    if (submitBtnRef.current) {
      submitBtnRef.current.disabled = true;
      setTimeout(() => {
        if (submitBtnRef.current) submitBtnRef.current.disabled = false;
      }, 2000);
    }

    // If reCAPTCHA v3 site key is set, execute and submit programmatically
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
    if (siteKey && (window as any).grecaptcha && formRef.current) {
      e.preventDefault();
      const grecaptcha = (window as any).grecaptcha as any;
      grecaptcha.ready(() => {
        grecaptcha.execute(siteKey, { action: 'registration' }).then((token: string) => {
          const tokenInput = formRef.current!.querySelector<HTMLInputElement>(".g-recaptcha-response");
          if (tokenInput) tokenInput.value = token;
          formRef.current!.submit();
        });
      });
    }
  };

  useEffect(() => {
    // Hide honeypot visually
    const trap = document.getElementById("are_you_simulated") as HTMLInputElement | null;
    if (trap) trap.style.display = "none";

    // Email inputs pattern for native validation
    document.querySelectorAll("input[type='email']").forEach((el) => {
      (el as HTMLInputElement).pattern = "[^@\\s]+@[^@\\s]+\\.[^@\\s]+";
    });
  }, []);

  if (submitted) {
    return (
      <div className="form-container">
        <div className="form" id="form">
          <div className="contact-form-close" id="contactformclose">
            <div className="desktop-close">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M1 1L29 29" stroke="#4C2F48" />
                <path d="M29 1L1 29" stroke="#4C2F48" />
              </svg>
            </div>
            <div className="ipad-close">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M1.00049 0.707031L26.9999 26.7027" stroke="#4C2F48" />
                <path d="M26.9995 0.707031L1.0001 26.7027" stroke="#4C2F48" />
              </svg>
            </div>
            <div className="mobile-close">
              <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1L1 11L11 21" stroke="#4C2F48" />
              </svg>
            </div>
          </div>
          <h3 className="contact-form-thank-you">Thank you for your inquiry.</h3>
        </div>
        <div className="form-footer" id="formFooter">
      <a className="addresslink" href="https://maps.app.goo.gl/ngRsVcKPu2c7aXJLA" target="_blank">4500 Harding Pike, Nashville</a>
      <div className="form-footer-menu">
        <Footer />
      </div>
      </div>
      </div>
    );
  }
  return (
    <div className="form-container">
      {/* Optional: Load reCAPTCHA v3 if a site key is provided */}
      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
        <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} strategy="afterInteractive" />
      ) : null}
      <div className="form" id="form">
        <div className="contact-form-close" id="contactformclose">
          <div className="desktop-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M1 1L29 29" stroke="#4C2F48" />
              <path d="M29 1L1 29" stroke="#4C2F48" />
            </svg>
          </div>
          <div className="ipad-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M1.00049 0.707031L26.9999 26.7027" stroke="#4C2F48" />
              <path d="M26.9995 0.707031L1.0001 26.7027" stroke="#4C2F48" />
            </svg>
          </div>
          <div className="mobile-close">
            <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 1L1 11L11 21" stroke="#4C2F48" />
            </svg>
          </div>
        </div>
        <h3 className="contact-form-title">Opportunities to purchase a private residence will commence in the fall of 2025. To inquire, please complete the following form.</h3>
        <form
          id="spark-registration-form"
          action="https://spark.re/aj-capital-partners/belle-meade-residences/register/registration"
          acceptCharset="UTF-8"
          method="post"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <div className="inner-form-container">
            <div className='form-item full-width'>
              {/* <label htmlFor="answers_24670">I am *</label> */}
                 <div className='dropdown-wrapper'>
                  <div className="answer"><select name="answers[24670][answers]" id="answers_24670" className="false select-reset" defaultValue="" onChange={(e) => setIAm(e.target.value)}><option value="" disabled>I am</option><option value="Buyer">Buyer</option>
                  <option value="Agent">Agent</option></select></div>
              </div>
            </div>
            <div className="form-item">
              {/* <label>First Name *</label> */}
              <input className='disable-require' placeholder="First Name*" id='contact_first_name' maxLength={50} name='contact[first_name]' required type='text' />
            </div>
            <div className="form-item">
              {/* <label>Last Name </label> */}
              <input className='disable-require' id='contact_last_name' placeholder="Last Name*" maxLength={50} name='contact[last_name]' required type='text' />
            </div>
            <div className="form-item">
              {/* <label>Email *</label> */}
              <input className='disable-require' placeholder="Email*" id='contact_email' maxLength={255} name='contact[email]' required type='email' />
            </div>
            <div className="form-item">
              <div className='dropdown-wrapper answer'>
                {/* <label>Country </label> */}
                 <select name="contact[country_id]" id="contact_country_id" className="select-reset disable-require" required defaultValue="">
                  <option value="" disabled>Country*</option>
                  <option value="1">Afghanistan</option>
                  <option value="2">Albania</option>
                  <option value="3">Algeria</option>
                  <option value="4">American Samoa</option>
                  <option value="5">Andorra</option>
                  <option value="6">Angola</option>
                  <option value="7">Anguilla</option>
                  <option value="8">Antigua and Barbuda</option>
                  <option value="9">Argentina</option>
                  <option value="10">Armenia</option>
                  <option value="11">Aruba</option>
                  <option value="12">Australia</option>
                  <option value="13">Austria</option>
                  <option value="14">Azerbaijan</option>
                  <option value="15">Bahamas</option>
                  <option value="16">Bahrain</option>
                  <option value="17">Bangladesh</option>
                  <option value="18">Barbados</option>
                  <option value="19">Belarus</option>
                  <option value="20">Belgium</option>
                  <option value="21">Belize</option>
                  <option value="22">Benin</option>
                  <option value="23">Bermuda</option>
                  <option value="24">Bhutan</option>
                  <option value="25">Bolivia</option>
                  <option value="26">Bosnia and Herzegovina</option>
                  <option value="27">Botswana</option>
                  <option value="28">Brazil</option>
                  <option value="29">Brunei Darussalam</option>
                  <option value="30">Bulgaria</option>
                  <option value="31">Burkina Faso</option>
                  <option value="32">Burundi</option>
                  <option value="33">Cambodia</option>
                  <option value="34">Cameroon</option>
                  <option value="35">Canada</option>
                  <option value="36">Cape Verde</option>
                  <option value="37">Cayman Islands</option>
                  <option value="38">Central African Republic</option>
                  <option value="39">Chad</option>
                  <option value="40">Chile</option>
                  <option value="41">China</option>
                  <option value="42">Colombia</option>
                  <option value="43">Comoros</option>
                  <option value="44">Congo</option>
                  <option value="45">Congo, the Democratic Republic of the</option>
                  <option value="46">Cook Islands</option>
                  <option value="47">Costa Rica</option>
                  <option value="48">Cote D&#39;Ivoire</option>
                  <option value="49">Croatia</option>
                  <option value="50">Cuba</option>
                  <option value="51">Cyprus</option>
                  <option value="52">Czech Republic</option>
                  <option value="53">Denmark</option>
                  <option value="54">Djibouti</option>
                  <option value="55">Dominica</option>
                  <option value="56">Dominican Republic</option>
                  <option value="57">Ecuador</option>
                  <option value="58">Egypt</option>
                  <option value="59">El Salvador</option>
                  <option value="60">Equatorial Guinea</option>
                  <option value="61">Eritrea</option>
                  <option value="62">Estonia</option>
                  <option value="63">Ethiopia</option>
                  <option value="64">Falkland Islands (Malvinas)</option>
                  <option value="65">Faroe Islands</option>
                  <option value="66">Fiji</option>
                  <option value="67">Finland</option>
                  <option value="68">France</option>
                  <option value="69">French Guiana</option>
                  <option value="70">French Polynesia</option>
                  <option value="71">Gabon</option>
                  <option value="72">Gambia</option>
                  <option value="73">Georgia</option>
                  <option value="74">Germany</option>
                  <option value="75">Ghana</option>
                  <option value="76">Gibraltar</option>
                  <option value="77">Greece</option>
                  <option value="78">Greenland</option>
                  <option value="79">Grenada</option>
                  <option value="80">Guadeloupe</option>
                  <option value="81">Guam</option>
                  <option value="82">Guatemala</option>
                  <option value="83">Guinea</option>
                  <option value="84">Guinea-Bissau</option>
                  <option value="85">Guyana</option>
                  <option value="86">Haiti</option>
                  <option value="87">Holy See (Vatican City State)</option>
                  <option value="88">Honduras</option>
                  <option value="89">Hong Kong</option>
                  <option value="90">Hungary</option>
                  <option value="91">Iceland</option>
                  <option value="92">India</option>
                  <option value="93">Indonesia</option>
                  <option value="94">Iran, Islamic Republic of</option>
                  <option value="95">Iraq</option>
                  <option value="96">Ireland</option>
                  <option value="97">Israel</option>
                  <option value="98">Italy</option>
                  <option value="99">Jamaica</option>
                  <option value="100">Japan</option>
                  <option value="101">Jordan</option>
                  <option value="102">Kazakhstan</option>
                  <option value="103">Kenya</option>
                  <option value="104">Kiribati</option>
                  <option value="105">Korea, Democratic People&#39;s Republic of</option>
                  <option value="106">Korea, Republic of</option>
                  <option value="107">Kuwait</option>
                  <option value="108">Kyrgyzstan</option>
                  <option value="109">Lao People&#39;s Democratic Republic</option>
                  <option value="110">Latvia</option>
                  <option value="111">Lebanon</option>
                  <option value="112">Lesotho</option>
                  <option value="113">Liberia</option>
                  <option value="114">Libyan Arab Jamahiriya</option>
                  <option value="115">Liechtenstein</option>
                  <option value="116">Lithuania</option>
                  <option value="117">Luxembourg</option>
                  <option value="118">Macao</option>
                  <option value="119">Macedonia, the Former Yugoslav Republic of</option>
                  <option value="120">Madagascar</option>
                  <option value="121">Malawi</option>
                  <option value="122">Malaysia</option>
                  <option value="123">Maldives</option>
                  <option value="124">Mali</option>
                  <option value="125">Malta</option>
                  <option value="126">Marshall Islands</option>
                  <option value="127">Martinique</option>
                  <option value="128">Mauritania</option>
                  <option value="129">Mauritius</option>
                  <option value="130">Mexico</option>
                  <option value="131">Micronesia, Federated States of</option>
                  <option value="132">Moldova, Republic of</option>
                  <option value="133">Monaco</option>
                  <option value="134">Mongolia</option>
                  <option value="135">Montserrat</option>
                  <option value="136">Morocco</option>
                  <option value="137">Mozambique</option>
                  <option value="138">Myanmar</option>
                  <option value="139">Namibia</option>
                  <option value="140">Nauru</option>
                  <option value="141">Nepal</option>
                  <option value="142">Netherlands</option>
                  <option value="143">Netherlands Antilles</option>
                  <option value="144">New Caledonia</option>
                  <option value="145">New Zealand</option>
                  <option value="146">Nicaragua</option>
                  <option value="147">Niger</option>
                  <option value="148">Nigeria</option>
                  <option value="149">Niue</option>
                  <option value="150">Norfolk Island</option>
                  <option value="151">Northern Mariana Islands</option>
                  <option value="152">Norway</option>
                  <option value="153">Oman</option>
                  <option value="154">Pakistan</option>
                  <option value="155">Palau</option>
                  <option value="156">Panama</option>
                  <option value="157">Papua New Guinea</option>
                  <option value="158">Paraguay</option>
                  <option value="159">Peru</option>
                  <option value="160">Philippines</option>
                  <option value="161">Pitcairn</option>
                  <option value="162">Poland</option>
                  <option value="163">Portugal</option>
                  <option value="164">Puerto Rico</option>
                  <option value="165">Qatar</option>
                  <option value="166">Reunion</option>
                  <option value="167">Romania</option>
                  <option value="168">Russian Federation</option>
                  <option value="169">Rwanda</option>
                  <option value="170">Saint Helena</option>
                  <option value="171">Saint Kitts and Nevis</option>
                  <option value="172">Saint Lucia</option>
                  <option value="173">Saint Pierre and Miquelon</option>
                  <option value="174">Saint Vincent and the Grenadines</option>
                  <option value="175">Samoa</option>
                  <option value="176">San Marino</option>
                  <option value="177">Sao Tome and Principe</option>
                  <option value="178">Saudi Arabia</option>
                  <option value="179">Senegal</option>
                  <option value="180">Seychelles</option>
                  <option value="181">Sierra Leone</option>
                  <option value="182">Singapore</option>
                  <option value="183">Slovakia</option>
                  <option value="184">Slovenia</option>
                  <option value="185">Solomon Islands</option>
                  <option value="186">Somalia</option>
                  <option value="187">South Africa</option>
                  <option value="188">Spain</option>
                  <option value="189">Sri Lanka</option>
                  <option value="190">Sudan</option>
                  <option value="191">Suriname</option>
                  <option value="192">Svalbard and Jan Mayen</option>
                  <option value="193">Swaziland</option>
                  <option value="194">Sweden</option>
                  <option value="195">Switzerland</option>
                  <option value="196">Syrian Arab Republic</option>
                  <option value="198">Tajikistan</option>
                  <option value="199">Tanzania, United Republic of</option>
                  <option value="200">Thailand</option>
                  <option value="201">Togo</option>
                  <option value="202">Tokelau</option>
                  <option value="203">Tonga</option>
                  <option value="204">Trinidad and Tobago</option>
                  <option value="205">Tunisia</option>
                  <option value="206">Turkey</option>
                  <option value="207">Turkmenistan</option>
                  <option value="208">Turks and Caicos Islands</option>
                  <option value="209">Tuvalu</option>
                  <option value="210">Uganda</option>
                  <option value="211">Ukraine</option>
                  <option value="212">United Arab Emirates</option>
                  <option value="213">United Kingdom</option>
                  <option value="214">United States</option>
                  <option value="215">Uruguay</option>
                  <option value="216">Uzbekistan</option>
                  <option value="217">Vanuatu</option>
                  <option value="218">Venezuela</option>
                  <option value="219">Viet Nam</option>
                  <option value="220">Virgin Islands, British</option>
                  <option value="221">Virgin Islands, U.s.</option>
                  <option value="222">Wallis and Futuna</option>
                  <option value="223">Western Sahara</option>
                  <option value="224">Yemen</option>
                  <option value="225">Zambia</option>
                  <option value="226">Zimbabwe</option>
                  <option value="197">Republic of China, Taiwan</option>
                  <option value="453">Sint Maarten (Dutch part)</option>
                  <option value="454">Aland Islands</option>
                  <option value="455">Bonaire, Sint Eustatius and Saba</option>
                  <option value="456">Bouvet Island</option>
                  <option value="457">British Indian Ocean Territory</option>
                  <option value="458">Christmas Island</option>
                  <option value="459">Cocos (Keeling) Islands</option>
                  <option value="460">Curacao</option>
                  <option value="461">Guernsey</option>
                  <option value="462">Heard Island and McDonald Islands</option>
                  <option value="463">Isle of Man</option>
                  <option value="464">Jersey</option>
                  <option value="465">Mayotte</option>
                  <option value="466">Montenegro</option>
                  <option value="467">Palestine</option>
                  <option value="468">Saint Barthelemy</option>
                  <option value="469">Saint Martin (French part)</option>
                  <option value="470">Serbia</option>
                  <option value="471">South Georgia and the South Sandwich Islands</option>
                  <option value="472">South Sudan</option>
                  <option value="473">Timor-Leste</option>
                  <option value="474">United States Minor Outlying Islands</option></select>
              </div>
            </div>
            <div className="form-item">
              {/* <label>Address </label> */}
              <input id='contact_address_line_1' placeholder="Address*" maxLength={255} name='contact[address_line_1]' className='disable-require' required type='text' />
            </div>
            <div className="form-item">
              {/* <label>City </label> */}
              <input id='contact_city' placeholder="City*" maxLength={255} name='contact[city]' className='disable-require' required  type='text' />
            </div>
            <div className="form-item">
              {/* <label>Province / State </label> */}
              <input id='contact_province' placeholder="State *" maxLength={255} name='contact[province]' className='disable-require' required type='text' />
            </div>
            <div className="form-item">
              {/* <label>Postcode / Zip </label> */}
              <input id='contact_postcode' placeholder="Zipcode*" maxLength={255} name='contact[postcode]' className='disable-require' required type='text' />
            </div>
            <div className='form-item'>
              {/* <label htmlFor="answers_24099">I am interested in</label> */}
              <div className='dropdown-wrapper'>
                  <div className="answer"><select name="answers[24099][answers]" id="answers_24099" className="false select-reset" defaultValue=""><option value="" disabled>I am interested in</option><option value="One Bedroom">One Bedroom</option>
                  <option value="Two Bedrooms">Two Bedrooms</option>
                  <option value="Three Bedrooms">Three Bedrooms</option>
                  <option value="Four Bedrooms">Four Bedrooms</option></select></div>
              </div>
            </div>
            {iAm !== 'Agent' && (
              <div className='form-item'>
                {/* <label htmlFor="answers_24098">Are you represented by an agent?</label> */}
                <div className='dropdown-wrapper'>
                   <div className="answer"><select name="answers[24098][answers]" id="answers_24098" className="false select-reset" defaultValue=""><option value="" disabled>Represented by an agent?</option><option value="Yes">Yes</option>
                    <option value="No">No</option>
                    </select></div>
                </div>
              </div>
            )}
            {iAm === 'Agent' && (
              <div className='form-item'>
                {/* <label>Real estate company</label> */}
                <div className="answer"><input placeholder="Real estate company" name="answers[24671][answers]" id="answers_24671" className="ignore"/>
                </div>
              </div>
            )}
            <button ref={submitBtnRef} name="button" type="submit" className="button submit template-button">SUBMIT</button><input type="hidden" name="source" id="source" value="Website" /><input type="hidden" name="redirect_success" id="redirect_success" value="" /><input type="hidden" name="redirect_error" id="redirect_error" value="" /><input type="text" name="are_you_simulated" id="are_you_simulated" placeholder="Leave this field blank" /><input type="hidden" name="g-recaptcha-response" id="g-recaptcha-response" className="g-recaptcha-response" />
          </div>
        </form>
      </div>
      <div className="form-footer" id="formFooter">
      <a className="addresslink" href="https://maps.app.goo.gl/ngRsVcKPu2c7aXJLA" target="_blank">4500 Harding Pike, Nashville</a>
      <div className="form-footer-menu">
        <Footer />
      </div>
    </div>
    </div>
  );
}
