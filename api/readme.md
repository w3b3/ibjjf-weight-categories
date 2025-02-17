# Key Security Considerations

* HTTPS
* Input Validation
* Authentication
* Rate Limiting
* CORS
* Helmet
* Database Security
* Environment Variables
* Error Handling
* Docker Security

# structure

```
bjj-api/
├── docker-compose.yml       # Docker Compose configuration
├── Dockerfile              # Dockerfile for the Node.js app
├── .env                    # Environment variables (IMPORTANT: Don't commit this!)
├── package.json            # Node.js project dependencies
├── package-lock.json       # Exact dependency versions
├── src/
│   ├── app.js            # Main Express application
│   ├── models/             # Sequelize models
│   │   ├── index.js      # Sequelize setup
│   │   ├── student.js    # Student model
│   │   ├── professor.js  # Professor model
│   │   ├── class.js     # Class model
│   │   ├── gym.js       # Gym model
│   │   └── checkin.js    # Checkin model
│   ├── routes/             # API route handlers
│   │   ├── students.js   # Student routes
│   │   ├── professors.js # Professor routes
│   │   ├── classes.js    # Class routes
│   │   ├── gyms.js       # Gym routes
│   │   └── checkins.js  # CheckIn routes
│   ├── middleware/         # Custom middleware
│   │   └── auth.js       # API key authentication
│   └── utils
│       └── errorHandlers.js # Centralized error handling
└── db/                   # for our data
    └── data.sqlite
```

## testing the api

Checking entries
```sh
curl -H "X-API-Key: your-secret-api-key" http://localhost:3000/api/students
```

adding a new entry successfully

```sh
curl -H "X-API-Key: your-secret-api-key" -X POST -H "Content-Type: application/json" -d '{"name": "New Student", "age": 25, "weight": 75.5, "belt": "White", "stripe": 0}' http://localhost:3000/api/students
```

[❌] adding a new entry WRONG

```sh
curl -X POST -H "Content-Type: application/json" -d '{"name": "New Student", "age": 25, "weight": 75.5, "belt": "White", "stripe": 0}' http://localhost:3000/api/students
```


## database

`forcing pg isolated local instance`

```
docker run -p 5432:5432  -v postgres_data:/var/lib/postgresql/data  -e POSTGRES_USER=your_user  -e POSTGRES_PASSWORD=your_password  -e POSTGRES_DB=your_database  -d postgres:latest
```

`/Users/ds/code/ibjjf/api/src/config/database.js`
```
host: process.env.DB_HOST || 'localhost',
username: process.env.DB_USER || 'postgres',
password: process.env.DB_PASSWORD || 'postgres',
database: process.env.DB_NAME || 'ibjjf_dev',
port: process.env.DB_PORT || 5432
```