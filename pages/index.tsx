import type { NextPage } from "next";
import Head from "next/head";
import Post from "../components/Post";
//import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { getAllPostsFromServer } from "../lib/utils";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  const [posts, setPosts] = useState([]);
  const fetchPostsFromServer = async () => {
    const postsFromServer = await getAllPostsFromServer();
    setPosts(postsFromServer as unknown as []);
  };
  useEffect((): (() => void) => {
    let mounted = true;
    if (mounted) {
      fetchPostsFromServer();
    }
    return () => (mounted = false);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>React Wordpress Headless Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center flex-1 px-20 py-10">
        <h1 className="text-6xl font-bold mt-5 mb-5">Blog</h1>
        <p className="text-xl mb-5">
          Wordpress as a Headless CMS Blog with React
        </p>
        {posts && (
          <div className="grid grid-cols-2 gap-5">
            {posts.map((post, id) => {
              return (
                <div key={id}>
                  <Post post={post} />
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
