import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Headings from "../../components/Home/Headings";
import { Transition } from "../../components/Helpers/Transition";
import { useSelector } from "react-redux";

export default function Landing() {
  const user = useSelector((state) => state.persisted.user.user);

  return (
    <>
      <Transition>
        <Header page={"landing"} user={user} />
        <div>
          <hr style={{ borderColor: "#ecebf3", borderStyle: "solid" }} />
        </div>
        <div className="sticky top-0 z-50 bg-white">
          <Headings />
        </div>
      </Transition>
    </>
  );
}
