import icons from '../../img/icons.svg';
import View from './view.js';
class paginationView extends View {
  _rootElement = document.querySelector('.search-results');

  renderMarkup(page, max) {
    if (!page) return;
    this._rootElement.insertAdjacentHTML(
      'beforeend',
      this.renderPagination(page, max)
    );
  }

  addHandlerPagination(handler) {
    this._rootElement.addEventListener('click', function (e) {
      const paginationEl = e.target.closest('button');
      if (!paginationEl) return;
      const goTo = +paginationEl.dataset.goto;
      handler(goTo);
    });
  }

  renderPagination(page, max) {
    let markup;
    const previous = `
    <button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page - 1}</span>
        </button>
      `;
    const next = `
        <button data-goto="${
          page + 1
        }" class="btn--inline pagination__btn--next">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
          <span>Page ${page + 1}</span>
          </button>
          `;
    const numbers = `<p class='preview__publisher center'>${page} of ${max} pages</p>`;
    if (page === 1 && page !== max) markup = next + numbers;

    if (page > 1 && page < max) markup = previous + next + numbers;

    if (page === max) markup = previous + numbers;

    return `<div class="pagination">${markup}</div>`;
  }
  _generateMarkup(bookmarks) {}
}
export default new paginationView();
