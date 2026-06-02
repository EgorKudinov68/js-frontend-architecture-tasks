import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';

const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required('email must be a valid email').email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

// Этот объект можно использовать для того, чтобы обрабатывать ошибки сети.
// Это необязательное задание, но крайне рекомендуем попрактиковаться.
const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

// Используйте эту функцию для выполнения валидации.
// Выведите в консоль её результат, чтобы увидеть, как получить сообщения об ошибках.
const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

// BEGIN
export default () => {
  const container = document.querySelector('[data-container="sign-up"]');
  const form = container.querySelector('[data-form="sign-up"]');
  const submitButton = form.querySelector('input[type="submit"]');
  
  
  const nameInput = form.querySelector('#sign-up-name');
  const emailInput = form.querySelector('#sign-up-email');
  const passwordInput = form.querySelector('#sign-up-password');
  const passwordConfirmationInput = form.querySelector('#sign-up-password-confirmation');
  
  
  let state = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: {
      name: null,
      email: null,
      password: null,
      passwordConfirmation: null
    },
    isValid: false
  };
  
  
  const updateUI = () => {
    
    const fields = [
      { input: nameInput, errorKey: 'name' },
      { input: emailInput, errorKey: 'email' },
      { input: passwordInput, errorKey: 'password' },
      { input: passwordConfirmationInput, errorKey: 'passwordConfirmation' }
    ];
    
    fields.forEach(field => {
      const error = state.errors[field.errorKey];
      const errorDiv = field.input.nextElementSibling;
      
      if (error) {
        field.input.classList.add('is-invalid');
        if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
          errorDiv.textContent = error.message || error;
        }
      } else {
        field.input.classList.remove('is-invalid');
        if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
          errorDiv.textContent = '';
        }
      }
    });
    
    
    submitButton.disabled = !state.isValid;
  };
  
  
  const validateForm = () => {
    const fieldsToValidate = {
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation
    };
    
    const errors = validate(fieldsToValidate);
    
    
    const newErrors = {};
    ['name', 'email', 'password', 'passwordConfirmation'].forEach(field => {
      if (errors[field]) {
        newErrors[field] = errors[field];
      } else {
        newErrors[field] = null;
      }
    });
    
    state.errors = newErrors;
    state.isValid = isEmpty(errors);
    
    updateUI();
  };
  
  
  nameInput.addEventListener('input', (e) => {
    state.name = e.target.value;
    validateForm();
  });
  
  emailInput.addEventListener('input', (e) => {
    state.email = e.target.value;
    validateForm();
  });
  
  passwordInput.addEventListener('input', (e) => {
    state.password = e.target.value;
    validateForm();
  });
  
  passwordConfirmationInput.addEventListener('input', (e) => {
    state.passwordConfirmation = e.target.value;
    validateForm();
  });
  
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!state.isValid) return;
    
    
    submitButton.disabled = true;
    
    try {
      const userData = {
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      };
      
      await axios.post(routes.usersPath(), userData);
      
      
      container.innerHTML = '<div data-container="sign-up">User Created!</div>';
      
    } catch (error) {
      
      submitButton.disabled = false;
      
      if (error.response) {
        
        console.error('Server error:', error.response.data);
      } else if (error.request) {
        
        console.error(errorMessages.network.error);
        alert(errorMessages.network.error);
      } else {
        console.error('Error:', error.message);
      }
    }
  });
  
  
  validateForm();
};
// END
