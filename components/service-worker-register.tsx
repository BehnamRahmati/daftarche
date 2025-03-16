import WithUser from '@/app/[locale]/dashboard/with-user'
import { TUser } from '@/lib/types'
import SWClient from './sw-client'

const ServiceWorkerRegister = ({user}: {user : TUser}) => {
     
    return <SWClient user={user} />
}

export default WithUser(ServiceWorkerRegister)
