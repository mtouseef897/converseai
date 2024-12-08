import Accordion from "@/components/frontend/Accordion";
import Footer from "@/components/frontend/Footer";
import Header from "@/components/frontend/Header";
import Hero2 from "@/components/frontend/Hero2";
import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

export default async function FAQS() {
  const faqs = [
    {
      title: "How does Converse AI benefit businesses?",
      brief:
        "It streamlines document management, handles customer inquiries, and is trusted by financial institutions",
    },
    {
      title: "Can Converse AI handle different document types?",
      brief:
        "It streamlines document management, handles customer inquiries, and is trusted by financial institutions",
    },
    {
      title: "Is Converse AI secure?",
      brief:
        "It streamlines document management, handles customer inquiries, and is trusted by financial institutions",
    },
  ];

  return (
    <>
      <Header />
      <Hero2 title="contact us" />
      <div className="py-16 md:py-24 content-container">
        <section className="flex flex-col md:flex-row justify-between items-start px-6 md:px-20 py-10 bg-white">
          {/* Left Section */}
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-4">
              Get in touch with us directly
            </h2>
            <p className="text-gray-600 mb-6">
              We are here to help! Tell us how we can help & we’ll be in touch
              with an expert within the next 24 hours.
            </p>
            <div className="mb-4 flex items-center">
              <Mail className="w-5 h-5 text-blue-600 mr-2" />
              <a
                href="mailto:converse.ai@gmail.com"
                className="text-blue-600 hover:underline"
              >
                converse.ai@gmail.com
              </a>
            </div>
            <div className="mb-4 flex items-center">
              <Phone className="w-5 h-5 text-blue-600 mr-2" />
              <a
                href="tel:+923051234567"
                className="text-blue-600 hover:underline"
              >
                +92 305 1234567
              </a>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-800 hover:text-blue-600">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-800 hover:text-blue-600">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-800 hover:text-blue-600">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-800 hover:text-blue-600">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="max-w-lg w-full border-2 border-blue-200 rounded-md p-6">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1">
                    Enter your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Muhammad Talha"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="converse.ai@gmail.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-1">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+92 305 1234567"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    placeholder="Converse Ai"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Your message here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
              >
                Send your message
              </button>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
