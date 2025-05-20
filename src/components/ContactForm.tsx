"use client";
import Link from 'next/link';
import Select from "react-dropdown-select";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ about: "", firstName: "", lastName: "", email: "", country: "", address: "", city: "", state: "", zipcode: "", residence: "", agent: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
  
    if (!formData.firstName) newErrors.firstName = true;
    if (!formData.lastName) newErrors.lastName = true;
    if (!formData.email) newErrors.email = true;
    if (!formData.country) newErrors.country = true;
    if (!formData.address) newErrors.address = true;
    if (!formData.city) newErrors.city = true;
    if (!formData.state) newErrors.state = true;
    if (!formData.zipcode) newErrors.zipcode = true;
    if (!formData.agent) newErrors.agent = true;
  
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0;
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    // Clear the error for that field
    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const aboutoptions = [
    {
      value: 'Buyer',
      label: 'Buyer'
    },
    {
      value: 'Agent',
      label: 'Agent'
    }
  ];

  const countryoptions = [
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Albania", label: "Albania" },
    { value: "Algeria", label: "Algeria" },
    { value: "Andorra", label: "Andorra" },
    { value: "Angola", label: "Angola" },
    { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
    { value: "Argentina", label: "Argentina" },
    { value: "Armenia", label: "Armenia" },
    { value: "Australia", label: "Australia" },
    { value: "Austria", label: "Austria" },
    { value: "Azerbaijan", label: "Azerbaijan" },
    { value: "Bahamas", label: "Bahamas" },
    { value: "Bahrain", label: "Bahrain" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Barbados", label: "Barbados" },
    { value: "Belarus", label: "Belarus" },
    { value: "Belgium", label: "Belgium" },
    { value: "Belize", label: "Belize" },
    { value: "Benin", label: "Benin" },
    { value: "Bhutan", label: "Bhutan" },
    { value: "Bolivia", label: "Bolivia" },
    { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
    { value: "Botswana", label: "Botswana" },
    { value: "Brazil", label: "Brazil" },
    { value: "Brunei", label: "Brunei" },
    { value: "Bulgaria", label: "Bulgaria" },
    { value: "Burkina Faso", label: "Burkina Faso" },
    { value: "Burundi", label: "Burundi" },
    { value: "Cabo Verde", label: "Cabo Verde" },
    { value: "Cambodia", label: "Cambodia" },
    { value: "Cameroon", label: "Cameroon" },
    { value: "Canada", label: "Canada" },
    { value: "Central African Republic", label: "Central African Republic" },
    { value: "Chad", label: "Chad" },
    { value: "Chile", label: "Chile" },
    { value: "China", label: "China" },
    { value: "Colombia", label: "Colombia" },
    { value: "Comoros", label: "Comoros" },
    { value: "Congo (Brazzaville)", label: "Congo (Brazzaville)" },
    { value: "Congo (Kinshasa)", label: "Congo (Kinshasa)" },
    { value: "Costa Rica", label: "Costa Rica" },
    { value: "Croatia", label: "Croatia" },
    { value: "Cuba", label: "Cuba" },
    { value: "Cyprus", label: "Cyprus" },
    { value: "Czech Republic", label: "Czech Republic" },
    { value: "Denmark", label: "Denmark" },
    { value: "Djibouti", label: "Djibouti" },
    { value: "Dominica", label: "Dominica" },
    { value: "Dominican Republic", label: "Dominican Republic" },
    { value: "Ecuador", label: "Ecuador" },
    { value: "Egypt", label: "Egypt" },
    { value: "El Salvador", label: "El Salvador" },
    { value: "Equatorial Guinea", label: "Equatorial Guinea" },
    { value: "Eritrea", label: "Eritrea" },
    { value: "Estonia", label: "Estonia" },
    { value: "Eswatini", label: "Eswatini" },
    { value: "Ethiopia", label: "Ethiopia" },
    { value: "Fiji", label: "Fiji" },
    { value: "Finland", label: "Finland" },
    { value: "France", label: "France" },
    { value: "Gabon", label: "Gabon" },
    { value: "Gambia", label: "Gambia" },
    { value: "Georgia", label: "Georgia" },
    { value: "Germany", label: "Germany" },
    { value: "Ghana", label: "Ghana" },
    { value: "Greece", label: "Greece" },
    { value: "Grenada", label: "Grenada" },
    { value: "Guatemala", label: "Guatemala" },
    { value: "Guinea", label: "Guinea" },
    { value: "Guinea-Bissau", label: "Guinea-Bissau" },
    { value: "Guyana", label: "Guyana" },
    { value: "Haiti", label: "Haiti" },
    { value: "Honduras", label: "Honduras" },
    { value: "Hungary", label: "Hungary" },
    { value: "Iceland", label: "Iceland" },
    { value: "India", label: "India" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Iran", label: "Iran" },
    { value: "Iraq", label: "Iraq" },
    { value: "Ireland", label: "Ireland" },
    { value: "Israel", label: "Israel" },
    { value: "Italy", label: "Italy" },
    { value: "Jamaica", label: "Jamaica" },
    { value: "Japan", label: "Japan" },
    { value: "Jordan", label: "Jordan" },
    { value: "Kazakhstan", label: "Kazakhstan" },
    { value: "Kenya", label: "Kenya" },
    { value: "Kiribati", label: "Kiribati" },
    { value: "Kuwait", label: "Kuwait" },
    { value: "Kyrgyzstan", label: "Kyrgyzstan" },
    { value: "Laos", label: "Laos" },
    { value: "Latvia", label: "Latvia" },
    { value: "Lebanon", label: "Lebanon" },
    { value: "Lesotho", label: "Lesotho" },
    { value: "Liberia", label: "Liberia" },
    { value: "Libya", label: "Libya" },
    { value: "Liechtenstein", label: "Liechtenstein" },
    { value: "Lithuania", label: "Lithuania" },
    { value: "Luxembourg", label: "Luxembourg" },
    { value: "Madagascar", label: "Madagascar" },
    { value: "Malawi", label: "Malawi" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Maldives", label: "Maldives" },
    { value: "Mali", label: "Mali" },
    { value: "Malta", label: "Malta" },
    { value: "Marshall Islands", label: "Marshall Islands" },
    { value: "Mauritania", label: "Mauritania" },
    { value: "Mauritius", label: "Mauritius" },
    { value: "Mexico", label: "Mexico" },
    { value: "Micronesia", label: "Micronesia" },
    { value: "Moldova", label: "Moldova" },
    { value: "Monaco", label: "Monaco" },
    { value: "Mongolia", label: "Mongolia" },
    { value: "Montenegro", label: "Montenegro" },
    { value: "Morocco", label: "Morocco" },
    { value: "Mozambique", label: "Mozambique" },
    { value: "Myanmar", label: "Myanmar" },
    { value: "Namibia", label: "Namibia" },
    { value: "Nauru", label: "Nauru" },
    { value: "Nepal", label: "Nepal" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "New Zealand", label: "New Zealand" },
    { value: "Nicaragua", label: "Nicaragua" },
    { value: "Niger", label: "Niger" },
    { value: "Nigeria", label: "Nigeria" },
    { value: "North Korea", label: "North Korea" },
    { value: "North Macedonia", label: "North Macedonia" },
    { value: "Norway", label: "Norway" },
    { value: "Oman", label: "Oman" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Palau", label: "Palau" },
    { value: "Palestine", label: "Palestine" },
    { value: "Panama", label: "Panama" },
    { value: "Papua New Guinea", label: "Papua New Guinea" },
    { value: "Paraguay", label: "Paraguay" },
    { value: "Peru", label: "Peru" },
    { value: "Philippines", label: "Philippines" },
    { value: "Poland", label: "Poland" },
    { value: "Portugal", label: "Portugal" },
    { value: "Qatar", label: "Qatar" },
    { value: "Romania", label: "Romania" },
    { value: "Russia", label: "Russia" },
    { value: "Rwanda", label: "Rwanda" },
    { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
    { value: "Saint Lucia", label: "Saint Lucia" },
    { value: "Saint Vincent and the Grenadines", label: "Saint Vincent and the Grenadines" },
    { value: "Samoa", label: "Samoa" },
    { value: "San Marino", label: "San Marino" },
    { value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Senegal", label: "Senegal" },
    { value: "Serbia", label: "Serbia" },
    { value: "Seychelles", label: "Seychelles" },
    { value: "Sierra Leone", label: "Sierra Leone" },
    { value: "Singapore", label: "Singapore" },
    { value: "Slovakia", label: "Slovakia" },
    { value: "Slovenia", label: "Slovenia" },
    { value: "Solomon Islands", label: "Solomon Islands" },
    { value: "Somalia", label: "Somalia" },
    { value: "South Africa", label: "South Africa" },
    { value: "South Korea", label: "South Korea" },
    { value: "South Sudan", label: "South Sudan" },
    { value: "Spain", label: "Spain" },
    { value: "Sri Lanka", label: "Sri Lanka" },
    { value: "Sudan", label: "Sudan" },
    { value: "Suriname", label: "Suriname" },
    { value: "Sweden", label: "Sweden" },
    { value: "Switzerland", label: "Switzerland" },
    { value: "Syria", label: "Syria" },
    { value: "Taiwan", label: "Taiwan" },
    { value: "Tajikistan", label: "Tajikistan" },
    { value: "Tanzania", label: "Tanzania" },
    { value: "Thailand", label: "Thailand" },
    { value: "Timor-Leste", label: "Timor-Leste" },
    { value: "Togo", label: "Togo" },
    { value: "Tonga", label: "Tonga" },
    { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
    { value: "Tunisia", label: "Tunisia" },
    { value: "Turkey", label: "Turkey" },
    { value: "Turkmenistan", label: "Turkmenistan" },
    { value: "Tuvalu", label: "Tuvalu" },
    { value: "Uganda", label: "Uganda" },
    { value: "Ukraine", label: "Ukraine" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
    { value: "Uruguay", label: "Uruguay" },
    { value: "Uzbekistan", label: "Uzbekistan" },
    { value: "Vanuatu", label: "Vanuatu" },
    { value: "Vatican City", label: "Vatican City" },
    { value: "Venezuela", label: "Venezuela" },
    { value: "Vietnam", label: "Vietnam" },
    { value: "Yemen", label: "Yemen" },
    { value: "Zambia", label: "Zambia" },
    { value: "Zimbabwe", label: "Zimbabwe" }
  ];
  
  
  const stateoptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
  ];

  const residenceoptions = [
    {
      value: 'One Bedroom',
      label: 'One Bedroom'
    },
    {
      value: 'Two Bedroom',
      label: 'Two Bedroom'
    },
    {
      value: 'Three Bedroom',
      label: 'Three Bedroom'
    },
    {
      value: 'Four Bedroom',
      label: 'Four Bedroom'
    }
  ];

  const agentoptions = [
    {
      value: 'Yes',
      label: 'Yes'
    },
    {
      value: 'No',
      label: 'No'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateForm();
    if (!validateForm()) return;
  
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-container">
        <div className="form" id="form">
          <div className="contact-form-close" id="contactformclose">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M1 1L29 29" stroke="#4C2F48"/>
            <path d="M29 1L1 29" stroke="#4C2F48"/>
            </svg>
          </div>
          <h3 className="contact-form-thank-you">Thank you for your inquiry.</h3>
        </div>
      </div>
    )
  }

  return (
  <div className="form-container">
    <div className="form" id="form">
      <div className="contact-form-close" id="contactformclose">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M1 1L29 29" stroke="#4C2F48"/>
            <path d="M29 1L1 29" stroke="#4C2F48"/>
            </svg>
          </div>
    <h3 className="contact-form-title">Opportunities to purchase a private residence will commence in the fall of 2025.  To inquire, please complete the following form.</h3>
    <form onSubmit={handleSubmit}>
    <Select
  options={aboutoptions}
  values = {formData.about
    ? aboutoptions.find((opt) => opt.label === formData.about)
      ? [aboutoptions.find((opt) => opt.label === formData.about) as { label: string; value: string }]
      : []
    : []}
    onSelect={() => {}}
    onDeselect={() => {}}
  onChange={(values) => setFormData((prev) => ({ ...prev, about: values }))}
  placeholder="I am"
  searchable={false}
  multi={false}
  dropdownHandle={true}
  clearable={false}
  className={formData.about.length === 0 && submitted ? "border-red-500" : ""}
  contentRenderer={({ props, state }) => {
    // Custom renderer to fix placeholder visibility
    if (!state.values.length) {
      return <div className="custom-placeholder">{props.placeholder}</div>;
    }
    return <div>{state.values[0].label}</div>;
  }}
/>
<input
  type="text"
  name="firstName"
  // required
  placeholder="First Name*"
  className={`${errors.firstName ? 'border-red-500' : ''}`}
  value={formData.firstName}
  onChange={handleChange}
/>
<input
  type="text"
  name="lastName"
  // required
  placeholder="Last Name*"
  className={`${errors.lastName ? 'border-red-500' : ''}`}
  value={formData.lastName}
  onChange={handleChange}
/>
      <input
        type="email"
        name="email"
        // required
        placeholder="Email*"
        className={`${errors.lastName ? 'border-red-500' : ''}`}
        value={formData.email}
        onChange={handleChange}
      />
<Select
  options={countryoptions}
  values = {formData.country
    ? countryoptions.find((opt) => opt.label === formData.country)
      ? [countryoptions.find((opt) => opt.label === formData.country) as { label: string; value: string }]
      : []
    : []}
    onSelect={() => {}}
    onDeselect={() => {}}
  onChange={(values) => {
    const selected = values[0]?.label || "";
    setFormData((prev) => ({ ...prev, country: selected }));
  }}
  placeholder="country*"
  searchable={false}
  multi={false}
  dropdownHandle={true}
  clearable={false}
  className={`${errors.country ? 'border-red-500' : ''}`}
  contentRenderer={({ props, state }) => {
    // Custom renderer to fix placeholder visibility
    if (!state.values.length) {
      return <div className="custom-placeholder">{props.placeholder}</div>;
    }
    return <div>{state.values[0].label}</div>;
  }}
/>
<input
  type="text"
  name="address"
  // required
  placeholder="Address*"
  className={`${errors.address ? 'border-red-500' : ''}`}
  value={formData.address}
  onChange={handleChange}
/>
<input
  type="text"
  name="city"
  // required
  placeholder="City*"
  className={`${errors.city ? 'border-red-500' : ''}`}
  value={formData.city}
  onChange={handleChange}
/>
<Select
  options={stateoptions}
  values = {formData.state
    ? stateoptions.find((opt) => opt.label === formData.state)
      ? [stateoptions.find((opt) => opt.label === formData.state) as { label: string; value: string }]
      : []
    : []}
    onSelect={() => {}}
    onDeselect={() => {}}
  onChange={(values) => {
    const selected = values[0]?.label || "";
    setFormData((prev) => ({ ...prev, state: selected }));
  }}
  placeholder="state*"
  searchable={false}
  multi={false}
  dropdownHandle={true}
  clearable={false}
  className={`${errors.state ? 'border-red-500' : ''}`}
  contentRenderer={({ props, state }) => {
    // Custom renderer to fix placeholder visibility
    if (!state.values.length) {
      return <div className="custom-placeholder">{props.placeholder}</div>;
    }
    return <div>{state.values[0].label}</div>;
  }}
/>
<input
  type="text"
  name="zipcode"
  // required
  placeholder="Zipcode*"
  className={`${errors.zipcode ? 'border-red-500' : ''}`}
  value={formData.zipcode}
  onChange={handleChange}
/>
<Select
  options={residenceoptions}
  values = {formData.residence
    ? residenceoptions.find((opt) => opt.label === formData.residence)
      ? [residenceoptions.find((opt) => opt.label === formData.residence) as { label: string; value: string }]
      : []
    : []}
    onSelect={() => {}}
    onDeselect={() => {}}
  onChange={(values) => {
    const selected = values[0]?.label || "";
    setFormData((prev) => ({ ...prev, residence: selected }));
  }}
  placeholder="desired residence size"
  searchable={false}
  multi={false}
  dropdownHandle={true}
  clearable={false}
  className="custom-select"
  contentRenderer={({ props, state }) => {
    // Custom renderer to fix placeholder visibility
    if (!state.values.length) {
      return <div className="custom-placeholder">{props.placeholder}</div>;
    }
    return <div>{state.values[0].label}</div>;
  }}
/>
<Select<{ label: string, value: string }>
  options={agentoptions}
  values = {formData.agent
  ? agentoptions.find((opt) => opt.label === formData.agent)
    ? [agentoptions.find((opt) => opt.label === formData.agent) as { label: string; value: string }]
    : []
  : []}
  onSelect={() => {}}
  onDeselect={() => {}}
  onChange={(values) => {
    const selected = values[0]?.label || "";
    setFormData((prev) => ({ ...prev, agent: selected }));
  }}
  placeholder="represented by an agent?*"
  searchable={false}
  multi={false}
  dropdownHandle={true}
  clearable={false}
  className={`${errors.agent ? 'border-red-500' : ''}`}
  contentRenderer={({ props, state }) => {
    // Custom renderer to fix placeholder visibility
    if (!state.values.length) {
      return <div className="custom-placeholder">{props.placeholder}</div>;
    }
    return <div>{state.values[0].label}</div>;
  }}
/>
<input
  type="text"
  name="message"
  // required
  placeholder="Message"
  className="message"
  value={formData.message}
  onChange={handleChange}
/>
      <button type="submit" className="submit">
        SUBMIT
      </button>
    </form>
    <div>
      </div>
    </div>
    <div className="form-footer" id="formFooter">
      <a className="addresslink" href="https://maps.app.goo.gl/ngRsVcKPu2c7aXJLA" target="_blank">4500 Harding Pike, Nashville</a>
      <div className="form-footer-menu">
        <Link className="menuitem" href="/team">Team</Link>
        <Link className="menuitem" href="/legal">Legal</Link>
        <Link className="menuitem" href="https://www.hud.gov/offices/fheo/promotingfh/928-1.pdf" target="_blank">Fair Housing</Link>
        <Link className="login" href="">Log In</Link>
      </div>
      </div>
    </div>
  );
}
