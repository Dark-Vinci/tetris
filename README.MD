
Notes App

To run this app, we should have the following installed,
1> Docker
2> Golang
3> Node
4> Typescript
5> React
6> expo

The backend service is built with Golang and Postgres as the language choice

To run the app locally, ensure all the above are installed.

BACKEND
1> Start docker to  be able to run postgres container
2> cd into the backend project and setup the environment variables
    DB_HOST: localhost
    DB_USERNAME: docker
    DB_PASSWORD: docker
    DB_PORT: 5420
    

3> run the application using the command `go run main.go`

MOBILE
1> When expo has been rightly linked to ios simulator an andriod emulator
2> set the appropiate env like baseURL using the backend url
3> run `npm expo start`
4> to run android, press r
5> to run ios, press i,

ADMIN
1> Set the necessary ENV using the values from the backend
2> run `npm start`
3> the app will open in the browser