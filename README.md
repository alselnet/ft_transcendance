ft_transcendance

-----
This is a small single-page web application, by a team of four students of 42 School, Paris :

T. Mejri (https://github.com/TasMj)

J. Thuysbaert (https://github.com/Joule444)

H. Coulon (https://github.com/GoDxRyZengan)

myself, A. Selnet (https://github.com/alselnet)

-----
The subject required us to design a SPA for playing games of Pong over the web. Our stack was comprised of :

- Git
- Docker
- PostgreSQL as a Database
- NGINX as a reverse-proxy
- Django + Daphne for the backend
- Pillow for profile pictures
- Redis for Pong game sessions
- Bootstrap for the style
- and Jira, Notions, Discord...

-----
To validate the project and complete our cursus at 42, we were required to pick a minimum of 10~ish features / technologies from a list of 30 features.

Here are some of the features we chose to implement : 

- Bootstrap as a frontend framework
- Django as a backend framework
- PostgreSQL for the database
- Standard user management with authentification, profile pages, game histories and stats, friendlists, profile pictures and so on...
- Remote authentification through our school's API (students from 42 can sign in / log in with their student account)
- our Pong is in 3D with the help of Three.js
- GDPR compliance options
- optional 2FA (via email / QRC) and JWT to secure authentication
- multiple browser compatibility
- and more !

-----
Quick How-to-use guide :

- make sure you have the latest versions of Docker and Docker Compose !
- Additionnally, you'll need Node, NPM and webpack in order to build our static files at the appropriate location
- make the project
- access the site @ https://localhost:4443

-----
Some of the useful resources we used :

- this incredible openclassrooms course for learning Django : https://openclassrooms.com/fr/courses/6967196-create-a-web-application-with-django/7345823-get-the-most-out-of-this-course
- and this one for javascript : https://openclassrooms.com/fr/courses/7696886-apprenez-a-programmer-avec-javascript/8205925-recuperez-un-element-d-une-page-web
- this youtube video explaining the workings of SPAs in great detail : https://www.youtube.com/watch?v=ruq5GaMYcdI&t=43s
- this 6-steps tutorial helped us figure out how to articulate frontend and backend : https://www.saaspegasus.com/guides/modern-javascript-for-django-developers/
- additionnaly, this documentation for learning how to fetch : https://developer.mozilla.org/fr/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data
- this guide for making cool CSS animations : https://javascript.info/css-animations
- and this cool youtube series for learning Three.js : https://www.youtube.com/watch?v=xJAfLdUgdc4&list=PLjcjAqAnHd1EIxV4FSZIiJZvsdrBc1Xho
