import { useAuthStore } from "../../store/auth"

export const Home = () => {
 
  const { userDetails } = useAuthStore()

  console.log("User Details:", userDetails)

  return (
    <div>Home</div>
  )
}
