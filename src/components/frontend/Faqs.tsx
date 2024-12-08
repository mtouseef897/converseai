import React from "react";
import Accordion from "./Accordion";

const faqs=[
  {
    title:"How does Converse AI benefit businesses?",
    brief:"It streamlines document management, handles customer inquiries, and is trusted by financial institutions"
  },
  {
    title:"Can Converse AI handle different document types?",
    brief:"It streamlines document management, handles customer inquiries, and is trusted by financial institutions"
  },
  {
    title:"Is Converse AI secure?",
    brief:"It streamlines document management, handles customer inquiries, and is trusted by financial institutions"
  },

]
const Faqs = () => {
  return (
    <div className="bg-[url('/faqshape.png')]  bg-left bg-no-repeat">
      <div className="content-container grid md:grid-cols-2 py-16 md:py-24 gap-8 ">
        <div >
          <div className="md:max-w-[600px] mt-8 text-5xl md:text-7xl font-bold text-left">
            Frequently Asked Questions
          </div>
          <p className="text-gray-600 mt-4  md:max-w-[541px]">
            Converse AI, can be quickly deployed, allowing users to start
            interacting with their documents immediately without lengthy setup
            or development times.
          </p>
          <button className="px-8 py-3 bg-black hover:bg-accent duration-200 ease-in-out text-white text-sm font-bold rounded-full mt-8">
            View more
          </button>
        </div>
        <div>
          {
            faqs.map(
              (faq,index)=>(
                <Accordion key={index} title={faq.title} brief={faq.brief} isOpen={index===0}/>
              )
            )
          }
           
        </div>
      </div>
    </div>
  );
};

export default Faqs;
