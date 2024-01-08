import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="container mx-auto px-4 primary-color content-center justify-center">
    <div className="container secondary-color prose">
      <h1 className="display-4">Food Recipes</h1>
      <p className="lead">
        A curated list of recipes for the best homemade meal and delicacies.
      </p>
      <hr className="my-4" />
      <Link
        to="/recipes"
        className="btn btn-primary"
        role="button"
      >
        View Recipes
      </Link>
    </div>
  </div>
);