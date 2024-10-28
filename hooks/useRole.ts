
import { useSession } from 'next-auth/react'

const useRole = ()=>{
    const data = useSession()
    return data?.data?.user.role
}

export default useRole;