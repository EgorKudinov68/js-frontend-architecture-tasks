// BEGIN
export default (laptops) => {
  const form = document.querySelector('form');
  const resultDiv = document.querySelector('.result');
  
  const getFilterValues = () => {
    const processorSelect = form.querySelector('#processor');
    const frequencyInput = form.querySelector('#frequency');
    const memoryInput = form.querySelector('#memory');
    
    return {
      processor: processorSelect.value,
      frequency: frequencyInput.value ? parseFloat(frequencyInput.value) : null,
      memory: memoryInput.value ? parseInt(memoryInput.value, 10) : null
    };
  };
  
  const filterLaptops = () => {
    const filters = getFilterValues();
    
    const filtered = laptops.filter(laptop => {
      const matchesProcessor = !filters.processor || laptop.processor === filters.processor;
      const matchesFrequency = !filters.frequency || laptop.frequency >= filters.frequency;
      const matchesMemory = !filters.memory || laptop.memory >= filters.memory;
      
      return matchesProcessor && matchesFrequency && matchesMemory;
    });
    
    return filtered;
  };
  
  const render = () => {
    const filteredLaptops = filterLaptops();
    
    if (filteredLaptops.length === 0) {
      resultDiv.innerHTML = '';
      return;
    }
    
    const ul = document.createElement('ul');
    filteredLaptops.forEach(laptop => {
      const li = document.createElement('li');
      li.textContent = laptop.model;
      ul.appendChild(li);
    });
    
    resultDiv.innerHTML = '';
    resultDiv.appendChild(ul);
  };
  
  const processorSelect = form.querySelector('#processor');
  const frequencyInput = form.querySelector('#frequency');
  const memoryInput = form.querySelector('#memory');
  
  processorSelect.addEventListener('change', render);
  frequencyInput.addEventListener('input', render);
  memoryInput.addEventListener('input', render);
  
  render();
};
// END