# Assignment 8: Customer Feedback System

## Problem Statement
Build a Spring Boot application that interacts with a relational database to store and retrieve customer feedback for an online service. Optimize the database queries using JPQL and custom queries to retrieve insights such as the most frequent feedback topics.

## Features
-   **Feedback Submission**: Customers can submit feedback with a name, topic, rating, and detailed comments.
-   **Insight Dashboard**: A professional UI to view all feedback and statistical insights.
-   **Optimized Queries**: Uses JPQL and custom native queries to calculate the most frequent feedback topics.
-   **Sentiment Analysis (Extra)**: Automatically flags feedback as Positive, Neutral, or Negative based on ratings.
-   **Visual Analytics (Extra)**: Integrated charts to visualize feedback distribution across topics.

## Tech Stack
-   **Backend**: Spring Boot 3.x, Spring Data JPA
-   **Database**: H2 (In-memory)
-   **Frontend**: Thymeleaf, Modern CSS (Glassmorphism), Chart.js
