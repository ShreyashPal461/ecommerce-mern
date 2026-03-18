import { useAppSelector } from '../../../ReduxToolkit/Store'
import UserAddressCard from './UserAddressCard'

const Addresses = () => {
    const { user } = useAppSelector(store => store)
    return (
        <>
            <div className='space-y-3'>
                {user.user?.addresses?.map((item) =>
                    <UserAddressCard
                        key={item._id}
                        item={item} />)}
            </div>
        </>
    )
}

export default Addresses