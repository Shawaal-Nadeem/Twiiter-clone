# Twitter Clone Application

## Overview
I developed a Twitter clone that includes both login and signup pages. Registered users can log in by entering their email and password, which directs them to the home page displaying all users' tweets. New users can sign up by providing their details, creating an account, and then logging in.

## Features

### User Authentication
- Registered users can log in with email and password.
- New users can sign up and create an account.

### Home Page
- Displays all users' tweets.
- Users can like, dislike, and comment on tweets.
- Users can write tweets, upload pictures with captions (via URLs), and edit or delete their own tweets.
- Users cannot edit or delete others' tweets but can copy them.

### Profile Management
- Users can view other profiles.
- When viewing their own profile, users have access to a settings icon to edit their profile.
- Profile editing includes renaming the profile and changing the profile picture (via URL).
- Users can see their own tweets on their profile and others' tweets on other profiles.

### Theme Options
- Users can choose between light and dark modes.

## Technologies

### Frontend
- Next.js (TypeScript, Tailwind CSS)
- Mobile Responsive

### Backend
- Python 
- FastAPI for API development
- Database schema defined in "database.py" of repo `https://github.com/Shawaal-Nadeem/twitter_clone_backend`
- Neon database for storing user data

### Deployment
- The entire backend application was containerized using Docker and pushed to Docker Hub.
- Deployed on Microsoft Azure Container Cloud Service.

## Important Notice

**⚠️ Security Advisory:**

For security reasons, please do not use your personal or original email addresses and passwords with this application. This project is primarily focused on development and may not have robust security measures in place. Instead, create new accounts for testing purposes or use existing accounts registered with the application.

Thank you for your understanding and cooperation.

