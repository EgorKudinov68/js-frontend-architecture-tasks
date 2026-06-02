// BEGIN
export default (companies) => {
  const container = document.createElement('div');
  container.className = 'container m-3';
  
  let currentDescriptionDiv = null;
  let currentCompanyId = null;
  
  const removeDescription = () => {
    if (currentDescriptionDiv) {
      currentDescriptionDiv.remove();
      currentDescriptionDiv = null;
      currentCompanyId = null;
    }
  };
  
  const showDescription = (company) => {
    removeDescription();
    
    const descriptionDiv = document.createElement('div');
    descriptionDiv.textContent = company.description;
    container.appendChild(descriptionDiv);
    
    currentDescriptionDiv = descriptionDiv;
    currentCompanyId = company.id;
  };
  
  const handleButtonClick = (company) => {
    if (currentCompanyId === company.id) {
      removeDescription();
    } else {
      showDescription(company);
    }
  };
  
  companies.forEach(company => {
    const button = document.createElement('button');
    button.className = 'btn btn-primary';
    button.textContent = company.name;
    button.addEventListener('click', () => handleButtonClick(company));
    container.appendChild(button);
  });
  
  document.body.appendChild(container);
};
// END