import recipeSearch from '../views/recipeSearch';
import * as model from '../model/model';
import { checkOnlineStatus } from '../helpers';
import paginationView from '../views/recipePaginationView';
import recipePaginationView from '../views/recipePaginationView';
async function renderRecipeSearch(query) {
  try {
    // if (!query.trim()) return;
    // checkOnlineStatus();
    // recipeSearch.loadSpinner();
    // await model.getRecipeSearch(query);
    // const recipe = model.recipeSearch;

    // if (recipe.length === 0)
    //   throw new Error(recipeSearch.generateQueryErrorMessage(query));
    // recipeSearch.renderMarkup(recipe);
    // paginationView.renderMarkup();

    ////////////////////////////////////////////////
    // if (!query.trim()) return;
    checkOnlineStatus();
    recipeSearch.loadSpinner();

    await model.getRecipeSearch(query);

    const recipeList = model.goToSearchPage();
    if (recipeList.length === 0)
      throw new Error(recipeSearch.generateQueryErrorMessage(query));

    recipeSearch.renderMarkup(recipeList);
    paginationView.renderMarkup(1, model.maxPages);

    ////////////////////////////////////////////////
  } catch (error) {
    console.error(error);
    recipeSearch.renderError(error.message);
  }
}
function updatePagination(goToPage) {
  const recipe = model.goToSearchPage(goToPage);
  recipeSearch.renderMarkup(recipe);
  paginationView.renderMarkup(goToPage, model.maxPages);
}
recipePaginationView.addHandlerPagination(updatePagination);
recipeSearch.addHandlerSearch(renderRecipeSearch);
