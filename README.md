This demo consists of Nextjs,tailwindcss,prisma

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

4. Add an editor
   yarn add @tiptap/react @tiptap/pm @tiptap/starter-kit
