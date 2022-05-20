// import 'core-js/full';
import 'regenerator-runtime';
// import 'element-closest-polyfill';
// import 'unfetch/polyfill';

// import { async } from 'regenerator-runtime';
// console.log(...[1, 2, 3, 5]);
// console.log(Object.values({ 1: 3 }));
import '../../sass/main.scss';
import './controllerRecipeData';
import './controllerRecipeSearch';
import './controllerRecipeAdd';
if (module.hot) {
  module.hot.accept();
}
