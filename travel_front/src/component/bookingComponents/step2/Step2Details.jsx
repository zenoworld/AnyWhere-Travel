import React, { useState } from "react";
import './Step2Details.css';

function Step2Details({ next, prev, data,formData, setFormData }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    telephone: '',
    country: '',
    city: '', 
    state: '',
    pinCode: '',
    adultCount: 0,
    childrenCount: 0,
    scheduleTime: '',
    additionalDetails: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = e => {
    const totalPersons = parseInt(form.adultCount) + parseInt(form.childrenCount);
    
    e.preventDefault();
    setFormData({
      ...formData,
      fullname: form.fullName,
      email: form.email,
      phone: form.phone,
      telephone: form.telephone,
      country: form.country,
      city: form.city,
      state: form.state,
      pinCode: form.pinCode,
      adultCount: form.adultCount,
      childrenCount: form.childrenCount,
      totalPrice : totalPersons * data.pricePerDay,
      date: form.scheduleTime,
      additionalDetails: form.additionalDetails,
    })

    console.log(form.adultCount + form.childrenCount);             
    console.log("Total Price: ", (form.adultCount + form.childrenCount) * data.pricePerDay);
    
    
    console.log(formData);
    
    next();
  };

  return (
    <div className="step-container">
      <h4>Your Details</h4>
      <form onSubmit={handleNext} className="form-details">


        <div className="form_group_info">
          <div className="form_group_info_inner">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />
          </div>

          <div className="form_group_info_inner">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />
          </div>

        </div>

        <div className="form_group_info">
          <div className="form_group_info_inner">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="+1 555 123 4567"
            />
          </div>

          <div className="form_group_info_inner">
            <label htmlFor="phone">Telephone Number ( Optional )</label>
            <input
              id="telephone"
              name="telephone"
              type="tel"
              value={form.telephone}
              onChange={handleChange}
              placeholder="+1 555 123 4567"
            />
          </div>

        </div>

        <div className="form_group_info">
          <div className="form_group_info_inner">
            <label htmlFor="phone">Country</label>
            <input
              id="country"
              name="country"
              type="text"
              value={form.country}
              onChange={handleChange}
              required
              placeholder="India"
            />
          </div>

          <div className="form_group_info_inner">
            <label htmlFor="phone">City</label>
            <input
              id="city"
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              required
              placeholder="Enter your City"
            />
          </div>

        </div>

        <div className="form_group_info">
          <div className="form_group_info_inner">
            <label htmlFor="phone">State</label>
            <input
              id="state"
              name="state"
              type="text"
              value={form.state}
              onChange={handleChange}
              required
              placeholder="west bengal"
            />
          </div>

          <div className="form_group_info_inner">
            <label htmlFor="phone">Pin Code</label>
            <input
              id="pinCode"
              name="pinCode"
              type="text"
              value={form.pinCode}
              onChange={handleChange}
              required
              placeholder="Enter your Pin Code"
            />
          </div>


        </div>

        <div className="form_group_info">
          <div className="form_group_info_inner">
            <label htmlFor="phone">Adult Count</label>
            <input
              id="adultCount"
              name="adultCount"
              type="number"
              value={form.adultCount}
              onChange={handleChange}
              required
              placeholder="enter number of adults"
              min="1"
              max={data?.maxPersonCount || 10}
            />
          </div>

          <div className="form_group_info_inner">
          <label htmlFor="phone">Children Count</label>
            <input
              id="childrenCount"
              name="childrenCount"
              type="number"
              value={form.childrenCount}
              onChange={handleChange}
              required
              placeholder="enter number of childrens"
              min="1"
              max={data?.maxPersonCount || 10}
            />
          </div>
        </div>
        <label htmlFor="phone">Schedule Time</label>
        <input
          id="scheduleTime"
          name="scheduleTime"
          type="date"
          value={form.scheduleTime}
          onChange={handleChange}
          required

        />



        <label htmlFor="phone">Additional Details ( Optional )</label>
        <textarea
          id="additionalDetails"
          name="additionalDetails"
          rows={4}
          type="text"
          value={form.additionalDetails}
          onChange={handleChange}
          placeholder="Any additional information you want to provide"
        />


        <div className="form-nav-buttons">
          <button type="button" className="btn-secondary" onClick={prev}>Back</button>
          <button type="submit" className="btn-primary">Next - Payment</button>
        </div>
      </form>
    </div>
  );
}

export default Step2Details;
