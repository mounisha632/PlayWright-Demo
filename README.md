# Playwright Automation Testing Demo Sandbox

A feature-rich multi-page frontend sandbox created for testing automation scripts (like Playwright, Cypress, Selenium, etc.).

**Live URL:** [https://automation-demo-abg2.onrender.com/](https://automation-demo-abg2.onrender.com/)

---

## 🚀 Available Test Flows & Features

1. **Sign In / Authentication** (`/` or `/index.html`):
   - Interactive login form with email validator, show/hide password toggle, and "Remember Me" preference flags.
   - Successful login redirects dynamically to the home dashboard.

2. **Sign Up / Registration** (`/signup.html`):
   - Multi-input registration form (Name, Email, Password, Confirm Password, and Terms checkbox).
   - Live password strength indicator widget (checks length, case variations, numbers, and symbols).

3. **Session Dashboard** (`/home.html`):
   - Personalized user welcome details (displaying the exact login credentials).
   - Dynamic Profile Settings module with a dedicated "Edit Profile" router action.

4. **Profile Details Editor** (`/update-profile.html`):
   - Prefills form fields with the registered account details.
   - Allows updating Full Name, Email, Job Title/Role (optional), and New Passwords.
   - Updates persist across subsequent logins using localized client databases.
