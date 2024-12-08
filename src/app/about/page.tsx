import Accordion from "@/components/frontend/Accordion";
import Features from "@/components/frontend/Features";
import Footer from "@/components/frontend/Footer";
import Header from "@/components/frontend/Header";
import Hero2 from "@/components/frontend/Hero2";
import Mission from "@/components/frontend/Mission";
import Scope from "@/components/frontend/Scope";

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
      <Hero2 title="about us"/>
      <div className="py-16 md:py-24 content-container">
        <Mission/>
        <Features/>
      </div>
      <Footer />
    </>
  );
}
