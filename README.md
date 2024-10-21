# Database Backup Management Project

This project allows you to create and restore backups of PostgreSQL databases using Docker. It includes functionalities for scheduling backup creation, restoring from existing backups, and maintaining a log of operations performed.

## Table of Contents

- [Database Backup Management Project](#database-backup-management-project)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Contributions](#contributions)
  - [License](#license)

## Requirements

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Docker](https://www.docker.com/) (with a running PostgreSQL container)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

1. Clone the repository

2. Install the dependencies:
   ```bash
   pnpm install
   ```

3. Configure your `.env` file following the example in `.env.example`:
   ```plaintext
   POSTGRES_DOCKER_CONTAINER=container_name
   POSTGRES_USER=your_user
   POSTGRES_PASSWORD=your_password
   POSTGRES_DB=your_database
   BACKUP_DELAY=0.5  # Interval in hours for creating backups
   ```

## Configuration

Make sure you have a running PostgreSQL container and that the environment variables in your `.env` file are correctly set.

## Usage

To run the project, use the following command:

```bash
pnpm start
```

The interactive menu will allow you to choose between creating backups, restoring from backups, or exiting the program.

## Contributions

Contributions are welcome. If you would like to collaborate, please follow these steps:

1. Fork the project.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Make your changes and commit them (`git commit -m 'Add a new feature'`).
4. Push your changes (`git push origin feature/YourFeatureName`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.