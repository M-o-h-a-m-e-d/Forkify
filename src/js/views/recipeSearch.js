import icons from '../../img/icons.svg';
import View from './view.js';
class searchView extends View {
  _rootElement = document.querySelector('.search-results');
  formElement = document.querySelector('.search');

  generateQueryErrorMessage(query) {
    return `No recipes found for your query "${query}". Please try again!`;
  }
  _generateMarkup(recipes) {
    return recipes
      .map(
        recipe => `
              <li class="preview">
                <a class="preview__link ${
                  recipe.id === window.location.hash.slice(1)
                    ? 'preview__link--active'
                    : ''
                }" href="#${recipe.id}">
                  <figure class="preview__fig">
                    <img src="${recipe.image_url}" alt="Test" />
                  </figure>
                  <div class="preview__data">
                    <h4 class="preview__title">${recipe.title}</h4>
                    <p class="preview__publisher">${recipe.publisher}</p>
                    <div class="preview__user-generated ${
                      recipe.key ? '' : 'hidden'
                    }">
                      <svg>
                        <use href="${icons}#icon-user"></use>
                      </svg>
                    </div>
                  </div>
                </a>
              </li>
      `
      )
      .join('');
  }
  addHandlerSearch(handler) {
    this.formElement.addEventListener('submit', async function (e) {
      e.preventDefault();
      const input = this.querySelector('.search__field');
      // console.log(input);
      await handler(input.value);

      input.value = '';
    });
  }
}
export default new searchView();
