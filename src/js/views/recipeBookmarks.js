import icons from '../../img/icons.svg';
import View from './view.js';
class bookmarksView extends View {
  _rootElement = document.querySelector('.bookmarks');
  errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  _generateMarkup(bookmarks) {
    return bookmarks
      .map(
        recipe => `
    <li class="preview">
    <a class="preview__link ${
      recipe.id === window.location.hash.slice(1) ? 'preview__link--active' : ''
    }" href="#${recipe.id}">
        <figure class="preview__fig">
        <img src="${recipe.image_url}" alt="${recipe.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${recipe.title}</h4>
          <p class="preview__publisher">${recipe.publisher}</p>
          <div class="preview__user-generated hidden">
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
}
export default new bookmarksView();
