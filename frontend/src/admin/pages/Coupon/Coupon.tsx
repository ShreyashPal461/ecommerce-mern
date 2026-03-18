import { useEffect } from 'react'
import CouponTable from './CouponTable'
import { useAppDispatch } from '../../../ReduxToolkit/Store'
import { fetchAllCoupons } from '../../../ReduxToolkit/Admin/AdminCouponSlice'

const Coupon = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchAllCoupons(localStorage.getItem("jwt") || ""))
    }, [])
    return (
        <div>
            <CouponTable />
        </div>
    )
}

export default Coupon