// BEGIN
export default () => {
  let sum = 0;
  
  const app = document.createElement('div');
  app.innerHTML = `
    <form id="calculator-form">
      <input type="text" id="number-input" placeholder="Введите число" />
      <button type="submit" id="plus-button">+</button>
      <button type="button" id="reset-button">Сброс</button>
    </form>
    <div id="result">Сумма: 0</div>
  `;
  
  const form = app.querySelector('#calculator-form');
  const input = app.querySelector('#number-input');
  const resultDiv = app.querySelector('#result');
  
  const updateResult = () => {
    resultDiv.textContent = `Сумма: ${sum}`;
  };
  
  const resetForm = () => {
    sum = 0;
    updateResult();
    form.reset();
    input.focus();
  };
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = parseInt(input.value, 10);
    if (!isNaN(value)) {
      sum += value;
      updateResult();
    }
    form.reset();
    input.focus();
  });
  
  const resetButton = app.querySelector('#reset-button');
  resetButton.addEventListener('click', resetForm);
  
  input.focus();
  
  return app;
};
// END