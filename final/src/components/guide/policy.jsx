import React from 'react';
import '../guide/guide.css';

const Policy = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Rental Policy</h1>
      <div className="terms-content">
        <h2>1. Reservation Process</h2>
        <p>
          To rent an item, select the dates you need, and the system will display an estimated cost. 
          Once you've confirmed the reservation, you’ll be required to make a 20% advance payment to 
          secure the item. The remaining balance can be settled directly with the item owner.
        </p>

        <h2>2. Fees and Payments</h2>
        <p>
          The reserve fee is 20% of the estimated rental cost, and 50% of that fee is retained by us 
          as a service charge. The remaining payment terms are decided between you and the item owner, 
          and we do not intervene in that process.
        </p>

        <h2>3. Item Condition</h2>
        <p>
          We strongly recommend inspecting items in person before finalizing any transaction. 
          The platform is not responsible for the condition, damages, or authenticity of the items listed.
        </p>

        <h2>4. Cancellations</h2>
        <p>
          In case of cancellation, the reserve fee is generally non-refundable. However, exceptions 
          may be made at the item owner’s discretion.
        </p>

        <h2>5. Ownership of Items</h2>
        <p>
          The items listed for rent on our platform remain the property of the individual owners. 
          Our platform acts solely as a connector between renters and owners and does not take 
          ownership or responsibility for the items.
        </p>
      </div>
    </div>
  );
};

export default Policy;
