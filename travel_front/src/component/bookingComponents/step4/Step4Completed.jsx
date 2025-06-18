import React from "react";
import './Step4Completed.css';

import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";

function Step4Completed({ data, formData }) {

  const handleDownload = () => {
    const props = {
      outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: "Invoice 2025",
      orientationLandscape: false,
      compress: true,
      logo: {
        src: "/logo.jpg", // Path to your logo image
        type: 'JPG',
        width: 53.33,
        height: 30,
        margin: { top: 0, left: 0 }
      },
      stamp: {
        inAllPages: true,
        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
        type: 'JPG',
        width: 20,
        height: 20,
        margin: { top: 0, left: 0 }
      },
      business: {
        name: "AnyWhere Travel",
        address: "West Bengal , India",
        phone: "(+91) 86973 66627",
        email: "xyz@example.com",
      },
      contact: {
        label: "Invoice issued for:",
        name: formData.fullname,
        address: `${formData.city}, ${formData.state}, ${formData.country}`,
        phone: `(+91) ${formData.phone}`,
        email: formData.email,
        otherInfo: formData.additionalDetails || "No additional details provided",
      },
      invoice: {
        label: "Invoice #: ",
        num: 19,
        invDate: `Payment Date: ${new Date().toLocaleDateString()}`,
        invGenDate: `Invoice Date: ${new Date().toLocaleDateString()}`,
        headerBorder: false,
        tableBodyBorder: false,
        header: [
          {
            title: "Tour Title",
            style: {
              width: 20
            }
          },
          {
            title: "Description",
            style: {
              width: 50
            }
          },
          {
            title: "Tour Price / person",
            style: {
              width: 40,
              
            }
          },
          {
            title: "No. of Adults",
            style: {
              width: 30
            }
          },
          {
            title: "No. of Childrens",
            style: {
              width: 30
            }
          },
          { title: "Total" }
        ],
        table: [
          [
            String(data.title),
            String(data.desc),
            String(data.pricePerDay),
            String(formData.adultCount),
            String(formData.childrenCount),
            String(formData.totalPrice)
          ]
        ],

        additionalRows: [
          {
            col1: 'Total:', col2: Number(formData.totalPrice).toFixed(2)
            , col3: 'INR', style: { fontSize: 14 }
          },
          { col1: 'VAT:', col2: '0', col3: '%', style: { fontSize: 10 } },
          {
            col1: 'SubTotal:', col2: Number(formData.totalPrice).toFixed(2)
            , col3: 'INR', style: { fontSize: 10 }
          }
        ],

        invDescLabel: "Invoice Note",
        invDesc: "Thank you for booking with AnyWhere Travel. We look forward to serving you again!"
      }
      ,
      footer: {
        text: "The invoice is created on a computer and is valid without the signature and stamp.",
      },
      pageEnable: true,
      pageLabel: "Page ",
    };

    jsPDFInvoiceTemplate(props); // ✅ props is now defined above this line
  };

  return (
    <div className="completed_step_container completed-step">
      <div className="completed_div_left">
        <span className="material-icons completed-icon">check_circle</span>
        <h2>Booking Completed!</h2>
        <p>Thank you for your order. We have sent a confirmation email with your booking details.</p>
      </div>

      <div className="completed_div_right">
        <span className="completed_div_right_tourname">
          <i className="ri-map-pin-fill" style={{ color: "rgb(23, 178, 3)" }}></i>
          {data.city}
        </span>

        <span className="completed_div_right_thankyou mb-2">
          Thank you for choosing AnyWhere Travel! Your booking is now complete. We’re excited to make your journey unforgettable!
        </span>

        <span className="completed_div_right_thankyou">
          Hope you have a great time exploring {data.title}!
        </span>

        <div className="completed_div_right_contact">
          <span className="completed_div_right_contact_title">
            <img src='/gmail.png' alt='email' />
            xyz@gmail.com
          </span>

          <span className="completed_div_right_contact_title">
            <img src='/telephone.png' alt='phone' />
            +91 8697366627
          </span>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          className="btn-primary">
          Download Booking Invoice
        </button>
      </div>
    </div>
  );
}

export default Step4Completed;
