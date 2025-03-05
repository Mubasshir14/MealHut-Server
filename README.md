# MEALHUT SERVER

Check out our [Live Link](https://meal-hut-server.vercel.app) 


## Description

MealHut is a comprehensive food platform that allows users to easily place food orders while maintaining their own dietary plans. The application is built with Express and TypeScript, ensuring robust and scalable backend architecture. Integrated with MongoDB via Mongoose for efficient data management, MealHut supports seamless user experiences. Nodemailer is used to send updates to users, while Cloudinary handles image uploads for food items. Multer is also utilized for efficient file handling, ensuring smooth image uploads. With its strong schema validation and structured framework, MealHut provides reliability and performance for managing user orders and dietary needs.

## Features

-**TypeScript** for strong typing and enhanced developer experience.

-**Express.js** for creating the server and APIs.

-**MongoDB** for database management using Mongoose.

-**Environment Variable** management with `dotenv`.

-**Linting and Formatting** with ESLint and Prettier.

-**Modemailer** for to send updates to users.

-**Cloudinary** for image upload.

-Development server with ts-node-dev for live reload.

-Modular architecture for scalability.

## Authentication Overview
-  JWT-based authentication is used to secure user access. An access token is issued for short-term use to access protected resources, while a refresh token allows the user to obtain a new access token without re-login once it expires. The refresh token is securely stored and can be used to refresh the access token as needed.

## Prerequisites

Make sure you have the following installed:

- **Node.js** (version 16 or above)
- **npm** or **yarn**
- **MongoDB instance** (local or cloud-based)

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and configure your environment variables:
   ```env
   PORT=3000
   DATABASE_URL= your-mongodb-uri
   NODE_ENV=development
   BCRYPT_SALT_ROUND= Any Number
   JWT_ACCESS_SECRET=
   JWT_REFRESH_SECRET=
   JWT_ACCESS_EXPIRES_IN=10d
   JWT_REFRESH_EXPIRES_IN=365d
   CLOUDINARY_CLOUD_NAME=dkwn9bool
   CLOUDINARY_API_KEY=321321414891178
   CLOUDINARY_API_SECRET=Gp6xg9-eOc0ylgOInGZ0CLnAfyY
   FROM_EMAIL=NODEMAILER_EMAIL_SENDING
   FROM_PASS=PASSWORD

   ```

## Scripts

- **Start Development Server:**

  ```bash
  npm run start:dev
  ```

- **Build for Production:**

  ```bash
  npm run build
  ```

- **Start Production Server:**

  ```bash
  npm run start:prod
  ```

- **Lint Code:**

  ```bash
  npm run lint
  ```

- **Fix Lint Issues:**

  ```bash
  npm run lint:fix
  ```

- **Format Code with Prettier:**

  ```bash
  npm run prettier
  ```

- **Fix Formatting Issues:**
  ```bash
  npm run prettier:fix
  ```

## Folder Structure

```
mealhut-server/
├── src/
│   ├── app/
│   │   ├── builder/
│   │   │   └── QueryBuilder.ts
│   │   ├── config/
│   │   │   └── index.ts
│   │   ├── errors/
│   │   │   ├── AppError.ts
│   │   │   ├── handleZodError.ts
│   │   │   └── handleCastError.ts
│   │   ├── interface/
│   │   │   ├── events.ts
│   │   │   └── index.d.ts
│   │   ├── middlewares/
│   │   │   ├── auth.ts
│   │   │   └── globalErrorHandler.ts
│   │   ├── route/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── CatchAsync.ts
│   │   │   └── sendResponse.ts
│   ├── module/
│   │   ├── Auth/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── Customer/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── Meal/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── MealCategory/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── Order/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── Review/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── User/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   ├── app.ts
│   ├── server.ts
│   ├── Uploads
├── dist/                   # Compiled JavaScript files
├── .env                    # Environment variables
├── .eslintrc.config.mjs            # ESLint configuration
├── .prettierrc             # Prettier configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```


## Dependencies

### Production:

- `bcrypt`: Library for hashing passwords
- `cookie-parser`: Parse cookies for incoming requests
- `cors`: Enable Cross-Origin Resource Sharing
- `dotenv`: Load environment variables from `.env` file
- `express`: Web framework for building REST APIs
- `http-status`: Manage and use HTTP status codes
- `jsonwebtoken`: Generate and verify JSON Web Tokens (JWT)
- `lint-staged`: Run linters on staged Git files
- `mongoose`: MongoDB object modeling library
- `nodemailer`: Send emails from Node.js
- `zod`: Schema validation library for data

```bash
npm install bcrypt cookie-parser cors dotenv express http-status jsonwebtoken lint-staged mongoose nodemailer  zod
```

### Development:

- `typescript`: TypeScript compiler
- `eslint`: Linting tool for JavaScript/TypeScript
- `prettier`: Code formatter
- `ts-node-dev`: Development server for TypeScript

```bash
  npm install --save-dev @eslint/js @types/bcrypt @types/cookie-parser @types/cors @types/eslint__js @types/express @types/form-data @types/jsonwebtoken @types/node @types/nodemailer eslint globals prettier ts-node-dev typescript typescript-eslint
```

## API Endpoints
## MEALS
-`Get api/meal`

-`POST api/meal`

-`PATCH api/meal/:id`

-`DELETE api/meal/:id`

-`GET api/meal/:id`

## USER
-`POST(REGISTER) api/auth/register`

-`POST(LOG IN) api/auth/login`



## ORDERS
-`POST api/order`

-`GET api/order`

-`PATCH api/order/:id`


## REVIEW
-`POST api/review`

-`GET api/review`

-`GET(PRODUCT BASED) api/review/:id`



## REGISTER
```bash
{
  "name": "Your Name",
  "email": "yourname@example.com",
  "password": "yourpassword",
  "phone": "+11111111111",
  "address": "123 Main Street",
  "city": "New York"
}
```

## ADD Meal
```bash
{
  "name": "Protein Smoothie",
  "imageUrls": [
    "https://......."
  ],
  "price": 10,
  "calories": "10",
  "category": "High-Protein",
  "mealProvider": {
    "id": "67c5wwwwwwwwwwwww"
  },
  "isActive": true,
  "averageRating": 0,
  "ratingCount": 0,
  "ingredients": "Whey protein, banana, almond milk, peanut butter, chia seeds.",
  "portion_size": "A muscle-boosting 350ml smoothie with 25g protein per serving.",
  "why_eat": "THIS SMOOTHIE IS PERFECT FOR MUSCLE RECOVERY AND PROVIDES A QUICK ENERGY BOOST. IT CONTAINS HEALTHY FATS, PROTEIN, AND ESSENTIAL VITAMINS.",
  "user": {
    "id": "rrrrrrrrrrrrrrrrrrc"
  }
}
```

## CREATE ORDER
```bash
{
    "meals": [
        {
            "meal": "6795c98c02786d93f1084842",
            "quantity": 1
        }
    ]
}
```


---
