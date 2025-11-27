import React from "react";
import { BsWindows } from "react-icons/bs";
import { SiAccenture, SiAdobe, SiAmazon } from "react-icons/si";
import { FaPaypal } from "react-icons/fa";
import Button from "../Button";

const Companies = () => {
  const companies = [
    { icon: <BsWindows />, name: "Microsoft" },
    { icon: <SiAmazon />, name: "Amazon" },
    { icon: <SiAccenture />, name: "Accenture" },
    { icon: <SiAdobe />, name: "Adobe" },
    { icon: <FaPaypal />, name: "Paypal" },
  ];

  return (
    <div className="pt-16 bg-white">
      <p className="text-base text-gray-500">
        Join learners worldwide who trust us
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5">
        {companies.map((company) => (
          <Button
            key={company.name}
            variant="text"
            className="flex items-center gap-2 px-4 py-2"
          >
            {React.cloneElement(company.icon, { className: "size-6.5" })}
            <span>{company.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Companies;
