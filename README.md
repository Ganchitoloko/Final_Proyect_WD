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

- React.js (UI and components)
- React Router (navigation)
- TailwindCSS (styling and responsiveness)


Backend:

- Firebase (authentication, real-time database)
- Cloud Firestore (storage and scalability)


Additional Tools:

- GitHub (version control)

- Canva or Figma (UI prototyping)

- Google Translate API (for multilingual support)


5. Features to be Implemented:

Core Features:

- Quick safety tips by task type (visual + text)

- Hazard Reporting Tool with optional photo upload

- Multilingual safety rights guide

- WHMIS summary module + basic quiz

- Mobile-responsive design


Additional (Future) Features:

- Safety knowledge tracker (badges/certifications)

- Interactive incident map (to view/report danger zones)

- Forum for workers to share advice and experiences

- Integration with local training & safety programs


6. User Stories:

- As a construction labourer, I want to quickly report a hazard I see on site so that others stay safe and my voice is heard.

- As a new immigrant worker, I want to read safety instructions and rights in my language so I can understand and protect myself.

- As a supervisor, I want to view safety reports from my team so that I can take timely actions and reduce risks.

- As a worker, I want to complete WHMIS quizzes and save my progress so that I can show it to future employers.

- As a curious user, I want to learn about safety best practices depending on my task so that I can avoid common mistakes.

Architecture Diagram

<img width="1034" alt="HLA" src="https://github.com/user-attachments/assets/60fdc54f-7ef6-4e33-8019-e638dae9a12e" />


Firestore ERD

<img width="916" alt="EDR " src="https://github.com/user-attachments/assets/d3025e8f-d283-401b-a00e-cc8e6bfe3092" />


For the UI design I will use this design as inspiration:
https://dribbble.com/shots/25726436-Safety-Level-5


**Firestore – Main Collections** 

1. users
Stores user profiles, including name, email, role (worker/supervisor), preferred language, and registration date.

2. hazard_reports
Contains reports submitted by users or anonymous visitors. Each report includes a description, photo URL, location, timestamp, and anonymity flag.

3. whmis_quizzes
Holds WHMIS-related quiz data, such as questions, answer options, and correct answers.

4. quiz_results
Saves each user's quiz submissions, including quiz ID, score, and the date it was taken.

5. safety_tips
Provides multilingual safety advice categorized by task (e.g., working at heights, lifting loads, etc.).

**CRUD Operations Create** :

A user submits a hazard report using the "Report a Hazard" tool.

Admins or editors can add new safety tips or quizzes.

Read:

Users can read safety tips by task.

Users can view their quiz results.

Any visitor can access legal rights translated into multiple languages.

Update:

A user can update their language preference or profile data.

Admins can edit safety tips or quiz content.

Delete:

Admins can remove outdated or duplicate hazard reports.

A user may request deletion of their quiz history (optional feature).

**API Contract (Simulated for Firebase SDK)**

1. Submit Hazard Report

Method: POST

Authentication: Optional (anonymous or logged-in user)

Description: Allows users to submit a safety hazard with a description, photo, and location.

2. View Safety Tips

Method: GET

Authentication: Not required

Description: Retrieves safety tips based on specific tasks (e.g., working at heights).

3. Access Worker Rights Guide

Method: GET

Authentication: Not required

Description: Returns a list of labor rights translated into the user's preferred language.

4. Fetch WHMIS Quizzes

Method: GET

Authentication: Not required

Description: Provides a list of available WHMIS quizzes for self-study.

5. Submit Quiz Answers

Method: POST

Authentication: Required

Description: Stores the user's quiz responses and calculates their score.

6. View Quiz Results

Method: GET

Authentication: Required

Description: Allows users to access their past quiz scores and completion history.


## References

- [Firebase Setup](https://firebase.google.com/docs/web/setup)
- [Firebase Auth - Email/Password](https://firebase.google.com/docs/auth/web/start)
- [Firestore - Add Data](https://firebase.google.com/docs/firestore/manage-data/add-data)
- [Firebase Storage - Upload Files](https://firebase.google.com/docs/storage/web/upload-files)
- [React - Getting Started](https://reactjs.org/docs/getting-started.html)
- [React - Components and Props](https://reactjs.org/docs/components-and-props.html)
- [React - State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
- [W3Schools - React Intro](https://www.w3schools.com/react/react_intro.asp)

