import Link from "next/link";
import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const Page = () => {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Contact Image */}
        <div className="rounded-lg overflow-hidden shadow-xl">
          <img
            src="/contact.jpg"
            alt="Our customer service team"
            className="w-full h-auto"
          />
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              We'd love to hear from you! Reach out using any of the methods
              below and our team will get back to you as soon as possible.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <FaPhone className="text-yellow-500 text-xl mr-4" />
              <div>
                <p className="font-medium">Phone</p>
                <Link href={"tel:08123444463"} className="text-gray-600">
                  +234(0) 812 344 4463
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              <FaEnvelope className="text-yellow-500 text-xl mr-4" />
              <div>
                <p className="font-medium">Email</p>
                <Link
                  href={"mailto:brooklynandbronxco@gmail.com"}
                  className="text-gray-600 max-md:text-sm"
                >
                  brooklynandbronxco@gmail.com
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              <FaMapMarkerAlt className="text-yellow-500 text-xl mr-4" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-600">Suite B11, Fudie Mall</p>
                <p className="text-gray-600">Mike Akhigbe way, Jabi</p>
              </div>
            </div>

            <div className="flex items-center">
              <FaClock className="text-yellow-500 text-xl mr-4" />
              <div>
                <p className="font-medium">Hours</p>
                <p className="text-gray-600">Monday - Saturday: 9AM - 5PM WAT</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;