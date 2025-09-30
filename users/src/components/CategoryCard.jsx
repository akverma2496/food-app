import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Card className="shadow-sm h-100">
      <Link to={`/category/${category.id}`} className="text-decoration-none text-dark">
        <Card.Img
          variant="top"
          src={category.image || "https://via.placeholder.com/300x200"}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="text-center">{category.name}</Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default CategoryCard;
