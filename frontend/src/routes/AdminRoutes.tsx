import { Route, Routes } from 'react-router-dom'
import SellersTable from '../admin/pages/sellers/SellersTable'
import Coupon from '../admin/pages/Coupon/Coupon'
import CouponForm from '../admin/pages/Coupon/CreateCouponForm'
import GridTable from '../admin/pages/HomePage/GridTable'
import ElectronicsTable from '../admin/pages/HomePage/ElectronicsTable'
import ShopByCategoryTable from '../admin/pages/HomePage/ShopByCategoryTable'
import Deal from '../admin/pages/HomePage/Deal'

const AdminRoutes = () => {
  return (
    <Routes>
    <Route path='/' element={<SellersTable/>}/>
    <Route path='/coupon' element={<Coupon/>}/>
    <Route path='/add-coupon' element={<CouponForm/>}/>
    <Route path='/home-grid' element={<GridTable/>}/>
    <Route path='/electronics-category' element={<ElectronicsTable/>}/>
    <Route path='/shop-by-category' element={<ShopByCategoryTable/>}/>
    <Route path='/deals' element={<Deal/>}/>
  </Routes>
  )
}

export default AdminRoutes