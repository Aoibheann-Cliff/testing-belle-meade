"use client";
import Link from 'next/link';
import Select from "react-dropdown-select";
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import { useEffect, useState } from 'react';

interface PageData {
  title: string;
  slug: string;
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
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      // Here you could send formData to your API if needed
    }
  };

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
            {teamPage && (
              <Link className="menuitem team" href={`/${teamPage.slug}`}>{teamPage.title}</Link>
            )}
            {legalPage && (
              <Link className="menuitem legal" href={`/${legalPage.slug}`}>{legalPage.title}</Link>
            )}
            <Link className="menuitem" href="https://www.hud.gov/offices/fheo/promotingfh/928-1.pdf" target="_blank">Fair Housing</Link>
            <Link className="login" href="">Log In</Link>
          </div>
        </div>
      </div>
    );
  }

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
        <h3 className="contact-form-title">Opportunities to purchase a private residence will commence in the fall of 2025. To inquire, please complete the following form.</h3>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-item">
            <label htmlFor="contactPreference">I am a:*</label>
            <select
              name="contactPreference"
              id="contactPreference"
              value={formData.contactPreference}
              onChange={handleChange}
            >
              <option value="" disabled>I am</option>
              <option value="Buyer">Prospective Buyer</option>
              <option value="Agent">Agent</option>
            </select>
            {errors.contactPreference && <span className="error">{errors.contactPreference}</span>}
          </div>
          <div className="form-item">
            <label htmlFor="firstName">First Name*</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              maxLength={150}
              placeholder="First Name*"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div className="form-item">
            <label htmlFor="lastName">Last Name*</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name*"
              maxLength={100}
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
          <div className="form-item">
            <label htmlFor="email">Email*</label>
            <input
              id="email"
              name="email"
              type="email"
              maxLength={255}
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-item">
            <label htmlFor="country">Country*</label>
            <select
              name="country"
              id="country"
              value={formData.country}
              onChange={handleChange}
            >
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
                <option value="474">United States Minor Outlying Islands</option> 
            </select>
            {errors.country && <span className="error">{errors.country}</span>}
          </div>
          <div className="form-item">
            <label htmlFor="address1">Address*</label>
            <input
              id="address1"
              name="address1"
              type="text"
              placeholder="Address*"
              maxLength={255}
              value={formData.address1}
              onChange={handleChange}
              required
            />
            {errors.address1 && <span className="error">{errors.address1}</span>}
          </div>
          <div className="form-item">
            <label htmlFor="address2">Address Line 2</label>
            <input
              id="address2"
              name="address2"
              type="text"
              placeholder="City*"
              maxLength={255}
              value={formData.address2}
              onChange={handleChange}
            />
          </div>
          <div className="form-item">
            <label htmlFor="province">State*</label>
            <input
              id="province"
              name="province"
              type="text"
              placeholder="State*"
              maxLength={255}
              value={formData.province}
              onChange={handleChange}
              required
            />
            {errors.province && <span className="error">{errors.province}</span>}
          </div>
          <div className="form-item">
            <label htmlFor="postcode">ZIP Code*</label>
            <input
              id="postcode"
              name="postcode"
              type="text"
              placeholder="Zipcode*"
              maxLength={255}
              value={formData.postcode}
              onChange={handleChange}
              required
            />
            {errors.postcode && <span className="error">{errors.postcode}</span>}
          </div>
          <div className="form-item">
            <label htmlFor="representedByAgent"><strong>Are you represented by an agent?*</strong></label>
            <select
              name="representedByAgent"
              id="representedByAgent"
              value={formData.representedByAgent}
              onChange={handleChange}
            >
              <option value="" disabled>Represented by an agent?*</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.representedByAgent && <span className="error">{errors.representedByAgent}</span>}
          </div>
          <div className="form-item">
            <label><strong>Which floorplan are you interested in:*</strong></label>
            <div className="multi-wrapper">
              <div className="answer checkbox">
                <input
                  type="checkbox"
                  name="floorplans"
                  id="one-bedroom"
                  value="One Bedroom"
                  checked={formData.floorplans.includes('One Bedroom')}
                  onChange={handleChange}
                />
                <label htmlFor="one-bedroom">One Bedroom</label>
              </div>
              <div className="answer checkbox">
                <input
                  type="checkbox"
                  name="floorplans"
                  id="two-bedrooms"
                  value="Two Bedrooms"
                  checked={formData.floorplans.includes('Two Bedrooms')}
                  onChange={handleChange}
                />
                <label htmlFor="two-bedrooms">Two Bedrooms</label>
              </div>
              <div className="answer checkbox">
                <input
                  type="checkbox"
                  name="floorplans"
                  id="three-bedrooms"
                  value="Three Bedrooms"
                  checked={formData.floorplans.includes('Three Bedrooms')}
                  onChange={handleChange}
                />
                <label htmlFor="three-bedrooms">Three Bedrooms</label>
              </div>
              <div className="answer checkbox">
                <input
                  type="checkbox"
                  name="floorplans"
                  id="four-bedrooms"
                  value="Four Bedrooms"
                  checked={formData.floorplans.includes('Four Bedrooms')}
                  onChange={handleChange}
                />
                <label htmlFor="four-bedrooms">Four Bedrooms</label>
              </div>
            </div>
            {errors.floorplans && <span className="error">{errors.floorplans}</span>}
          </div>
          <button name="button" type="submit" className="button submit template-button">Submit</button>
        </form>
      </div>
      <div className="form-footer" id="formFooter">
        <a className="addresslink" href="https://maps.app.goo.gl/ngRsVcKPu2c7aXJLA" target="_blank">4500 Harding Pike, Nashville</a>
        <div className="form-footer-menu">
          {teamPage && (
            <Link className="menuitem team" href={`/${teamPage.slug}`}>{teamPage.title}</Link>
          )}
          {legalPage && (
            <Link className="menuitem legal" href={`/${legalPage.slug}`}>{legalPage.title}</Link>
          )}
          <Link className="menuitem" href="https://www.hud.gov/offices/fheo/promotingfh/928-1.pdf" target="_blank">Fair Housing</Link>
          <Link className="login" href="">Log In</Link>
        </div>
      </div>
    </div>
  );
}
