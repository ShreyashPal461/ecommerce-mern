import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../../ReduxToolkit/Store';

const ShopByCategoryTable = () => {
    const { homePage } = useAppSelector((store) => store);
  return (
    <HomeCategoryTable categories={homePage.homePageData?.shopByCategories}/>
  )
}

export default ShopByCategoryTable