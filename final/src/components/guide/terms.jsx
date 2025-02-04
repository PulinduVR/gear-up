import React from 'react';
import '../guide/guide.css';

const Terms = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms & Conditions</h1>
      <div className="terms-content">
        <h2>1. Introduction</h2>
        <p>
          By accessing and using our platform, you agree to abide by the following terms and conditions. 
          These terms govern your use of our website, services, and any transactions made between renters 
          and item owners.
        </p>

        <h2>2. User Responsibilities</h2>
        <p>
          Users must ensure that all information provided during registration and transactions is accurate. 
          The platform does not assume responsibility for any discrepancies, disputes, or issues that arise 
          from incorrect information.
        </p>

        <h2>3. Payment and Fees</h2>
        <p>
          We charge a 20% reserve fee on all items, with 50% of that fee going to the platform as a service fee. 
          Users agree to make payments as per the site’s guidelines.
        </p>

        <h2>4. Liability</h2>
        <p>
          The platform is not liable for any damages, loss, or misuse of rental items. Our role is to facilitate 
          connections between buyers and sellers, and any disputes should be resolved between the parties involved.
        </p>

        <h2>5. Cancellations and Refunds</h2>
        <p>
          Cancellation policies may vary depending on the item owner’s terms. The reserve fee is generally non-refundable, 
          but exceptions may apply at the discretion of the item owner.
        </p>

        <h2>6. Amendments</h2>
        <p>
          We reserve the right to update or modify these terms at any time without prior notice. Continued use of the 
          platform signifies acceptance of any changes.
        </p>
      </div>
    </div>
  );
};

export default Terms;
