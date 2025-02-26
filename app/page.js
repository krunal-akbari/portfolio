import { Metadata } from 'next';

export const metadata = {
  title: 'Where you can Find the Best Website',
  description: 'Till You Find the Best Agency with Low Price'
};

export default function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Welcome to Next.js!</h1>
      <p>This is your first page built with the new App Router.</p>
    </main>
  );
}