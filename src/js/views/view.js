import icons from '../../img/icons.svg';
class View {
  errorMessage = 'No recipes found for your query. Please try again!';
  loadSpinner() {
    const markup = `
    <div class="spinner">
    <svg>
    <use href="${icons}#icon-loader"></use>
    </svg>
    </div>
    `;
    this._rootElement.innerHTML = markup;
    // this._rootElement.insertAdjacentHTML('afterbegin', );
  }

  renderError(errMsg = this.errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errMsg}</p>
      </div>`;
    this._rootElement.innerHTML = markup;
  }
  renderMarkup(recipe) {
    const markup = this._generateMarkup(recipe);
    this._rootElement.innerHTML = markup;
  }

  //  temporarly fake update method
  updateMarkup(recipe) {
    this.renderMarkup(recipe);
  }
}
export default View;
