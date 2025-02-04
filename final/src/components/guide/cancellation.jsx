import React from 'react';
import '../guide/guide.css';

const CancellationPolicy = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Cancellation Policy</h1>
      <div className="terms-content">
        <h2>1. Cancellation by Renters</h2>
        <p>
          If you wish to cancel a reservation, please contact the item owner as soon as possible. 
          The reserve fee (20% of the estimated rental cost) is non-refundable, as part of it is used 
          to cover our service fees. However, cancellation terms may vary depending on the item owner's 
          policy, so we recommend reviewing their individual terms before making a reservation.
        </p>

        <h2>2. Cancellation by Owners</h2>
        <p>
          Item owners have the right to cancel a reservation if necessary. In such cases, the renter 
          will be notified immediately, and a full refund of the reserve fee will be processed. 
          Renters are encouraged to explore alternative options available on the platform.
        </p>

        <h2>3. Force Majeure</h2>
        <p>
          In the event of unforeseen circumstances such as natural disasters, accidents, or other 
          events beyond anyone’s control, cancellations may be handled on a case-by-case basis. 
          Refunds will be subject to review, depending on the situation.
        </p>

        <h2>4. Disputes</h2>
        <p>
          If there are any disputes regarding a cancellation or reservation, we encourage both parties 
          to resolve the issue amicably. Our platform is not liable for any losses or damages resulting 
          from cancellations, as our role is strictly to facilitate the connection between renters 
          and item owners.
        </p>
      </div>
    </div>
  );
};

export default CancellationPolicy;
