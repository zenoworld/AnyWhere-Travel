import React, { useState } from 'react';
import Step1Cart from '../component/bookingComponents/step1/Step1Cart';
import Step2Details from '../component/bookingComponents/step2/Step2Details';
import Step3Payment from '../component/bookingComponents/step3/Step3Payment';
import Step4Completed from '../component/bookingComponents/step4/Step4Completed';
import ProgressBar from '../component/bookingComponents/progressBar/ProgressBar';
import '../style/Booking.css';
import Subtitle from '../shared/Subtitle';

const Booking = ({ tour }) => {
  const [step, setStep] = useState(1);

  const next = () => setStep((prev) => Math.min(prev + 1, 4));
  const prev = () => setStep((prev) => Math.max(prev - 1, 1));


  const [formData, setFormData] = useState({
    Destination: tour.title,
    price: tour.pricePerDay,
    fullname: '',
    email: '',
    phone: '',
    telephone:'',
    country: '',
    city: '',
    state:'',
    pinCode:'',
    date: '',
    adultCount: 1,
    childrenCount: 0,
    totalPrice: 0,
    paymentMethod: '',
    cardname:'',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    additionalDetails:''
  })



  const renderStep = () => {
    switch (step) {
      case 1: return <Step1Cart data={tour} next={next} />;

      case 2: return <Step2Details formData={formData} setFormData={setFormData} data={tour} next={next} prev={prev} />;


      case 3: return <Step3Payment formData={formData}
          setFormData={setFormData} data={tour} next={next} prev={prev} />;


      case 4: return <Step4Completed formData={formData}
           data={tour} />;
      default: return null;
    }
  };

  return (
    <div className="booking_container">
      <Subtitle Subtitle="Booking" className="subtitle-explore" />
      <ProgressBar step={step} />
      <section className="step-content">
        {renderStep()}
      </section>

    </div>
  );
}

export default Booking;
// Note: Ensure you have the necessary CSS files in the same directory as this component for styling.