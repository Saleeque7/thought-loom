import React from "react";
import Header from "../../components/Header/Header";
import Dashboard from "../../components/Profile/Dashboard";
import { useSelector } from "react-redux";
import { Transition } from "../../components/Helpers/Transition";

export default function Profile() {
  const user = useSelector((state) => state.persisted.user.user);

  return (
    <Transition>
      <Header user={user}/>
      <div className="flex flex-col items-center justify-center p-6  ">
        <Dashboard  user={user}/>
      </div>
    </Transition>
  );
}
