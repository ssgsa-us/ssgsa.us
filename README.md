# SIR SYED GLOBAL SCHOLAR AWARD

The Sir Syed Global Scholar Award (SSGSA) is annually administered by the Sir Syed Education Society of North America, a 501 (C) (3) non-profit organization. The award is offered to students and alumni of the Aligarh Muslim University (AMU) from all faculties.

## Getting Started
  ### Prerequisites
   - NODE
   - NPM
  
  ### Technology Stack
   - [Next JS](https://nextjs.org/docs/getting-started)
   - Firebase ([Authentication](https://firebase.google.com/docs/auth) and [Cloud Firestore](https://firebase.google.com/docs/firestore))
   - [Tailwind CSS](https://tailwindcss.com/docs/installation)
  
  ### Setup
   - Fork the repository
   - Clone your repository
      ```
        git clone https://github.com/<your-username>/ssgsa-application-portal.git
        cd ssgsa-application-portal
      ```
   - Install dependencies
      ```
        npm install
      ```
   - Create .env file and add environment variables as mentioned in next.config.js file
   - Start the application (with port 3000)
      ```
        npm run dev
      ```

  ### Introduction for code
   - This project works with javascript and typescript both.
   - Folder Structure:
     - pages [Handles all the routing pages]
     - layouts [Handles different layouts (header and footer of page) for application]
     - components [Handles all the components rendered in the pages or layouts]
     - firebase [Handles connection with firebase and manage firebase authentication api]
     - classes [Handles the schema for the firebase data]
     - context [Handles authentication context of application]
     - constants [Handles some constant values of application]
     - public [Handles all the assets or images used in the applicationn]
   - This project uses some fixed colors which are extended in tailwind.config.js:
     - Classname bg-blue-850 mention color "#003366"
     - Classname bg-blue-860 mention color "#003366cc"
     - Classname bg-red-850 mention color "#BB2119"
     - Classname bg-red-860 mention color "#BB2119cc"
     - Classname bg-gray-850 mention color "#E7E7E7"
     - Classname bg-gray-860 mention color "#595959"
     - Classname bg-green-860 mention color "#00a200"
  
  ### Contribution
   - First fork the repository and setup it if you have not done yet, otherwise make sure that your forked repo is up to date with this repo.
   - Next find an issue that you are interested in addressing or a feature that you would like to add.
   - Open that issue on github if not already open.
   - Create a branch with the specific name (according to the changes) for your fix
      ```
        git checkout -b <branch name>
      ```
   - Make required changes and stage them
     - To add all files
        ```
          git add .
        ```
     - To add specific files
        ```
          git add <changed file paths>
        ```
   - Commit all changes with the specific commit message and description (if required)
     - Without description
        ```
          git commit -m <commit message>
        ```
     - With Description
        ```
          git commit -m <commit message> -m <commit description>
        ```
   - Push changes to your repository after making some commits
      ```
        git push origin <branch name>
      ```
   - Create a pull request to this repository and mention the respective github issue.
   - Title the pull request with a short description which explains the changes you made.
   - Wait for the pull request to be reviewed by a maintainer.
   - Make changes to the pull request if the reviewing maintainer recommends them.
   - Celebrate your success after your pull request is merged!

