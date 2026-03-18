import { useAppSelector } from "../../../ReduxToolkit/Store";
import HomeCategoryTable from "./HomeCategoryTable";

function DealsCategoryTable() {
  const { homePage} = useAppSelector((store) => store);

  return (
    <>
      <HomeCategoryTable categories={homePage.homePageData?.dealCategories}/>
    </>
  );
}


export default DealsCategoryTable