import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Headings from "../../components/Home/Headings";
import { Transition } from "../../components/Helpers/Transition";
import PreferenceModal from "../../components/Home/PreferenceModal";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state) => state.persisted.user.user);

  const initialState = !user.articlePreference.length;

  const [showModal, setShowModal] = useState(initialState);
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  useEffect(() => {
    if (user.articlePreference.length > 0) {
      setSelectedPreferences(user.articlePreference)
      setShowModal(false);
    }
  }, [user.articlePreference]);

  return (
    <>
      <Transition>
        <Header page={"home"} user={user} />
        <div>
          <hr style={{ borderColor: "#ecebf3", borderStyle: "solid" }} />
        </div>
        <div className="sticky top-0 z-50 bg-white">
          <Headings user={user} modalOpen={()=>setShowModal(true)}/>
        </div>
      </Transition>

      <PreferenceModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedPreferences={selectedPreferences}
        setSelectedPreferences={setSelectedPreferences}
      />
    </>
  );
}
