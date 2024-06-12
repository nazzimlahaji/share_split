# Share Split
The system is about splitting bill among user. For now, it only available for web version.

Note that it uses React Typescript as frontend and Golang as Backend. It uses firebase for authentication only because Im too lazy and short knowledge to create the authentication myself.

### How to start API
1. Copy **.env.example** to **.env** in 'api' folder and make sure to fill in the require fields with your specific configuration values.
2. Run the migration file in 'api' folder to migrate the table to your database.
```
go run database/migrate/migrate.go
```
3. All done and you can run the system API using this command below in 'api' folder.
```
go run .
```

### How to start WEB
1. Copy **.env.example** to **.env** in 'web' folder and make sure to fill in the require fields with your specific configuration values.
2. Install all of the dependecy by running the command below.
```
pnpm install
```
3. All done and you can run the web application using this command below in 'web' folder.
```
pnpm run dev
```

### Note:
- For creating the API, I'm just using the GET & POST method.
