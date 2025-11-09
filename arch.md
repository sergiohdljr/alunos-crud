src/
├── domain/
│   └── entities/
│       └── student.ts
│
├── application/
│   ├── repositories/
│   │   └── student-repository-interface.ts
│   └── use-cases/
│       ├── create-student-use-case.ts
│       ├── list-students-use-case.ts
│       └── __tests__/
│           ├── create-student-use-case.unit.test.ts
│           └── list-students-use-case.unit.test.ts
│
├── infra/
│   ├── db/
│   │   ├── client.ts
│   │   └── schema/
│   │       └── students.ts
│   ├── repositories/
│   │   ├── in-memory-repository.ts
│   │   └── drizzle-repository.ts
│   └── http/
│       ├── controllers/
│       │   └── student-controller.ts
│       ├── routes/
│       │   └── student-routes.ts
│       └── server.ts
│
└── main/
    ├── bootstrap.ts
    ├── index.ts
    └── factories/
        └── make-register-student-controller.ts

# Configuration Files
├── jest.config.ts
├── tsconfig.json
├── package.json
├── docker-compose.yml
├── Dockerfile
├── drizzle.config.ts
└── openapi.json
