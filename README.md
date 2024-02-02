This demo consists of Nextjs,tailwindcss,prisma, and mysql

Pre-condition:
1.NodeJs and yarn library have been installed.

Initialization and start up:
1.Create database schema in mysql called doctor_appointment
2.Adjust parameters in the .env file, including username, password, port, etc.
3.Create table using the command : npx prisma db push
F:\doctor_appointment> npx prisma db push
4.Init the data: npx prisma db seed
F:\doctor_appointment> npx prisma db seed
5.Start the app: yarn dev
F:\doctor_appointment>yarn dev

This project initializes 4 users in advance, 1001 is the administrator, and 2001 is the doctor. 3001 and 3002 are patients.
