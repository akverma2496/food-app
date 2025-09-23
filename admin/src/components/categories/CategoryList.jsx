import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/actions/categoryActions";
import CategoryItem from "./CategoryItem";
import { Spinner } from "react-bootstrap";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading && categories.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="border" role="status" variant="primary" />
      </div>
    );
  }

  return (
    <div className="d-flex flex-wrap gap-3">
      {categories.map((cat) => (
        <CategoryItem key={cat.id} category={cat} />
      ))}
    </div>
  );
};

export default CategoryList;
