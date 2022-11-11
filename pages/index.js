import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[slug].js";
import styles from "./index.module.css";
import ThemeToggle from "../components/ThemeToggle";

export const databaseId = process.env.NOTION_DATABASE_ID;

export const pages = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Projects",
        path: "#projects",
    },
    {
        name: "Blog",
        path: "#blog",
    },
    {
        name: "Contact",
        path: "#contact",
    },
];
export default function Home({ posts }) {
    return (
        <div>
            <Head>
                <title>Notion Next.js blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header
                className={styles.container}
                style={{
                    marginTop: "1.5em",
                    marginBottom: "1em",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                }}
            >
                {pages.map((e) => (
                    <a className={styles.headerLinks} href={e.path}>
                        {e.name}
                    </a>
                ))}
                <ThemeToggle />
            </header>
            <main className={styles.container}>
                <header
                    
                    className={styles.header}
                >
                    <div data-aos="fade-up" className={styles.logos}>
                        <img
                            src="photo with armadilo.jpg"
                            alt=""
                            width={300}
                            style={{ margin: "auto" }}
                        />
                    </div>
                    <h1 data-aos="fade-up"
                    data-aos-delay="300" style={{ fontSize: 40, textAlign: "center" }}>
                        Hi, I'm Daniel
                    </h1>
                    <p data-aos="fade-up"
                    data-aos-delay="300" style={{ fontWeight: "bold", fontSize: '1.2em' }}>
                        I love building stuffs, that's just who I am.
                    </p>
                    <p data-aos="fade-up"
                    data-aos-delay="300" style={{fontSize: '1.2em'}}>
                        This is a portal made for you to know more about me.
                        Here I regularly post my latest projects and
                        shenanigans.
                    </p>
                </header>

                <h2
                    data-aos="fade-up"
                    data-aos-delay="600"
                    className={styles.heading}
                >
                  Projects
                </h2>
                <ol
                    data-aos="fade-up"
                    data-aos-delay="900"
                    className={styles.posts}
                >
                    {posts.map((post) => {
                        const slug = post.properties.Name.title[0].plain_text.replaceAll(' ', '-').toLowerCase()
                        const date = new Date(
                            post.last_edited_time
                        ).toLocaleString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        });
                        return (
                            <li key={post.id} className={styles.post}>
                                <h3 className={styles.postTitle}>
                                    <Link href={`/${slug}`}>
                                        <Text
                                            text={post.properties.Name.title}
                                        />
                                    </Link>
                                </h3>

                                <p className={styles.postDescription}>{date}</p>
                                <Link href={`/${slug}`}>Read post →</Link>
                            </li>
                        );
                    })}
                </ol>
            </main>
        </div>
    );
}

export const getStaticProps = async () => {
    const database = await getDatabase(databaseId);

    return {
        props: {
            posts: database,
        },
        revalidate: 1,
    };
};
