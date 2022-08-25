import axios from "axios";
import { getAuthor, getFeaturedImage } from "../../lib/utils";
import { POSTS_API_URL } from "../../lib/constants";
import Head from "next/head";
import parse from "html-react-parser";
import Footer from "../../components/Footer";
import styles from '../../styles/Post.module.css';

type PostProps = {
  title: string;
  featuredImg: string;
  author: string;
  content: string;
  date: Date;
};

const Post: React.FC<PostProps> = ({
  title,
  featuredImg,
  author,
  content,
  date,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center flex-1 mx-5 md:px-20 py-10 max-w-5xl m-auto">
        <h1 className="text-2xl md:text-6xl font-bold my-5 text-center">
          {title}
        </h1>
        <div>
          <img src={featuredImg} />
        </div>
        <p className="text-sm mt-5">Written by {author}</p>
        <p className="text-sm font-semibold mb-5">
          Published on {new Date(date).toDateString()}
        </p>
        <div className={styles.post}>{parse(content)}</div>
      </main>
      <Footer />
    </div>
  );
};

export async function getStaticPaths() {
  const res = await axios.get(POSTS_API_URL);
  const posts = res.data;
  //Get the paths we want to pre-render based on ports
  const paths = posts.map((post: any) => ({
    params: {
      id: post.id.toString(),
    },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
}: {
  params: { id: string | number };
}) {
  const res = await axios.get(`${POSTS_API_URL}/${params.id}`);
  const post = await res.data;
  const featuredImg = await getFeaturedImage(post.featured_media);
  const author = await getAuthor(post.author);
  return {
    props: {
      title: post.title.rendered,
      content: post.content.rendered,
      featuredImg,
      author,
      date: post.date,
    },
  };
}
export default Post;
