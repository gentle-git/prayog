# Prayog - College/University Project Showcase

## Introduction

Prayog is a web application built using the MERN (MongoDB, Express.js, React, Node.js) stack, designed to serve as a platform for students to showcase their projects. This repository contains all the source code and documentation related to the Prayog project.

With Prayog, students can easily submit their college or university projects and share them with a wider audience. Anyone can explore and view these projects, making it a valuable resource for both students and those interested in educational projects.

## Features

- **Project Submission:** Students can upload details of their projects, including descriptions, documentation, and multimedia content.

- **Project Discovery:** Users can easily search and browse through a wide variety of projects submitted by students.

- **Workshops:** Users can find any future or past workshops.

- **Student Authentication:** Validated registration and authentication system for students, ensuring data privacy.

- **Institute Panel:** Institute can manage student accounts, projects, and ensure the platform's integrity.

## Getting Started

These instructions will help you set up a local development environment to run Prayog on your system.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/adwait7830/prayog.git
   ```

2. Navigate to the project folder:

   ```bash
   cd prayog
   ```

3. Install the server dependencies:

   ```bash
   cd backend
   npm install
   ```

4. Install the client dependencies:

   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. Create a `.env` file in the `backend` directory for server configuration. Include the following variables:

   ```env
   PORT=your-server-port
   MONGO_URI=your-mongodb-connection-string
   SECRET_KEY=your-secret-key-for-jwt
   ```

2. Create a `.env` file in the `client` directory for client configuration. Include the following variables:

   ```env
   REACT_APP_API_URL=http://localhost:your-server-port
   ```

### Running the Application

1. Start the server:

   ```bash
   cd backend
   nodemon ./index.js
   ```

2. Start the client:

   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and visit [http://localhost:5000](http://localhost:5000) to access Prayog.

## Contributing

If you'd like to contribute to Prayog, please follow these guidelines:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name for your feature or bug fix.
3. Make your changes and commit them with clear messages.
4. Push your changes to your forked repository.
5. Submit a pull request to the main Prayog repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to the MERN stack and the open-source community for their invaluable contributions.

Feel free to reach out to us for any questions or feedback. Happy coding!

**Prayog - Ignite Creativity, Share Knowledge!**# prayog
