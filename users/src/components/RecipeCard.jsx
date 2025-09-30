import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { toast } from "react-toastify";

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...recipe, quantity: 1 }));
    toast.success(`${recipe.name} added to cart!`);
  };

  return (
    <Card className="shadow-sm h-100">
      <Card.Img
        variant="top"
        src={recipe.image || "https://via.placeholder.com/300x200"}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Text className="flex-grow-1">
          {recipe.shortDescription || ""}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="fw-bold">${recipe.price}</span>
          <div className="d-flex gap-2">
            <Button
              variant="success"
              size="sm"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              as={Link}
              to={`/recipe/${recipe.id}`}
              variant="primary"
              size="sm"
            >
              View
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
