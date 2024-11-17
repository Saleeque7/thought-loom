import WriteForm from "../../components/Home/WriteForm"
import { useSelector } from "react-redux"

export default function Edit() {
  const user = useSelector((state) => state.persisted.user.user);

  return (
    <>
    <WriteForm isWrite={false} form={'edit'} user={user}/>
    </>
  )
}
