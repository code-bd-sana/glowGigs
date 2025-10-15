import React from "react";
import Gallary from "./Gallary";
import Blog from "./Blog";
import GetInTouch from "./GetInTouch";


export default function ProfessionalsPage() {
  return (
    <div className="min-h-screen mt-16 ">
        <Gallary/>
        <Blog/>
        <GetInTouch/>
  
    </div>
  );
}
