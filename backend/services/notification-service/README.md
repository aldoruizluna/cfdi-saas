---
File Path: ./backend/services/notification-service/README.md
---
# Notification Service (`notification-service`)

## Purpose

This microservice is responsible for handling and dispatching various types of notifications to users based on events occurring within the platform. It decouples the notification logic from the core business services.

## Key Responsibilities

*   **Consume Events:** Listen to events published by other microservices (e.g., `InvoiceCertified`, `ExpenseApproved`, `ExpenseRejected`, `PasswordResetRequested`) via a message broker (like RabbitMQ or Kafka).
*   **Template Management:** Store and manage templates for different notification types (e.g., email HTML templates, push notification message formats).
*   **User Preference Handling:** (Future Scope) Check user preferences regarding notification delivery channels (email, in-app, push).
*   **Dispatching:** Send notifications through the appropriate channels:
    *   **Email:** Integrate with an email service provider (e.g., AWS SES, SendGrid, Mailgun).
    *   **In-App Notifications:** (Future Scope) Store notifications in a database to be fetched and displayed by the frontend.
    *   **Push Notifications:** (Future Scope) Integrate with push notification services (e.g., Firebase Cloud Messaging, Apple Push Notification Service).
*   **Error Handling & Retries:** Implement mechanisms to handle failures in sending notifications and potentially retry.

## Technology Stack (Example)

*   **Language/Framework:** Node.js / TypeScript / NestJS (or potentially Go for high throughput)
*   **Messaging:** RabbitMQ / Kafka client library.
*   **Templating Engine:** Handlebars, EJS, or similar for email templates.
*   **Database:** Potentially NoSQL (e.g., MongoDB) for storing in-app notification history, or PostgreSQL if simple.
*   **Email Provider Client:** SDK/API client for SES, SendGrid, etc.

## API Endpoints

*   Typically, this service doesn't expose many external HTTP APIs. Its primary interaction is via the message broker.
*   It might expose internal health check endpoints.
*   (Future Scope) `GET /notifications`: Endpoint for the frontend to fetch current in-app notifications for the logged-in user.
*   (Future Scope) `POST /notifications/{id}/read`: Mark an in-app notification as read.

## Configuration

*   Message broker connection details (URL, queue names, topics).
*   Email Service Provider credentials and settings (API Key, sender address).
*   Database connection string (if used for in-app notifications).
*   Paths to notification templates.
*   Push notification service credentials (if applicable).

Loaded primarily via environment variables.

## Running Locally

1.  Ensure the message broker (e.g., RabbitMQ) is running.
2.  Ensure database (if needed) is running.
3.  `npm install`
4.  Configure environment variables (especially for messaging and email provider).
5.  `npm run start:dev`

## Testing

*   `npm run test` (Unit tests, mock message consumers and dispatchers)
*   `npm run test:int` (Integration tests, potentially connecting to real broker/DB)
*   Testing involves publishing mock events to the broker and verifying that the correct notification logic is triggered.