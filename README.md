# Mounisha's Portfolio & Testing Sandbox

A high-fidelity, feature-rich web target built with modern glassmorphism design, vanilla HTML/CSS/JS, and Vite. Designed as a clean testing sandbox to demonstrate and run automated E2E test scripts.

## Features Included

- 🌓 **Dark/Light Mode Toggle**: Saves preferences in localStorage and applies class list tags smoothly.
- 🔑 **Show/Hide Password**: Toggle visibility of input password texts on Login, Signup, and Profile Update forms.
- 📊 **Password Strength Indicator**: Dynamic progress bar that evaluates complexity using Regex validation (Weak/Medium/Strong).
- 🏷️ **Remember Me Checkbox**: Saves email input in browser localStorage and prefills it on page load.
- ⚡ **Loading Animation**: Visual loading spinner disabled buttons and delayed callback mock to simulate authentic async request handling.
- 📱 **Responsive Design**: Designed with CSS HSL theme tokens and mobile media breakpoints.
- 🔒 **Security-Locked Home Dashboard**: Authenticated session routing redirects unauthorized guests back to the Login page.
- 👤 **Separate Profile Details Page (`/update-profile.html`)**: Click "Edit Profile Details" on the home dashboard to navigate to a dedicated editing page. Updating details validates inputs, saves changes to session storage, shows a success toast, and redirects back to `/home.html` where headers display updated values immediately.

---

## Mounisha's Recruiter Links

- **LinkedIn**: [macharam-mounisha-214302281](https://www.linkedin.com/in/macharam-mounisha-214302281/)
- **Gmail / Email**: [mounisha078@gmail.com](mailto:mounisha078@gmail.com)
- **Resume (Google Drive)**: [View Resume](https://drive.google.com/file/d/1GbYz6Z977QMO7JT8s7yE8RBDjE7V4tb7/view?usp=sharing)

---

## Local Setup & Development

First, navigate into the project directory and install the dependencies:

```bash
# Install dependencies
npm install
```

### Running the Development Server
```bash
# Starts local Vite development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building & Previewing for Production
```bash
# Compile and build files into /dist
npm run build

# Preview production build locally
npm run preview
```

---

## E2E Testing Instructions

This project is set up cleanly as a **Testing Target** for you to write your own custom Playwright or Selenium automation scripts against!

### Target E2E Scenarios to Script:
1. **Redirection Lock**: Verify that navigating to `/home.html` or `/update-profile.html` directly redirects back to `/` if unauthorized.
2. **Interactive Form Errors**: Trigger validation warnings by clicking Register/Login with empty fields.
3. **Register & Login Flow**:
   - Go to `/signup.html`.
   - Fill out name, email, password, and confirm password. Accept terms and submit.
   - Wait for the success toast and redirection back to `/`.
   - Log in using those newly created credentials and verify that the app redirects to `/home.html`.
4. **Cross-Page Profile Update Flow**:
   - On `/home.html`, click "Edit Profile Details".
   - Verify that the app redirects to `/update-profile.html`.
   - Modify the "Full Name" and "Job Title" inputs.
   - Click "Save Profile Changes".
   - Verify that the loading spinner appears, and after 1 second, the success toast pops up: "Profile updated successfully! Redirecting back...".
   - Check that the app automatically redirects back to `/home.html` within 2 seconds.
   - Verify that the welcoming greetings and details panel instantly reflect the updated profile settings!
5. **Theme Toggle**: Check that clicking the dark/light toggle updates the `<html>` element class list.
6. **Remember Me**: Verify that the email is pre-filled on index load if the checkbox was active during login.

---

## Deployment to Render

This application is ready to deploy on [Render](https://render.com) as a free Static Site:

1. Create a new **Static Site** on Render.
2. Link your Git repository containing this code.
3. Configure the following settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Click **Create Static Site**.
