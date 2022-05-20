import icons from '../../img/icons.svg';
import recipeview from '../views/recipeView';
import recipeSearch from '../views/recipeSearch';
import recipeBookmarks from '../views/recipeBookmarks';
import * as model from '../model/model';
import { checkOnlineStatus } from '../helpers';
import paginationView from '../views/recipePaginationView';

async function renderRecipeData() {
  try {
    // getting recipe id
    const id = window.location.hash.slice(1);
    if (!id) return renderBookmarks();

    renderBookmarks();
    //  checking if there no connection
    checkOnlineStatus();

    recipeview.loadSpinner();

    await model.getRecipeData(id, recipeview.errorMessage);

    document.title = model.recipe.title;

    const recipeList = model.goToSearchPage();

    recipeSearch.updateMarkup(recipeList);

    paginationView.renderMarkup(model.currSearchPage, model.maxPages);

    recipeview.renderMarkup(model.recipe);
  } catch (error) {
    console.error(error);
    // render wether the error is offline or not
    recipeview.renderError(error.message);
    document.title = 'forkify // Search over 1,000,000 recipes';
  }
}
['load', 'hashchange'].forEach(event =>
  window.addEventListener(event, renderRecipeData)
);

const updateServingsIng = function (type) {
  model.updateServings(type);
  recipeview.updateMarkup(model.recipe);
};

const renderBookmarks = function () {
  model.bookmarks.length === 0
    ? recipeBookmarks.renderError()
    : recipeBookmarks.updateMarkup(model.bookmarks);
};

const updateBookmarks = function (bookmarkBtn) {
  const bookmarkIcon = bookmarkBtn.querySelector('use');

  const bookmarked = model.recipe.bookmarked;

  bookmarked ? model.removeFromBookmarks() : model.addToBookmarks();
  bookmarkIcon.setAttribute(
    'href',
    icons + `#icon-bookmark${bookmarked ? '' : '-fill'}`
  );
  renderBookmarks();
};
recipeview.addHandlerUpdateDetails(updateBookmarks, updateServingsIng);
