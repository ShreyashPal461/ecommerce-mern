import { useNavigate } from 'react-router-dom'
import { resolveImageUrl } from '../../../../util/resolveImageUrl'

interface ElectronicCategoryCardItem {
  categoryId: string;
  image: string;
  name: string;
}

const ElectronicCategoryCard = ({ item }: { item: ElectronicCategoryCardItem }) => {
  const navigate=useNavigate();

  return (
    <div onClick={()=>navigate(`/products/${item.categoryId}`)} className='flex w-20 flex-col items-center gap-3 cursor-pointer'>
        <img className='object-contain h-10' src={resolveImageUrl(item.image)} alt={item.name} />
        <h2 className='font-semibold text-sm'>{item.name}</h2>
  
    </div>
  )
}

export default ElectronicCategoryCard