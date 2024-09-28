import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Contact Us</h1>
      <p className="mb-4 text-lg">
        This is a dummy contact page. In a real application, you might include a
        contact form or contact information here.
      </p>
      <div>
        <p>Email: example@example.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>Address: 123 Example Street, Example City, EX 12345</p>
      </div>
    </div>
  );
};

export default ContactPage;
