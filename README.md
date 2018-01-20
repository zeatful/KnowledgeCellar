# KnowledgeCellar

## Installation
1. Clone the repository
  * `git clone https://github.com/zeatful/KnowledgeCellar.git`
2. Install node modules
  * `npm install`
3. Create a mongo docker image for your database
  * `docker run --name some-mongo -d mongo`
  * if you ever need to manually start it after it has been created run
    `docker start some-mongo`
4. Start the application
  * `npm start`