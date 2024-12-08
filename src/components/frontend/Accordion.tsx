"use client";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";

const Accordion = ({ isOpen = false, title, brief }:{ isOpen?:boolean, title:string, brief:string }) => {
  const [open, setOpen] = useState(isOpen);
  return (
    <div className="py-6 pb-10 border-b">
      <div className="flex items-start text-gray-800 font-bold justify-between mb-4 text-3xl ">
        <div>{title}</div>
        {open?<X onClick={()=>setOpen(false)} className="cursor-pointer"/>:<Plus onClick={()=>setOpen(true)} className="cursor-pointer"/>}
      </div>
     {open && <div className="text-gray-600 text-lg">
       {brief}
      </div>}
    </div>
  );
};

export default Accordion;
