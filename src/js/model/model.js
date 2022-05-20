import { API_URL, API_KEY } from '../config';
import { RECIPES_PER_PAGE } from '../config';
import { FETCH_URL } from '../helpers';
export let recipe = {};
export let recipeSearch = [];
export let maxPages;
export let currSearchPage;
export let bookmarks =
  JSON.parse(window.localStorage.getItem('bookmarks')) || [];
const isBookmarked = () =>
  bookmarks.some(recipe => recipe.id === window.location.hash.slice(1));

export const updateRecipe = data => (recipe = data);

export async function getRecipeData(id, errMessage) {
  try {
    let res = await FETCH_URL(API_URL + id, errMessage);
    recipe = res.data.recipe;
    recipe.bookmarked = isBookmarked();
  } catch (error) {
    throw error;
  }
}
export async function getRecipeSearch(query, errMessage) {
  try {
    let res = await FETCH_URL(
      API_URL + '?search=' + query + '&key=' + API_KEY,
      errMessage
    );
    currSearchPage = 1;
    recipeSearch = res.data.recipes;
  } catch (error) {
    throw error;
  }
}
export function goToSearchPage(page = currSearchPage) {
  currSearchPage = page;
  maxPages = Math.ceil(recipeSearch.length / RECIPES_PER_PAGE);
  return recipeSearch.slice(
    (page - 1) * RECIPES_PER_PAGE,
    RECIPES_PER_PAGE * page
  );
}

export function updateServings(type) {
  const servings = recipe.servings;
  if (servings === 1 && type === 'decrease') return;
  recipe.servings = type === 'increase' ? servings + 1 : servings - 1;
  recipe.ingredients.forEach(ingredient => {
    ingredient.quantity = (ingredient.quantity / servings) * recipe.servings;
  });
}

export function addToBookmarks() {
  recipe.bookmarked = true;
  bookmarks.push(recipe);
  updateLocalStorageBoolmarks();
  // console.log('added', bookmarks);
}
export function removeFromBookmarks() {
  if (bookmarks.length === 0) return;
  recipe.bookmarked = false;
  const unBookmarked = bookmarks.findIndex(
    recipe => recipe.id === window.location.hash.slice(1)
  );
  bookmarks.splice(unBookmarked, 1);
  updateLocalStorageBoolmarks();
  // console.log('removed', bookmarks);
}

const updateLocalStorageBoolmarks = () =>
  window.localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
