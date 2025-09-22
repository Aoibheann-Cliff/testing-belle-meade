"use client";
import Link from 'next/link';
import Script from 'next/script';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { MultiValue } from 'react-select';
const Select = dynamic(() => import('react-select'), { ssr: false });
type Option = { value: string; label: string };

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

  const countryOptions = [
    { value: "1", label: "Afghanistan" },
    { value: "2", label: "Albania" },
    { value: "3", label: "Algeria" },
    { value: "4", label: "American Samoa" },
    { value: "5", label: "Andorra" },
    { value: "6", label: "Angola" },
    { value: "7", label: "Anguilla" },
    { value: "8", label: "Antigua and Barbuda" },
    { value: "9", label: "Argentina" },
    { value: "10", label: "Armenia" },
    { value: "11", label: "Aruba" },
    { value: "12", label: "Australia" },
    { value: "13", label: "Austria" },
    { value: "14", label: "Azerbaijan" },
    { value: "15", label: "Bahamas" },
    { value: "16", label: "Bahrain" },
    { value: "17", label: "Bangladesh" },
    { value: "18", label: "Barbados" },
    { value: "19", label: "Belarus" },
    { value: "20", label: "Belgium" },
    { value: "21", label: "Belize" },
    { value: "22", label: "Benin" },
    { value: "23", label: "Bermuda" },
    { value: "24", label: "Bhutan" },
    { value: "25", label: "Bolivia" },
    { value: "26", label: "Bosnia and Herzegovina" },
    { value: "27", label: "Botswana" },
    { value: "28", label: "Brazil" },
    { value: "29", label: "Brunei Darussalam" },
    { value: "30", label: "Bulgaria" },
    { value: "31", label: "Burkina Faso" },
    { value: "32", label: "Burundi" },
    { value: "33", label: "Cambodia" },
    { value: "34", label: "Cameroon" },
    { value: "35", label: "Canada" },
    { value: "36", label: "Cape Verde" },
    { value: "37", label: "Cayman Islands" },
    { value: "38", label: "Central African Republic" },
    { value: "39", label: "Chad" },
    { value: "40", label: "Chile" },
    { value: "41", label: "China" },
    { value: "42", label: "Colombia" },
    { value: "43", label: "Comoros" },
    { value: "44", label: "Congo" },
    { value: "45", label: "Congo, the Democratic Republic of the" },
    { value: "46", label: "Cook Islands" },
    { value: "47", label: "Costa Rica" },
    { value: "48", label: "Cote D'Ivoire" },
    { value: "49", label: "Croatia" },
    { value: "50", label: "Cuba" },
    { value: "51", label: "Cyprus" },
    { value: "52", label: "Czech Republic" },
    { value: "53", label: "Denmark" },
    { value: "54", label: "Djibouti" },
    { value: "55", label: "Dominica" },
    { value: "56", label: "Dominican Republic" },
    { value: "57", label: "Ecuador" },
    { value: "58", label: "Egypt" },
    { value: "59", label: "El Salvador" },
    { value: "60", label: "Equatorial Guinea" },
    { value: "61", label: "Eritrea" },
    { value: "62", label: "Estonia" },
    { value: "63", label: "Ethiopia" },
    { value: "64", label: "Falkland Islands (Malvinas)" },
    { value: "65", label: "Faroe Islands" },
    { value: "66", label: "Fiji" },
    { value: "67", label: "Finland" },
    { value: "68", label: "France" },
    { value: "69", label: "French Guiana" },
    { value: "70", label: "French Polynesia" },
    { value: "71", label: "Gabon" },
    { value: "72", label: "Gambia" },
    { value: "73", label: "Georgia" },
    { value: "74", label: "Germany" },
    { value: "75", label: "Ghana" },
    { value: "76", label: "Gibraltar" },
    { value: "77", label: "Greece" },
    { value: "78", label: "Greenland" },
    { value: "79", label: "Grenada" },
    { value: "80", label: "Guadeloupe" },
    { value: "81", label: "Guam" },
    { value: "82", label: "Guatemala" },
    { value: "83", label: "Guinea" },
    { value: "84", label: "Guinea-Bissau" },
    { value: "85", label: "Guyana" },
    { value: "86", label: "Haiti" },
    { value: "87", label: "Holy See (Vatican City State)" },
    { value: "88", label: "Honduras" },
    { value: "89", label: "Hong Kong" },
    { value: "90", label: "Hungary" },
    { value: "91", label: "Iceland" },
    { value: "92", label: "India" },
    { value: "93", label: "Indonesia" },
    { value: "94", label: "Iran, Islamic Republic of" },
    { value: "95", label: "Iraq" },
    { value: "96", label: "Ireland" },
    { value: "97", label: "Israel" },
    { value: "98", label: "Italy" },
    { value: "99", label: "Jamaica" },
    { value: "100", label: "Japan" },
    { value: "101", label: "Jordan" },
    { value: "102", label: "Kazakhstan" },
    { value: "103", label: "Kenya" },
    { value: "104", label: "Kiribati" },
    { value: "105", label: "Korea, Democratic People's Republic of" },
    { value: "106", label: "Korea, Republic of" },
    { value: "107", label: "Kuwait" },
    { value: "108", label: "Kyrgyzstan" },
    { value: "109", label: "Lao People's Democratic Republic" },
    { value: "110", label: "Latvia" },
    { value: "111", label: "Lebanon" },
    { value: "112", label: "Lesotho" },
    { value: "113", label: "Liberia" },
    { value: "114", label: "Libyan Arab Jamahiriya" },
    { value: "115", label: "Liechtenstein" },
    { value: "116", label: "Lithuania" },
    { value: "117", label: "Luxembourg" },
    { value: "118", label: "Macao" },
    { value: "119", label: "Macedonia, the Former Yugoslav Republic of" },
    { value: "120", label: "Madagascar" },
    { value: "121", label: "Malawi" },
    { value: "122", label: "Malaysia" },
    { value: "123", label: "Maldives" },
    { value: "124", label: "Mali" },
    { value: "125", label: "Malta" },
    { value: "126", label: "Marshall Islands" },
    { value: "127", label: "Martinique" },
    { value: "128", label: "Mauritania" },
    { value: "129", label: "Mauritius" },
    { value: "130", label: "Mexico" },
    { value: "131", label: "Micronesia, Federated States of" },
    { value: "132", label: "Moldova, Republic of" },
    { value: "133", label: "Monaco" },
    { value: "134", label: "Mongolia" },
    { value: "135", label: "Montserrat" },
    { value: "136", label: "Morocco" },
    { value: "137", label: "Mozambique" },
    { value: "138", label: "Myanmar" },
    { value: "139", label: "Namibia" },
    { value: "140", label: "Nauru" },
    { value: "141", label: "Nepal" },
    { value: "142", label: "Netherlands" },
    { value: "143", label: "Netherlands Antilles" },
    { value: "144", label: "New Caledonia" },
    { value: "145", label: "New Zealand" },
    { value: "146", label: "Nicaragua" },
    { value: "147", label: "Niger" },
    { value: "148", label: "Nigeria" },
    { value: "149", label: "Niue" },
    { value: "150", label: "Norfolk Island" },
    { value: "151", label: "Northern Mariana Islands" },
    { value: "152", label: "Norway" },
    { value: "153", label: "Oman" },
    { value: "154", label: "Pakistan" },
    { value: "155", label: "Palau" },
    { value: "156", label: "Panama" },
    { value: "157", label: "Papua New Guinea" },
    { value: "158", label: "Paraguay" },
    { value: "159", label: "Peru" },
    { value: "160", label: "Philippines" },
    { value: "161", label: "Pitcairn" },
    { value: "162", label: "Poland" },
    { value: "163", label: "Portugal" },
    { value: "164", label: "Puerto Rico" },
    { value: "165", label: "Qatar" },
    { value: "166", label: "Reunion" },
    { value: "167", label: "Romania" },
    { value: "168", label: "Russian Federation" },
    { value: "169", label: "Rwanda" },
    { value: "170", label: "Saint Helena" },
    { value: "171", label: "Saint Kitts and Nevis" },
    { value: "172", label: "Saint Lucia" },
    { value: "173", label: "Saint Pierre and Miquelon" },
    { value: "174", label: "Saint Vincent and the Grenadines" },
    { value: "175", label: "Samoa" },
    { value: "176", label: "San Marino" },
    { value: "177", label: "Sao Tome and Principe" },
    { value: "178", label: "Saudi Arabia" },
    { value: "179", label: "Senegal" },
    { value: "180", label: "Seychelles" },
    { value: "181", label: "Sierra Leone" },
    { value: "182", label: "Singapore" },
    { value: "183", label: "Slovakia" },
    { value: "184", label: "Slovenia" },
    { value: "185", label: "Solomon Islands" },
    { value: "186", label: "Somalia" },
    { value: "187", label: "South Africa" },
    { value: "188", label: "Spain" },
    { value: "189", label: "Sri Lanka" },
    { value: "190", label: "Sudan" },
    { value: "191", label: "Suriname" },
    { value: "192", label: "Svalbard and Jan Mayen" },
    { value: "193", label: "Swaziland" },
    { value: "194", label: "Sweden" },
    { value: "195", label: "Switzerland" },
    { value: "196", label: "Syrian Arab Republic" },
    { value: "198", label: "Tajikistan" },
    { value: "199", label: "Tanzania, United Republic of" },
    { value: "200", label: "Thailand" },
    { value: "201", label: "Togo" },
    { value: "202", label: "Tokelau" },
    { value: "203", label: "Tonga" },
    { value: "204", label: "Trinidad and Tobago" },
    { value: "205", label: "Tunisia" },
    { value: "206", label: "Turkey" },
    { value: "207", label: "Turkmenistan" },
    { value: "208", label: "Turks and Caicos Islands" },
    { value: "209", label: "Tuvalu" },
    { value: "210", label: "Uganda" },
    { value: "211", label: "Ukraine" },
    { value: "212", label: "United Arab Emirates" },
    { value: "213", label: "United Kingdom" },
    { value: "214", label: "United States" },
    { value: "215", label: "Uruguay" },
    { value: "216", label: "Uzbekistan" },
    { value: "217", label: "Vanuatu" },
    { value: "218", label: "Venezuela" },
    { value: "219", label: "Viet Nam" },
    { value: "220", label: "Virgin Islands, British" },
    { value: "221", label: "Virgin Islands, U.s." },
    { value: "222", label: "Wallis and Futuna" },
    { value: "223", label: "Western Sahara" },
    { value: "224", label: "Yemen" },
    { value: "225", label: "Zambia" },
    { value: "226", label: "Zimbabwe" },
    { value: "197", label: "Republic of China, Taiwan" },
    { value: "453", label: "Sint Maarten (Dutch part)" },
    { value: "454", label: "Aland Islands" },
    { value: "455", label: "Bonaire, Sint Eustatius and Saba" },
    { value: "456", label: "Bouvet Island" },
    { value: "457", label: "British Indian Ocean Territory" },
    { value: "458", label: "Christmas Island" },
    { value: "459", label: "Cocos (Keeling) Islands" },
    { value: "460", label: "Curacao" },
    { value: "461", label: "Guernsey" },
    { value: "462", label: "Heard Island and McDonald Islands" },
    { value: "463", label: "Isle of Man" },
    { value: "464", label: "Jersey" },
    { value: "465", label: "Mayotte" },
    { value: "466", label: "Montenegro" },
    { value: "467", label: "Palestine" },
    { value: "468", label: "Saint Barthelemy" },
    { value: "469", label: "Saint Martin (French part)" },
    { value: "470", label: "Serbia" },
    { value: "471", label: "South Georgia and the South Sandwich Islands" },
    { value: "472", label: "South Sudan" },
    { value: "473", label: "Timor-Leste" },
    { value: "474", label: "United States Minor Outlying Islands" },
  ];
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
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
      <a className="addresslink" href="https://maps.app.goo.gl/ngRsVcKPu2c7aXJLA" target="_blank">One Iris Lane, Nashville, Tennessee</a>
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
                <Select
                  instanceId="answers_24670"
                  inputId="answers_24670"
                  placeholder="I am"
                  classNamePrefix="rs"
                  isSearchable={false}
                  options={[
                    { value: 'Buyer', label: 'Buyer' },
                    { value: 'Agent', label: 'Agent' },
                  ]}
                  value={
                    iAm ? { value: iAm, label: iAm } : null
                  }
                  onChange={(opt) => {
                    const value = (opt as { value: string } | null)?.value ?? '';
                    setIAm(value);
                  }}
                  styles={{
                    control: (base) => ({ ...base, borderRadius: 0 }),
                  }}
                />
                <input
                  type="hidden"
                  name="answers[24670][answers]"
                  value={iAm}
                />
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
                <Select
                  instanceId="contact_country_id"
                  inputId="contact_country_id"
                  placeholder="Country*"
                  classNamePrefix="rs"
                  isSearchable={true}
                  options={countryOptions}
                  value={
                    formData.country
                      ? countryOptions.find(opt => opt.value === formData.country)
                      : null
                  }
                  onChange={(opt) => {
                    const value = (opt as { value: string } | null)?.value ?? '';
                    setFormData((prev) => ({ ...prev, country: value }));
                  }}
                  styles={{
                    control: (base) => ({ ...base, borderRadius: 0 }),
                  }}
                />
                <input
                  type="hidden"
                  name="contact[country_id]"
                  value={formData.country}
                />
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
                <Select
                  instanceId="answers_24099"
                  inputId="answers_24099"
                  placeholder="I am interested in"
                  classNamePrefix="rs"
                  isMulti
                  isSearchable={false}
                  options={[
                    { value: 'One Bedroom', label: 'One Bedroom' },
                    { value: 'Two Bedrooms', label: 'Two Bedrooms' },
                    { value: 'Three Bedrooms', label: 'Three Bedrooms' },
                    { value: 'Four Bedrooms', label: 'Four Bedrooms' },
                  ] as Option[]}
                  value={formData.floorplans.map<Option>(plan => ({ value: plan, label: plan }))}
                  onChange={(selectedOptions) => {
                    const values = (selectedOptions as MultiValue<Option> | null)?.map(o => o.value) ?? [];
                    setFormData((prev) => ({ ...prev, floorplans: values }));
                  }}
                  styles={{
                    control: (base) => ({ ...base, borderRadius: 0 }),
                  }}
                />
                {formData.floorplans.map((plan, index) => (
                  <input
                    key={index}
                    type="hidden"
                    name="answers[24099][answers][]"
                    value={plan}
                  />
                ))}
              </div>
            </div>
            {iAm !== 'Agent' && (
              <div className='form-item'>
                {/* <label htmlFor="answers_24098">Are you represented by an agent?</label> */}
                <div className='dropdown-wrapper'>
                  <Select
                    instanceId="answers_24098"
                    inputId="answers_24098"
                    placeholder="Represented by an agent?"
                    classNamePrefix="rs"
                    isSearchable={false}
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' },
                    ]}
                    value={
                      formData.representedByAgent
                        ? { value: formData.representedByAgent, label: formData.representedByAgent }
                        : null
                    }
                    onChange={(opt) => {
                      const value = (opt as { value: string } | null)?.value ?? '';
                      setFormData((prev) => ({ ...prev, representedByAgent: value }));
                    }}
                    styles={{
                      control: (base) => ({ ...base, borderRadius: 0 }),
                    }}
                  />
                  <input
                    type="hidden"
                    name="answers[24098][answers]"
                    value={formData.representedByAgent}
                  />
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
      <a className="addresslink" href="https://maps.app.goo.gl/ngRsVcKPu2c7aXJLA" target="_blank">One Iris Lane, Nashville, Tennessee</a>
      <div className="form-footer-menu">
        <Footer />
      </div>
    </div>
    </div>
  );
}
