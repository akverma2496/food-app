import CategoryForm from "../components/categories/CategoryForm";
import CategoryList from "../components/categories/CategoryList";

const Categories = () => {
  return (
    <div className="container py-4">
      <h3 className="mb-4">Manage Categories</h3>
      <CategoryForm />
      <CategoryList />
    </div>
  );
};

export default Categories;
