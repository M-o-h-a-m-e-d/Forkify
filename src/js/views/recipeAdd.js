import icons from '../../img/icons.svg';
import View from './view.js';

class addRecipeView extends View {
  _rootElement = document.querySelector('.add-recipe-window');
  addRecipeButton = document.querySelector('.nav__btn--add-recipe');
  closeRecipeButton = this._rootElement.querySelector('.btn--close-modal');
  overlay = document.querySelector('.overlay');
  form = this._rootElement.querySelector('.upload');
  formElements = [...this.form.elements];

  constructor() {
    super();
    // prettier-ignore
    const showAndHideElements = [this.addRecipeButton,this.closeRecipeButton,this.overlay];
    showAndHideElements.forEach(element => {
      element.addEventListener('click', this.showOrHideAddRecipe.bind(this));
    });
  }

  _generateErrMarkup(options) {
    return `
    <div>
      <div class="ing__err--overlay">
      </div>
      <div class="error add-recipe-window-error">
        <button class="btn--close-modal">×</button>
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${options.errmsg}</p>   
      </div>
    </div>
    `;
  }

  renderError(options) {
    const errElement = this.formElements[options.elementNumber];
    this.formElements.forEach(el => (el.style = ''));
    const markup = this._generateErrMarkup(options);
    this._rootElement.insertAdjacentHTML('afterbegin', markup);
    const close = document.querySelector('.error .btn--close-modal');
    close.addEventListener(
      'click',
      () => {
        this._rootElement.firstElementChild.remove();
        errElement.style.border = '1px solid red';
        errElement.select();
      },
      { once: true }
    );
    // setTimeout(() => {

    //   elements[options.elementNumber].select();
    // }, 10000);
  }

  showOrHideAddRecipe() {
    this._rootElement.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
  }

  arrangeIngredients(ingredients) {
    let lastIng = false,
      unArrangedIngs = [];
    let ings = ingredients.filter((ing, i) => {
      if (!ing[1]) lastIng = true;
      if (ing[1] && lastIng) unArrangedIngs.push({ index: i, value: ing[1] });
      return ing[1];
    });
    if (unArrangedIngs.length === 0) return ings;
    const stratFrom = ings.length - unArrangedIngs.length + 6;

    unArrangedIngs.forEach((ing, i) => {
      this.formElements[stratFrom + i].value = ing.value;
      this.formElements[ing.index + 6].value = '';
    });
    return ings;
  }

  addHandlerUploadRecipe(handler) {
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = [...new FormData(this.form)];
      const recipeData = formData.slice(0, 6);
      const ingredients = this.arrangeIngredients(formData.slice(6));
      handler({ recipeData, ingredients });
      // setTimeout(() => {
      //   this._rootElement.firstElementChild.remove();
      //   let element = this.form.elements[Math.floor(Math.random() * 12)];
      //   element.style.border = '1px solid red';
      //   element.focus();
      // }, 1000);
    });
  }
}
export default new addRecipeView();
