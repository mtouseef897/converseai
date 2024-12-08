import Image from "next/image";
import React from "react";
import scopeimage from "/public/scope.jpg";

const Scope = () => {
  return (
    <div className="">
      <div className="content-container flex items-center justify-center max-md:flex-col py-16 md:py-24 gap-8 md:gap-16 ">
        <div>
          <Image src={scopeimage} alt="scope-image" />
        </div>
        <div>
          <div className="md:max-w-[600px] mt-8 text-5xl md:text-7xl font-bold text-left">
            Accessible to a wider audience
          </div>
          <p className="text-gray-600 mt-4  md:max-w-[541px]">
            Converse AI brings advanced document interaction capabilities to
            small and medium-sized businesses, as well as individuals,
            regardless of their technical expertise.
          </p>
          <p className="text-gray-600 mt-4  md:max-w-[541px]">
            Converse AI is available online, ensuring access from anywhere with
            an internet connection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scope;
