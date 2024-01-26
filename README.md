This demo consists of Nextjs,tailwindcss,prisma

Initialization and start up:
1.Set up database schema in mysql called doctor_appointment
2.Set up the DATABASE_URL in the .env file
3.Create table using the command : npx prisma db push
4.Init the users for login: npx prisma db seed
5.Start the app: yarn dev

1.Set up the NextJs project
&nbsp;&nbsp;yarn create next-app

2.Add css style, material ui only work for client in nextjs for now
&nbsp;&nbsp;yarn add tailwindcss postcss autoprefixer
&nbsp;&nbsp;yarn add @tailwindcss/typography

3.Add prisma
&nbsp;&nbsp;yarn prisma
&nbsp;&nbsp;yarn add @prisma/client
&nbsp;&nbsp;yarn add typescript ts-node @types/node //used for inserting data to database
&nbsp;&nbsp;npx prisma db push //create table
&nbsp;&nbsp;npx prisma db seed // insert data to database, see seed.ts and package.json for more details
