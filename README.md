# PixelForge Nexus

A secure full-stack React app with MFA authentication and project management features tailored for Creative SkillZ LLC's game dev workflow.

## Features
- Secure Login with AWS Cognito (placeholder for local implementation)
- MFA via Google Authenticator (TOTP)
- Role-based dashboard for Admin, Project Leads, and Developers
- Project creation, completion, team assignment, document upload

## Prerequisites
- Node.js >= 18
- AWS Cognito user pool set up (optional, local auth provided)
- Google Authenticator (for MFA testing)
- Git

## Setup
1. Clone repo
2. `npm install` in both `backend` and `frontend`
3. Set environment variables as described in each folder's `.env.example`
4. `npm run dev` for both backend and frontend

## MFA Walkthrough
1. Login with email/password
2. Scan QR using Google Authenticator
3. Enter 6-digit TOTP code

Sample admin credentials are provided in the backend `.env.example` file.
