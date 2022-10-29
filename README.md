# GraphQL Fullstack Demo

## Onboarding

To run all services on your local machine, run:

```
$ docker compose up
```

This will launch all services, but the database is empty. Create an interactive `bash` shell inside the `api` service using

```
$ ./bash api
```

Inside this container, seed the database by running

```
    npm seed
```

## \[DEV\] Service URLs

- [GraphQL Playground](http://localhost:4000/graphql)
- [React Frontend](http://localhost:3000)
- [pgAdmin](http://localhost:5050) - Email: admin@admin.com; Password: admin
