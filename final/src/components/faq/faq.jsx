import React, { useState } from 'react';
import '../faq/faq.css';

const FAQ = () => {
  const faqs = [
    {
      question: 'How does the rental process work?',
      answer: 'The rental process is simple. Choose your item, agree on rental terms, and pick it up or have it delivered.',
    },
    {
      question: 'What is the reserve fee, and how does it work?',
      answer: 'The reserve fee is a small percentage to hold the item for you. It’s deducted from the total rental fee.',
    },
    {
      question: 'How many items can be listed, and is there a fee for listing?',
      answer: 'You can list unlimited items. Some categories may have a small listing fee.',
    },
    {
      question: 'What if the item I rented is damaged or not as described?',
      answer: 'You can report the issue through your profile, and we’ll assist in resolving the matter or issuing refunds.',
    },
    {
      question: 'Can I cancel a reservation and get a refund?',
      answer: 'Yes, you can cancel reservations, and refunds are processed based on our cancellation policy.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>FAQ</h1>
      <div className="faq-items">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className={`faq-icon ${openIndex === index ? 'open' : ''}`}>
                ▼
              </span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
