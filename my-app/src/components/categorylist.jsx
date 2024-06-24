import { useEffect, useState } from 'react'
import { getCategories } from '../services/category'
import Category from './category'

function CategoryList() {
  // create state member
  const [categories, setCategories] = useState([])

  // used to perform action(s) after component gets loaded
  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    const result = await getCategories()
    if (result['status'] === 'success') {
      setCategories(result['data'])
    }
  }

  return (
    <div>
      <div>
        {categories.map((category) => {
          return (
            <Category
              title={category.title}
              details={category.details}
              image={category.image}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CategoryList
