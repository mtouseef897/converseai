import Accordion from "@/components/frontend/Accordion";
import Footer from "@/components/frontend/Footer";
import Header from "@/components/frontend/Header";
import Hero2 from "@/components/frontend/Hero2";

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
      <Hero2 title="faq"/>
      <div className="py-16 md:py-24 content-container">
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            title={faq.title}
            brief={faq.brief}
            isOpen={index === 0}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}
