import './model.js';
import { FETCH_URL } from '../helpers';
import { API_URL, API_KEY } from '../config';
import * as model from './model.js';
const generateIngredientsFormat = function (ingredients) {
  return ingredients
    .map((ing, i) => {
      const ingInfo = ing[1].replace(/\s{2,}/g, ' ').split(',');
      if (ingInfo.length !== 3) throw new Error(`ing-format ${i + 1}`);
      return ingInfo;
    })
    .map(item => {
      const [quantity, unit, description] = item;
      return {
        quantity: +quantity.trim() || null,
        unit: unit.trim(),
        description: description.trim(),
      };
    });
};

const generateRecipe = function (recipeInputs) {
  const ingredients = generateIngredientsFormat(recipeInputs.ingredients);
  const recipeData = Object.fromEntries(recipeInputs.recipeData);
  return {
    title: recipeData.title,
    source_url: recipeData.sourceUrl,
    image_url: recipeData.image,
    publisher: recipeData.publisher,
    cooking_time: recipeData.cookingTime,
    servings: recipeData.servings,
    ingredients,
  };
};

// export let ingredientsArr;
export const uploadRecipe = async function (recipeInputs) {
  try {
    const recipe = generateRecipe(recipeInputs);
    console.log(recipe);
    const data = await FETCH_URL({
      url: API_URL + '?key=' + API_KEY,
      body: JSON.stringify(recipe),
    });
    console.log('datais', data);
    model.updateRecipe(data.data.recipe);
    console.log(model.recipe);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
/* 






const filterIngredients = function (inputs) {
  let emptyIng = [];
  let wrongArrangeIng = [];

  return inputs
    .filter(input => input[0].startsWith('ingredient'))
    .filter((ing, i, arr) => {
      if (!ing[1]) emptyIng.push(i);

      if (ing[1] && emptyIng.length > 0)
        wrongArrangeIng.push({ index: i, value: ing[1] });

      if (arr.length - 1 === i && wrongArrangeIng.length > 0) {
        throw {
          message: 'arrange',
          wrongArrangeIng: wrongArrangeIng,
          start: emptyIng[0],
        };
      }
      return ing[1];
    });
};

const checkIngredientsFormat = function (ingredients) {
  return ingredients.map((ingredient, i) => {
    if (ingredient[1].split(',').length !== 3) {
      throw new Error(`ing ${i + 1}`);
    }
    return ingredient[1]
      .replace(/\s{2,}/g, ' ')
      .split(',')
      .map(item => item.trim());
  });
};

const generateIngredients = recipe =>
  checkIngredientsFormat(filterIngredients(recipe));
// export let ingredientsArr;
export const uploadRecipe = async function (recipe) {
  try {
    console.log(test);
    const ingredients = generateIngredients(recipe);
    console.log(recipe);
    console.log(ingredients);
    // await fetchURL({
    //   url: API_URL + '/key=' + API_KEY,
    //   body: recipe
    // })
  } catch (error) {
    throw error;
  }
};








*/
// export const uploadRecipe = async function (recipe) {
//   try {
//     // console.log(recipe);
//     // const ingredients = recipe
//     //   .filter(item => item[0].startsWith('ingredient') && item[1])
//     //   .map(ingredient => {
//     //     const [quantity, unit, description] = ingredient[1]
//     //       .replace(/\s{2,}/g, ' ')
//     //       .split(',')
//     //       .map(item => item.trim());
//     //     return { quantity: +quantity || null, unit, description };
//     //   });
//     /*

// */
//     // let lastIngIndex = undefined;
//     // const ingredients = recipe
//     //   .filter((item, i, arr) => {
//     //     const ing = item[0].startsWith('ingredient');
//     //     if (!ing || !item[1]) return false;

//     //     // ing && prev === '' && console.log(item[1], prev[1], '🎈');

//     //     if (i - lastIngIndex > 1) {
//     //       console.log(lastIngIndex, '🎈', i);
//     //       throw new Error(`step ${i}${lastIngIndex}`);
//     //     }
//     //     lastIngIndex = i;
//     //     return ing;
//     //   })
//     //   .map((ingredient, i) => {
//     //     if (ingredient[1].split(',').length !== 3) {
//     //       console.log(ingredient[1], '🎈🎈🎈');
//     //       throw new Error(`ing ${i + 1}`);
//     //     }
//     //     return ingredient[1]
//     //       .replace(/\s{2,}/g, ' ')
//     //       .split(',')
//     //       .map(item => item.trim());
//     //   });
//     // throw new Error();
//     let lastIngIndex = 0;
//     let emptyIng = [];
//     let wrongArrangeIng = [];
//     const ingredients = recipe
//       .filter(item => item[0].startsWith('ingredient'))
//       .filter((ing, i, arr) => {
//         if (!ing[1]) {
//           emptyIng.push(i);
//         }

//         // console.log(i, lastIngIndex);

//         if (ing[1] && emptyIng.length > 0) {
//           // console.log('✨🧨✨', lastIngIndex)
//           wrongArrangeIng.push({ index: i, value: ing[1] });
//           // console.log('wrongarr🎗🎗🎗', wrongArrangeIng);
//         }

//         if (arr.length - 1 === i && wrongArrangeIng.length > 0) {
//           // console.log('last', emptyIng, wrongArrangeIng);
//           throw {
//             message: 'arrange',
//             wrongArrangeIng: wrongArrangeIng,
//             start: emptyIng[0],
//           };
//         }
//         return ing[1];
//       })
//       .map((ingredient, i) => {
//         if (ingredient[1].split(',').length !== 3) {
//           console.log(ingredient[1], '🎈🎈🎈');
//           throw new Error(`ing ${i + 1}`);
//         }
//         return ingredient[1]
//           .replace(/\s{2,}/g, ' ')
//           .split(',')
//           .map(item => item.trim());
//       });

//     // console.log('ingredients is🎉✨✨', ingredients);
//     // await fetchURL({
//     //   url: API_URL + '/key=' + API_KEY,
//     //   body: recipe
//     // })
//   } catch (error) {
//     throw error;
//   }
// };
