# Share Split
The system is about splitting bill among user. For now, it only available for web version.

Note that it uses React Typescript as frontend and Golang as Backend. It uses firebase for authentication only because Im too lazy and short knowledge to create the authentication myself.

### How to start
1. Copy **.env.example** to **.env** and make sure to fill in the require fields with your specific configuration values.
2. Run the migration file to migrate the table to your database.
```
go run migrate/migrate.go
```
3. All done and you can run the system API using this command below.
```
go run .
```