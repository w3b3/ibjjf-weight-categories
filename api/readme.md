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

