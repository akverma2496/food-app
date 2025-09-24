import RecipeForm from "../components/recipes/RecipeForm";
import RecipeList from "../components/recipes/RecipeList";

const Recipes = () => {
  return (
    <div className="container mt-4">
      <h3 className="mb-3">Manage Recipes</h3>
      <RecipeForm />
      <RecipeList />
    </div>
  );
};

export default Recipes;
