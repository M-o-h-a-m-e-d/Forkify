import recipeAdd from '../views/recipeAdd';
import * as modelUploadRecipe from '../model/modelUploadRecipe';
import { GEN_ING_ERR_MSG } from '../helpers';
import * as model from '../model/model';
const recipeaddHandler = async function (recipe) {
  try {
    await modelUploadRecipe.uploadRecipe(recipe);
    console.log(model.recipe.id);

    window.location = '#' + model.recipe.id;
    model.addToBookmarks();
  } catch (error) {
    if (error.message.startsWith('ing-format')) {
      const ingElement = +error.message.slice(-1);
      recipeAdd.renderError({
        errmsg: GEN_ING_ERR_MSG(ingElement),
        elementNumber: ingElement + 5,
      });
    } else {
      recipeAdd.renderError({
        errmsg: error.message,
        elementNumber: 5,
      });
    }
  }
};
recipeAdd.addHandlerUploadRecipe(recipeaddHandler);
