import WriteForm from "../../components/Home/WriteForm";
import { useSelector } from "react-redux";
import React from 'react'

export default function Write() {
  const user = useSelector((state) => state.persisted.user.user);
  return (
    <>
    <WriteForm isWrite={true} form={'write'} user={user}/>
    </>
  )
}
