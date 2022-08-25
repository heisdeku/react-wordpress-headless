import Link from "next/link";
import { useState, useEffect } from "react";
import { getAuthor, getFeaturedImage } from "../../lib/utils";
import parse from "html-react-parser";

type PostExceptProps = {
  rendered: string;
  protected: boolean;
};

type PostProps = {
  author: number;
  featured_media: number;
  id: number;
  title: {
    rendered: string;
  };
  date: Date;
  excerpt: PostExceptProps;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const [postImgAndAuthor, setPostImgAndAuthor] = useState<{
    author: string;
    featImgUrl: string;
  }>({
    featImgUrl: "",
    author: "",
  });

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const author = getAuthor(post.author);
      const featuredImg = getFeaturedImage(post.featured_media);
      // a Promise.all to resolve all the promises made in getAuthor & getFeaturedImg async functions
      Promise.all([author, featuredImg]).then((res) => {
        setPostImgAndAuthor({
          author: res[0] as string,
          featImgUrl: res[1] as string,
        });
      });
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div>
      <img
        src={postImgAndAuthor ? postImgAndAuthor.featImgUrl : "/vercel.svg"}
        alt=""
        className="excerpt-img mb-5"
      />
      <Link href={`/post/${post.id}`}>
        <a className="text-4xl font-bold">{post.title.rendered}</a>
      </Link>
      <h4>{new Date(post.date).toDateString()}</h4>
      <div className="mt-2 relative">
        <div className="mb-2 max-w-lg">{parse(post.excerpt.rendered)}</div>
        <Link href={`/post/${post.id}`}>
          <a className="mt-3 text-blue-800 bottom-0">Continue Reading</a>
        </Link>
      </div>
    </div>
  );
};

export default Post;
