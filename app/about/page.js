
import { Metadata } from 'next';

export const metadata = {
  title: 'Learn About Krunal',
  description: 'Someone Tries to learn'
};
export default function BlogPost({ params }) {
    // params.slug holds the dynamic value from the URL
    return <article><h1>Blog Post: {params.slug}</h1></article>;
  }