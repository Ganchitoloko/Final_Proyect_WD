**SiteBuddy: Smart Safety for Construction Workers**

1. Project Title:  SiteBuddy: Smart Safety for Construction Workers

2. Problem Statement:

In the construction industry, especially among labours working part-time or on contracts, safety is often compromised due to a lack of access to timely information, language barriers, or poor communication of workplace risks. Hazards may appear unexpectedly, and workers are often unaware of proper procedures, their legal rights, or certified safety training such as WHMIS (Workplace Hazardous Materials Information System). This leads to preventable injuries, low morale, and limited opportunities for professional growth.

SiteBuddy addresses these issues by creating a digital space that educates, empowers, and protects workers on the field, offering tools for real-time incident reporting, safety guidance, and long-term development.

 
3. Overview of the Application’s Functionality:

SiteBuddy is a web application designed to improve jobsite safety for construction labours, starting with those in Vancouver. The app provides a multilingual, mobile-friendly platform for workers to access essential safety resources based on common tasks (e.g., working at heights, handling machinery, lifting loads). A core feature is the "Report a Hazard" tool that lets users quickly submit risk alerts with descriptions and photos, anonymously if desired.

Additionally, SiteBuddy integrates WHMIS education by offering simplified guides and quizzes about hazardous materials. It also envisions a future feature allowing users to track their safety knowledge and earn certifications or badges, which could help strengthen their job prospects.

The app promotes empowerment through education, with a section that outlines labour rights in Canada, translated into multiple languages. A roadmap includes features like peer safety tips, incident maps, and access to local training programs.

With SiteBuddy, construction workers will feel more informed, protected, and connected to resources that enhance both their safety and their career path.


4. Technology Stack:

Frontend:
Vite + React.js + CSS

React Router for navigation

Responsive layout

Backend:
Node.js + Express

MongoDB (Mongoose) for all collections

JWT-based user authentication

Cloudinary for image upload

Google Translate API for dynamic multilingual support

Deployment & Tools:
Firebase Hosting

GitHub (version control)

Postman for API testing


5. Core Features (Implemented):

Submit hazard reports with optional photo

View multilingual safety rights

WHMIS quiz module + score tracking

Quick safety tips by task

Mobile responsive design

Admin dashboard: view users and reports


Additional (Future) Features:

Safety knowledge tracker (badges/certifications)

Peer-shared safety forum

Interactive incident map

Integration with local training programs


6. User Stories:

As a laborer, I want to report hazards quickly.

As an immigrant worker, I want safety instructions in my language.

As a supervisor, I want to view reports from my team.

As a learner, I want to take quizzes to improve my knowledge.

Architecture Diagram

<img width="1034" alt="HLA" src="https://github.com/user-attachments/assets/60fdc54f-7ef6-4e33-8019-e638dae9a12e" />


Firestore ERD

<img width="916" alt="EDR " src="https://github.com/user-attachments/assets/d3025e8f-d283-401b-a00e-cc8e6bfe3092" />


For the UI design I will use this design as inspiration:
https://dribbble.com/shots/25726436-Safety-Level-5


MongoDB - Main Collections

*  users

 Stores user profiles, including name, email, password (hashed), role (worker/supervisor), preferred

language, and registration date.

*  reports

 Contains reports submitted by users or anonymous visitors. Each report includes a title, description, photo

URL, location, timestamp, and anonymity flag.

*  quiz_results

 Saves each user's WHMIS quiz submissions, including score, number of correct/incorrect answers, and the

date it was taken.

*  safety_tips

 Provides multilingual safety advice categorized by task (e.g., working at heights, lifting loads, etc.).

CRUD Operations

Create:

- A user submits a hazard report using the 'Report a Hazard' tool.

- Admins or editors can add new safety tips.

Read:

- Users can read safety tips by task.

- Users can view their quiz results.

- Any visitor can access translated legal rights.

Update:

- A user can update their profile or language preference.

- Admins can update safety tips content.

Delete:

- Admins can remove outdated hazard reports.

- A user may request deletion of their quiz history (optional).

API Contract (Custom Node.js + Express)

*  Submit Hazard Report

 Method: POST

 Authentication: Optional (anonymous or logged-in)

 Description: Submit a safety hazard with description, photo, and location.

*  View Safety Tips

 Method: GET

 Authentication: Not required

 Description: Retrieve safety tips based on specific tasks.

*  Access Worker Rights Guide

 Method: GET

 Authentication: Not required

 Description: Return a list of labor rights translated into the user's preferred language.

*  Fetch WHMIS Quizzes

 Method: GET

 Authentication: Not required

 Description: Get WHMIS quiz questions and options for self-study.

*  Submit Quiz Answers

 Method: POST

 Authentication: Required

 Description: Store user's quiz responses and calculate score.

*  View Quiz Results

Method: GET

 Authentication: Required

 Description: Retrieve user's past quiz scores and attempt history


## References

- [Node.js Official Docs](https://nodejs.org/en/docs)

- [Express.js Guide – Express Documentation](https://expressjs.com/en/starter/installing.html)

- [MongoDB Mongoose Docs](https://mongoosejs.com/docs/guide.html)

- [JWT Authentication with Node.js](https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs)

- [Cloudinary Docs – Image Upload API](https://cloudinary.com/documentation/image_upload_api_reference)

- [Google Cloud Translation API](https://cloud.google.com/translate/docs)

- [Vite – Official Documentation](https://vitejs.dev/guide/)

- [React.js – Official Docs](https://react.dev/learn)

- [React Router – Navigation in React](https://reactrouter.com/en/main/start/tutorial)

- [CSS Tricks – Responsive Design](https://css-tricks.com/snippets/css/media-queries-for-standard-devices/)

- [MDN Web Docs – JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

- [Postman – API Testing Tool](https://learning.postman.com/docs/getting-started/introduction/)

- [GitHub Docs – Working with Repositories](https://docs.github.com/en/repositories)



