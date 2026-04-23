# Assignment 9: Educational Platform Registration System

## Problem Statement
Create a registration system for an educational platform that validates user input such as email, passwords, and age criteria. Ensure that the system handles invalid data gracefully with custom validation messages for the users.

## Features
-   **User Registration**: Robust form for new student sign-ups.
-   **Input Validation**: 
    -   Email: Proper format validation.
    -   Password: Minimum length and complexity.
    -   Age: Minimum age requirement (e.g., 18+).
-   **Graceful Error Handling**: Custom error messages displayed directly on the UI for each field.
-   **Password Strength Meter (Extra)**: Visual indicator of password security strength.
-   **Real-time Preview (Extra)**: Dynamic avatar preview based on the email provided (Gravatar integration).

## Tech Stack
-   **Backend**: Spring Boot 3.x, Hibernate Validator
-   **Frontend**: Thymeleaf, Vanilla CSS, JavaScript for real-time effects
