// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const toastContainer = document.getElementById('toast-container');

// Form selectors
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Common Inputs
const emailInput = document.getElementById('email-input');
const emailError = document.getElementById('email-error');
const passwordInput = document.getElementById('password-input');
const passwordError = document.getElementById('password-error');
const passwordToggle = document.getElementById('password-toggle');
const strengthMeter = document.getElementById('strength-meter');
const strengthLabel = document.getElementById('strength-label');

// --- 1. Theme Toggle System ---
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    showToast(`Switched to ${isDark ? 'Dark' : 'Light'} Mode`, 'info');
  });
}

// --- 2. Show/Hide Password ---
function setupPasswordToggle(toggleBtn, inputEl) {
  if (!toggleBtn || !inputEl) return;
  const eyeOpen = toggleBtn.querySelector('.eye-open');
  const eyeClosed = toggleBtn.querySelector('.eye-closed');

  toggleBtn.addEventListener('click', () => {
    const isPassword = inputEl.type === 'password';
    inputEl.type = isPassword ? 'text' : 'password';
    
    if (isPassword) {
      eyeOpen.classList.add('hidden');
      eyeClosed.classList.remove('hidden');
      toggleBtn.setAttribute('aria-label', 'Hide password');
    } else {
      eyeOpen.classList.remove('hidden');
      eyeClosed.classList.add('hidden');
      toggleBtn.setAttribute('aria-label', 'Show password');
    }
  });
}

if (passwordToggle && passwordInput) {
  setupPasswordToggle(passwordToggle, passwordInput);
}

const confirmPasswordInput = document.getElementById('confirm-password-input');
const confirmPasswordToggle = document.getElementById('confirm-password-toggle');
if (confirmPasswordToggle && confirmPasswordInput) {
  setupPasswordToggle(confirmPasswordToggle, confirmPasswordInput);
}

const profilePasswordInput = document.getElementById('profile-password');
const profilePasswordToggle = document.getElementById('profile-password-toggle');
if (profilePasswordToggle && profilePasswordInput) {
  setupPasswordToggle(profilePasswordToggle, profilePasswordInput);
}

const profileConfirmPasswordInput = document.getElementById('profile-confirm-password');
const profileConfirmPasswordToggle = document.getElementById('profile-confirm-password-toggle');
if (profileConfirmPasswordToggle && profileConfirmPasswordInput) {
  setupPasswordToggle(profileConfirmPasswordToggle, profileConfirmPasswordInput);
}

// --- 3. Password Strength Checker ---
if (passwordInput && strengthMeter && strengthLabel) {
  const strengthBar = strengthMeter.querySelector('.strength-bar');

  passwordInput.addEventListener('input', () => {
    evaluatePasswordStrength(passwordInput.value, strengthBar, strengthLabel);
  });
}

function evaluatePasswordStrength(password, strengthBar, strengthLabel) {
  strengthBar.className = 'strength-bar';
  
  if (!password) {
    strengthLabel.textContent = 'Empty';
    strengthLabel.setAttribute('data-strength', 'none');
    return;
  }

  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) {
    strengthBar.classList.add('weak');
    strengthLabel.textContent = 'Weak';
    strengthLabel.setAttribute('data-strength', 'weak');
  } else if (score === 2 || score === 3) {
    strengthBar.classList.add('medium');
    strengthLabel.textContent = 'Medium';
    strengthLabel.setAttribute('data-strength', 'medium');
  } else if (score >= 4) {
    strengthBar.classList.add('strong');
    strengthLabel.textContent = 'Strong';
    strengthLabel.setAttribute('data-strength', 'strong');
  }
}

// --- 4. Toast Notification Manager ---
function showToast(message, type = 'info') {
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" x2="9" y1="9" y2="15"></line><line x1="9" x2="15" y1="9" y2="15"></line></svg>`;
  } else {
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>`;
  }

  toast.innerHTML = `
    <span class="toast-icon">${iconSvg}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" aria-label="Close notification">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>
    </button>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);

  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => removeToast(toast));
  setTimeout(() => removeToast(toast), 4000);
}

function removeToast(toast) {
  if (!toast) return;
  toast.classList.remove('show');
  toast.addEventListener('transitionend', () => {
    toast.remove();
  });
}

// --- 5. Form Validation Helpers ---
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

function showInputError(input, errorElement, message) {
  if (!input || !errorElement) return;
  input.classList.add('invalid');
  errorElement.textContent = message;
  errorElement.classList.add('visible');
}

function clearInputError(input, errorElement) {
  if (!input || !errorElement) return;
  input.classList.remove('invalid');
  errorElement.textContent = '';
  errorElement.classList.remove('visible');
}

if (emailInput && emailError) {
  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('invalid') && validateEmail(emailInput.value)) {
      clearInputError(emailInput, emailError);
    }
  });
}

if (passwordInput && passwordError) {
  passwordInput.addEventListener('input', () => {
    if (passwordInput.classList.contains('invalid') && passwordInput.value.length >= 8) {
      clearInputError(passwordInput, passwordError);
    }
  });
}

// --- 6. SIGN IN PAGE LOGIC ---
if (loginForm) {
  const rememberMe = document.getElementById('remember-me');
  const forgotPassword = document.getElementById('forgot-password');
  const submitBtn = document.getElementById('submit-btn');

  // Input preferences load
  const rememberChecked = localStorage.getItem('remember_me') === 'true';
  if (rememberChecked && rememberMe) {
    rememberMe.checked = true;
    const savedEmail = localStorage.getItem('saved_email');
    if (savedEmail && emailInput) {
      emailInput.value = savedEmail;
    }
  }

  // Action listeners
  if (forgotPassword) {
    forgotPassword.addEventListener('click', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (email && validateEmail(email)) {
        showToast(`Password reset link sent to ${email}!`, 'success');
      } else {
        showToast('Please enter a valid email address first.', 'info');
      }
    });
  }



  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    let isValid = true;

    if (!email) {
      showInputError(emailInput, emailError, 'Email is required.');
      isValid = false;
    } else if (!validateEmail(email)) {
      showInputError(emailInput, emailError, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearInputError(emailInput, emailError);
    }

    if (!password) {
      showInputError(passwordInput, passwordError, 'Password is required.');
      isValid = false;
    } else if (password.length < 8) {
      showInputError(passwordInput, passwordError, 'Password must be at least 8 characters long.');
      isValid = false;
    } else {
      clearInputError(passwordInput, passwordError);
    }

    if (!isValid) {
      showToast('Please fix validation errors before logging in.', 'error');
      return;
    }

    setLoading(true, submitBtn);

    setTimeout(() => {
      // Mock validation credentials
      if (email === 'test@example.com' && password === 'Password123!') {
        sessionStorage.setItem('is_logged_in', 'true');
        sessionStorage.setItem('user_name', 'Demo User');
        sessionStorage.setItem('user_email', 'test@example.com');
        sessionStorage.setItem('user_role', '');
        showToast('Login successful! Redirecting to dashboard...', 'success');
        if (rememberMe && rememberMe.checked) {
          localStorage.setItem('saved_email', email);
          localStorage.setItem('remember_me', 'true');
        } else {
          localStorage.removeItem('saved_email');
          localStorage.removeItem('remember_me');
        }
        setTimeout(() => {
          window.location.href = '/home.html';
        }, 1000);
      } else {
        // Also check localStorage dynamically registered accounts
        const registeredUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const matchedUser = registeredUsers.find(u => u.email === email && u.password === password);
        if (matchedUser) {
          sessionStorage.setItem('is_logged_in', 'true');
          sessionStorage.setItem('user_name', matchedUser.name);
          sessionStorage.setItem('user_email', matchedUser.email);
          sessionStorage.setItem('user_role', matchedUser.role || '');
          showToast('Login successful! Redirecting to dashboard...', 'success');
          if (rememberMe && rememberMe.checked) {
            localStorage.setItem('saved_email', email);
            localStorage.setItem('remember_me', 'true');
          }
          setTimeout(() => {
            window.location.href = '/home.html';
          }, 1000);
        } else {
          showToast('Invalid email or password. Please try again.', 'error');
          setLoading(false, submitBtn);
        }
      }
    }, 1500);
  });
}

// --- 7. SIGN UP PAGE LOGIC ---
if (signupForm) {
  const nameInput = document.getElementById('name-input');
  const nameError = document.getElementById('name-error');
  const confirmPasswordInput = document.getElementById('confirm-password-input');
  const confirmPasswordError = document.getElementById('confirm-password-error');
  const termsCheckbox = document.getElementById('terms-checkbox');
  const termsError = document.getElementById('terms-error');
  const signupBtn = document.getElementById('signup-btn');

  // Input listeners to clear validation states
  if (nameInput && nameError) {
    nameInput.addEventListener('input', () => {
      if (nameInput.classList.contains('invalid') && nameInput.value.trim().length >= 3) {
        clearInputError(nameInput, nameError);
      }
    });
  }

  if (confirmPasswordInput && confirmPasswordError) {
    confirmPasswordInput.addEventListener('input', () => {
      if (confirmPasswordInput.classList.contains('invalid') && confirmPasswordInput.value === passwordInput.value) {
        clearInputError(confirmPasswordInput, confirmPasswordError);
      }
    });
  }

  if (termsCheckbox && termsError) {
    termsCheckbox.addEventListener('change', () => {
      if (termsCheckbox.checked) {
        termsError.textContent = '';
        termsError.classList.remove('visible');
      }
    });
  }

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const isTermsChecked = termsCheckbox.checked;
    let isValid = true;

    // Name Validation
    if (!name) {
      showInputError(nameInput, nameError, 'Full name is required.');
      isValid = false;
    } else if (name.length < 3) {
      showInputError(nameInput, nameError, 'Name must be at least 3 characters long.');
      isValid = false;
    } else {
      clearInputError(nameInput, nameError);
    }

    // Email Validation
    if (!email) {
      showInputError(emailInput, emailError, 'Email is required.');
      isValid = false;
    } else if (!validateEmail(email)) {
      showInputError(emailInput, emailError, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearInputError(emailInput, emailError);
    }

    // Password Validation
    if (!password) {
      showInputError(passwordInput, passwordError, 'Password is required.');
      isValid = false;
    } else if (password.length < 8) {
      showInputError(passwordInput, passwordError, 'Password must be at least 8 characters long.');
      isValid = false;
    } else {
      clearInputError(passwordInput, passwordError);
    }

    // Confirm Password Validation
    if (!confirmPassword) {
      showInputError(confirmPasswordInput, confirmPasswordError, 'Confirming your password is required.');
      isValid = false;
    } else if (password !== confirmPassword) {
      showInputError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match.');
      isValid = false;
    } else {
      clearInputError(confirmPasswordInput, confirmPasswordError);
    }

    // Terms Validation
    if (!isTermsChecked) {
      termsError.textContent = 'You must accept the Terms & Conditions.';
      termsError.classList.add('visible');
      isValid = false;
    } else {
      termsError.textContent = '';
      termsError.classList.remove('visible');
    }

    if (!isValid) {
      showToast('Please fix registration errors.', 'error');
      return;
    }

    setLoading(true, signupBtn);

    setTimeout(() => {
      // Simulate registering user
      const registeredUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      const userExists = registeredUsers.some(u => u.email === email);
      if (userExists) {
        showToast('Email is already registered. Please login.', 'error');
      } else {
        registeredUsers.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(registeredUsers));
        showToast('Registration successful! Redirecting to sign in...', 'success');
        
        // Redirect back to login page after 1 second
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
      setLoading(false, signupBtn);
    }, 1500);
  });
}

function setLoading(isLoading, button) {
  if (!button) return;
  const btnText = button.querySelector('.btn-text');
  const spinner = button.querySelector('.spinner');
  
  const formInputs = document.querySelectorAll('.form-input, input[type="checkbox"]');

  if (isLoading) {
    button.disabled = true;
    formInputs.forEach(input => input.disabled = true);
    if (btnText) btnText.textContent = loginForm ? 'Verifying...' : 'Registering...';
    if (spinner) spinner.classList.remove('hidden');
  } else {
    button.disabled = false;
    formInputs.forEach(input => input.disabled = false);
    if (btnText) btnText.textContent = loginForm ? 'Sign In' : 'Register Account';
    if (spinner) spinner.classList.add('hidden');
  }
}

// Initialise Theme settings
initTheme();

// --- 8. HOME PAGE PORTFOLIO LOGIC ---
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  // Bind logout listener
  logoutBtn.addEventListener('click', () => {
    sessionStorage.clear();
    showToast('Logged out successfully.', 'info');
    setTimeout(() => {
      window.location.replace('/');
    }, 1000);
  });

  // Populate dynamic profile overview details on home.html load
  const displayName = document.getElementById('display-user-name');
  const displayRole = document.getElementById('display-user-role');
  const roleDisplayRow = document.getElementById('role-display-row');

  const currentName = sessionStorage.getItem('user_name') || '';
  const currentRole = sessionStorage.getItem('user_role') || '';

  if (displayName) displayName.textContent = currentName;
  if (displayRole) {
    if (currentRole) {
      displayRole.textContent = currentRole;
      if (roleDisplayRow) roleDisplayRow.style.display = 'block';
    } else {
      if (roleDisplayRow) roleDisplayRow.style.display = 'none';
    }
  }
}

// --- 9. UPDATE PROFILE FORM LOGIC ---
const profileForm = document.getElementById('profile-form');
if (profileForm) {
  const profileName = document.getElementById('profile-name');
  const profileNameError = document.getElementById('profile-name-error');
  const profileEmail = document.getElementById('profile-email');
  const profileEmailError = document.getElementById('profile-email-error');
  const profileRole = document.getElementById('profile-role');
  const profileRoleError = document.getElementById('profile-role-error');
  const profilePassword = document.getElementById('profile-password');
  const profilePasswordError = document.getElementById('profile-password-error');
  const profileConfirmPassword = document.getElementById('profile-confirm-password');
  const profileConfirmPasswordError = document.getElementById('profile-confirm-password-error');
  const profileSubmitBtn = document.getElementById('update-profile-btn');

  // Load current values dynamically (from logged in user's details, no hardcoded recruiter defaults)
  const currentName = sessionStorage.getItem('user_name') || '';
  const currentEmail = sessionStorage.getItem('user_email') || '';
  const currentRole = sessionStorage.getItem('user_role') || '';

  // Prefill inputs
  if (profileName) profileName.value = currentName;
  if (profileEmail) profileEmail.value = currentEmail;
  if (profileRole) profileRole.value = currentRole;

  // Real-time error clears
  if (profileName) {
    profileName.addEventListener('input', () => {
      if (profileName.classList.contains('invalid') && profileName.value.trim().length >= 3) {
        clearInputError(profileName, profileNameError);
      }
    });
  }
  if (profileEmail) {
    profileEmail.addEventListener('input', () => {
      if (profileEmail.classList.contains('invalid') && validateEmail(profileEmail.value)) {
        clearInputError(profileEmail, profileEmailError);
      }
    });
  }
  if (profileRole) {
    profileRole.addEventListener('input', () => {
      const val = profileRole.value.trim();
      if (profileRole.classList.contains('invalid') && (val.length === 0 || val.length >= 3)) {
        clearInputError(profileRole, profileRoleError);
      }
    });
  }

  if (profilePassword) {
    profilePassword.addEventListener('input', () => {
      if (profilePassword.classList.contains('invalid') && profilePassword.value.length >= 8) {
        clearInputError(profilePassword, profilePasswordError);
      }
    });
  }

  if (profileConfirmPassword) {
    profileConfirmPassword.addEventListener('input', () => {
      if (profileConfirmPassword.classList.contains('invalid') && profileConfirmPassword.value === profilePassword.value) {
        clearInputError(profileConfirmPassword, profileConfirmPasswordError);
      }
    });
  }

  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedName = profileName.value.trim();
    const updatedEmail = profileEmail.value.trim();
    const updatedRole = profileRole.value.trim();
    const updatedPassword = profilePassword ? profilePassword.value : '';
    const updatedConfirmPassword = profileConfirmPassword ? profileConfirmPassword.value : '';
    let isValid = true;

    if (!updatedName) {
      showInputError(profileName, profileNameError, 'Full name is required.');
      isValid = false;
    } else if (updatedName.length < 3) {
      showInputError(profileName, profileNameError, 'Name must be at least 3 characters long.');
      isValid = false;
    } else {
      clearInputError(profileName, profileNameError);
    }

    if (!updatedEmail) {
      showInputError(profileEmail, profileEmailError, 'Email address is required.');
      isValid = false;
    } else if (!validateEmail(updatedEmail)) {
      showInputError(profileEmail, profileEmailError, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearInputError(profileEmail, profileEmailError);
    }

    if (updatedRole && updatedRole.length < 3) {
      showInputError(profileRole, profileRoleError, 'Role title must be at least 3 characters long.');
      isValid = false;
    } else {
      clearInputError(profileRole, profileRoleError);
    }

    // New Password Validation (optional)
    if (updatedPassword) {
      if (updatedPassword.length < 8) {
        showInputError(profilePassword, profilePasswordError, 'Password must be at least 8 characters long.');
        isValid = false;
      } else {
        clearInputError(profilePassword, profilePasswordError);
      }

      if (!updatedConfirmPassword) {
        showInputError(profileConfirmPassword, profileConfirmPasswordError, 'Confirming your new password is required.');
        isValid = false;
      } else if (updatedPassword !== updatedConfirmPassword) {
        showInputError(profileConfirmPassword, profileConfirmPasswordError, 'Passwords do not match.');
        isValid = false;
      } else {
        clearInputError(profileConfirmPassword, profileConfirmPasswordError);
      }
    }

    if (!isValid) {
      showToast('Please fix profile validation errors.', 'error');
      return;
    }

    setLoadingProfile(true);

    setTimeout(() => {
      // 1. Update session details
      const oldEmail = sessionStorage.getItem('user_email') || currentEmail;
      sessionStorage.setItem('user_name', updatedName);
      sessionStorage.setItem('user_email', updatedEmail);
      sessionStorage.setItem('user_role', updatedRole);

      // 2. Update localStorage user list
      const registeredUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = registeredUsers.findIndex(u => u.email === oldEmail);
      if (userIndex !== -1) {
        registeredUsers[userIndex].name = updatedName;
        registeredUsers[userIndex].email = updatedEmail;
        registeredUsers[userIndex].role = updatedRole;
        if (updatedPassword) {
          registeredUsers[userIndex].password = updatedPassword;
        }
        localStorage.setItem('users', JSON.stringify(registeredUsers));
      }

      // Clear password fields for security
      if (profilePassword) profilePassword.value = '';
      if (profileConfirmPassword) profileConfirmPassword.value = '';

      showToast('Profile updated successfully! Redirecting back...', 'success');
      
      // Redirect back to dashboard
      setTimeout(() => {
        window.location.href = '/home.html';
      }, 1500);
    }, 1000);
  });

  function setLoadingProfile(isLoading) {
    if (!profileSubmitBtn) return;
    const btnText = profileSubmitBtn.querySelector('.btn-text');
    const spinner = profileSubmitBtn.querySelector('.spinner');
    const inputs = profileForm.querySelectorAll('.form-input');

    if (isLoading) {
      profileSubmitBtn.disabled = true;
      inputs.forEach(input => input.disabled = true);
      if (btnText) btnText.textContent = 'Saving...';
      if (spinner) spinner.classList.remove('hidden');
    } else {
      profileSubmitBtn.disabled = false;
      inputs.forEach(input => input.disabled = false);
      if (btnText) btnText.textContent = 'Save Profile Changes';
      if (spinner) spinner.classList.add('hidden');
    }
  }
}


