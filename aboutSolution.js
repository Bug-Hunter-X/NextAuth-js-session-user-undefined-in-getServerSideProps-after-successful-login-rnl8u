// pages/about.js
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  // Check if session exists before accessing session.user
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  };
}

export default function About({ session }) {
  return (
    <div>
      <h1>About Page</h1>
      {session && <p>Logged in as {session.user.email}</p>}
    </div>
  );
}
