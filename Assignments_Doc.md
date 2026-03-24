# Assignment Documentation (Dcc)

This document outlines the steps taken to implement Assignments 1, 2, and 3, along with instructions on how to run each.

---

## Assignment 1: Vanilla JavaScript Webpage

### Implementation Steps
1.  **HTML Structure**: Created a semantic `index.html` with a header, contact form, and a results section.
2.  **Styling**:
    -   Created `style.css` with a modern design using CSS variables.
    -   Implemented a **Dark/Light mode** toggle.
    -   Added a background gradient, soft shadows, and clean typography (Inter font).
    -   Designed a responsive layout that adapts to mobile screens.
3.  **JavaScript Logic**:
    -   Wrote `script.js` to handle form submissions.
    -   Added a "toast" notification system to show success/error messages.
    -   Implemented logic to dynamically append submitted data to the page.

### How to Run
1.  Navigate to the folder: `AWSTL/Ass1/`.
2.  Simply open the `index.html` file in any web browser (Chrome, Firefox, Safari).
3.  Fill out the form and click "Submit" to see the toast notification and result card.
4.  Click the 🌙/☀️ icon to toggle themes.

---

## Assignment 2: React Single Page Application (SPA)

### Implementation Steps
1.  **Project Setup**: Initialized a React project using Vite (`npm create vite@latest`).
2.  **Local Data**: Created a `public/data/users.json` file to store mock user data locally (avoiding external REST API calls as requested).
3.  **Component Structure**:
    -   Created `UserList.jsx` to fetch and display data.
    -   Used `fetch('/data/users.json')` to load data.
4.  **Swiper Integration**:
    -   Installed `swiper` library.
    -   Implemented a responsive carousel to display user cards.
    -   Added profile photos using the `robohash.org` service.
5.  **Theming**: Implemented a dark/light mode toggle using React state.

### How to Run
1.  Open a terminal.
2.  Navigate to the directory: `cd AWSTL/Ass2`.
3.  Install dependencies (if not already done):
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  Open the link shown in the terminal (usually `http://localhost:5173`) to view the app.

---

## Assignment 3: React Beautification

### Implementation Steps
1.  **Analysis**: Analyzed the existing React code which had inline styles and basic layout.
2.  **Refactoring**:
    -   Moved styles to a new `index.css` file for better maintainability.
    -   Cleaned up `App.jsx` to use CSS class names instead of inline objects.
3.  **UI Enhancements**:
    -   Applied the same modern design system as Assignment 2 (Shadows, Cards, Hover effects).
    -   Integrated the **Swiper** carousel for consistent user experience across assignments.
    -   Added loading and error states for better user feedback.

### How to Run
1.  Open a terminal.
2.  Navigate to the directory: `cd AWSTL/Ass3`.
3.  Install dependencies (if not already done):
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  Open the link shown in the terminal to view the app.

---

## Assignment 4: Web Page Performance Optimization

### Problem Statement
Optimize a web page for faster loading by implementing JavaScript minification, image optimization, and lazy loading of media. Analyze the page's performance before and after these optimizations using browser developer tools.

### Implementation Steps
1.  **Unoptimized Base**: Created an `Ass4/unoptimized/` folder with blocking scripts, bulky CSS, and oversized, uncompressed JPG images loaded synchronously.
2.  **Optimization Tools**: 
    - Created a Node/Bash script (`optimize.sh` and `optimize-images.js`) to automate asset minification.
    - Used `clean-css` to minify CSS.
    - Used `terser` to minify and compress JavaScript logic.
    - Used `sharp` library to compress images and convert them into the highly efficient WebP format.
3.  **Optimized Structure**: 
    - Output files were saved to `Ass4/optimized/`.
    - Added `loading="lazy"` attributes to images in `index.html` to defer loading of offscreen images.
    - Linked the minified assets (`.min.js` and `.min.css`).
    - Used `defer` attribute on the script tag to prevent render blocking.

### How to Run
1.  Open a terminal.
2.  Navigate to the directory: `cd AWSTL/Ass4`.
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run the optimization script (if you want to manually rebuild assets):
    ```bash
    npm run build
    ```
5.  Start the local servers for both versions simultaneously:
    ```bash
    npm run dev
    ```
6.  The command runs both versions concurrently on two ports:
    - **Unoptimized**: `http://localhost:3000`
    - **Optimized**: `http://localhost:3001`

### Performance Analysis (Browser DevTools)
To analyze the "before and after" impact, use Chrome or Edge DevTools:
1.  While `npm run dev` is running, open **`http://localhost:3000`** (Unoptimized) in your browser.
2.  Open Developer Tools (`F12` or `Cmd+Option+I`) and go to the **Network** tab. Check the "Disable cache" option. Filter by "All" or "Img". Reload the page `(Cmd/Ctrl+R)`.
3.  Observe the total payload size and the waterfall chart showing slow load times due to large unoptimized assets.
4.  Next, open **`http://localhost:3001`** (Optimized) in a new tab and repeat the same Network tab analysis.
5.  Observe the drastically reduced payload size (in Kilobytes), faster load time, and the asynchronous loading behavior of WebP images (`loading="lazy"`).
6.  Alternatively, use the **Lighthouse** tab in DevTools to run a Performance audit on both versions and compare the scores.

---

## Assignment 5: React Form with Validation

### Problem Statement
Create a simple form in ReactJS that allows users to input data. Implement form validation using JavaScript to ensure correct data entry before submission. Use React state management to update the form in real-time.

### Implementation Steps
1.  **Project Setup**: Initialized a React project using Vite (`npm create vite@latest`).
2.  **State Management**: Built a fully controlled React form in `App.jsx` using `useState` hooks to track form data, validation errors, touched states, and submission progress.
3.  **Real-Time Validation**: 
    - Implemented custom JavaScript validation that triggers on input changes (after touching) and blur events.
    - Verified email formatting, username requirements, and password complexity in real-time.
4.  **Routing & Social Profile Redirection**:
    - Integrated `react-router-dom`.
    - After valid form submission, the user is navigated from `/` to `/profile`.
5.  **Advanced Social Media Features**:
    - Refactored the `/profile` route into a full social media hub.
    - Implemented **Edit Profile** functionality allowing the user to change their Display Name, Bio, and Avatar (using Dicebear URLs) via React state.
    - Built a **Post Feed** where users can create new posts and delete existing ones, updating the UI instantaneously via state arrays.
6.  **Premium UI**: 
    - Built a gorgeous interface using pure Vanilla CSS (`index.css`) with zero external UI libraries.
    - Designed with modern trends including a dark mode background, glassmorphism cards, animated background gradient shapes, and focus ring transitions.
    - Added complex UI components like avatar circles, post action buttons, and hover state interactions.

### How to Run
1.  Open a terminal.
2.  Navigate to the directory: `cd AWSTL/Ass5`.
3.  Install dependencies (if not already done):
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  Open the link shown in the terminal (usually `http://localhost:5173`) to view and interact with the form.

---

## Assignment 6: Spring Boot Configuration Management

### Problem Statement
Create a Spring Boot application for a financial institution that needs different configurations for development, testing, and production environments. Manage the configurations using `application.yml` to handle database connections, logging levels, and external service URLs.

### Implementation Steps
1.  **Project Setup**: Initialized a Spring Boot project via Spring Initializr (`java=17`, `web` dependency).
2.  **Configuration Profiles**:
    -   Created base `application.yml` to set `active` profile.
    -   Created `application-dev.yml` for development (H2 DB, INFO/DEBUG logging, dev external URL).
    -   Created `application-test.yml` for testing (H2 DB, WARN logging, test external URL).
    -   Created `application-prod.yml` for production (PostgreSQL DB, ERROR logging, prod external URL).
3.  **Controller Validation**: Built a REST endpoint `ConfigController.java` (`/config`) that utilizes `@Value` to output the current active profile properties (Database URL and External API URL) so configurations can be tested.

### How to Run
1.  Open a terminal.
2.  Navigate to the directory: `cd AWSTL/Ass6`.
3.  Ensure you have Java 17 and Maven installed.
4.  Run the application using the Maven wrapper:
    ```bash
    ./mvnw spring-boot:run
    ```
    *(To change the profile, edit `active: dev` to `test` or `prod` in `application.yml` and restart).*
5.  Open your browser and navigate to `http://localhost:8080/config` to verify the active configuration.

---

## Assignment 7: Spring Boot REST API for Booking System

### Problem Statement
Design a REST API for an online booking system where users can book, cancel, and modify reservations. Ensure the API follows REST principles and properly handles different HTTP requests.

### Implementation Steps
1.  **Project Setup**: Initialized a Spring Boot project via Spring Initializr (`java=17`, `web`, `data-jpa`, `h2` dependencies).
2.  **Domain Model**: Created a `Reservation` JPA Entity containing `id`, `customerName`, `checkInDate`, `checkOutDate`, and `roomType`.
3.  **Database Connection**: Configured in-memory H2 database via `application.yml`. Server set to port `8081` to avoid conflicts.
4.  **Repository & Service Layer**: 
    - Created `ReservationRepository` extending `JpaRepository`.
    - Created `ReservationService` encapsulating business logic for CRUD operations.
5.  **RESTful Controller**: Built `ReservationController` aligned with REST principles:
    - `POST /api/reservations`: Book a new reservation
    - `GET /api/reservations`: Retrieve all reservations
    - `GET /api/reservations/{id}`: Retrieve a specific reservation
    - `PUT /api/reservations/{id}`: Modify an existing reservation
    - `DELETE /api/reservations/{id}`: Cancel a reservation

### How to Run
1.  Open a terminal.
2.  Navigate to the directory: `cd AWSTL/Ass7`.
3.  Ensure Java 17 and Maven are installed.
4.  Run the application using the Maven wrapper:
    ```bash
    ./mvnw spring-boot:run
    ```
5.  The server starts on `http://localhost:8081`. The following API requests can be tested via `curl` or Postman:

    **Create Reservation (POST):**
    ```bash
    curl -X POST http://localhost:8081/api/reservations \
    -H "Content-Type: application/json" \
    -d '{"customerName":"John Doe","checkInDate":"2026-04-01","checkOutDate":"2026-04-05","roomType":"Deluxe"}'
    ```

    **Get All Reservations (GET):**
    ```bash
    curl http://localhost:8081/api/reservations
    ```

    **Update Reservation (PUT):**
    ```bash
    curl -X PUT http://localhost:8081/api/reservations/1 \
    -H "Content-Type: application/json" \
    -d '{"customerName":"John Doe","checkInDate":"2026-04-02","checkOutDate":"2026-04-05","roomType":"Suite"}'
    ```

    **Cancel Reservation (DELETE):**
    ```bash
    curl -X DELETE http://localhost:8081/api/reservations/1
    ```
