import { Post } from "@prisma/client";
import Tech from "./(home)/Tech";
import Travel from "./(home)/Travel";
import Treding from "./(home)/Treding";
import Other from "./(shared)/Other";
import Sidebar from "./(shared)/Sidebar";
import Subscribe from "./(shared)/Subscribe";
import { customPrisma } from "./api/prismaClient";

export const revalidate = 2; //render every 60 seconds.

const getPosts = async () => {
  //const posts: Array<Post> = await prisma.post.findMany();
  const posts: Post[] = await customPrisma.post.findMany();

  const formatPosts = await Promise.all(
    posts.map(async (post: Post) => {
      const imageModule = require(`../public${post.image}`);
      return {
        ...post,
        image: imageModule.default,
      };
    })
  );
  return formatPosts;
};

export default async function Home() {
  const posts = await getPosts();
  //only for demo
  const formatPosts = () => {
    const trendingPosts: Post[] = [];
    const techPosts: Post[] = [];
    const travelPosts: Post[] = [];
    const otherPosts: Post[] = [];
    posts.forEach((post: Post, i: number) => {
      if (i < 4) {
        trendingPosts.push(post);
      }
      if (post?.category === "Tech") {
        techPosts.push(post);
      } else if (post?.category === "Travel") {
        travelPosts.push(post);
      } else if (post?.category === "Interior Design") {
        otherPosts.push(post);
      }
    });

    return { trendingPosts, techPosts, travelPosts, otherPosts };
  };

  const { trendingPosts, techPosts, travelPosts, otherPosts } = formatPosts();

  return (
    <main className="px-10 leading-7">
      <Treding trendingPosts={trendingPosts} />
      <div className="md:flex gap-10 mb-5">
        <div className="basis-3/4">
          <Tech techPosts={techPosts} />
          <Travel travelPosts={travelPosts} />
          <Other otherPosts={otherPosts} />
          <div className="hidden md:block">
            <Subscribe />
          </div>
        </div>
        <div className="basis-1/4">
          <Sidebar />
        </div>
      </div>
    </main>
  );
}
