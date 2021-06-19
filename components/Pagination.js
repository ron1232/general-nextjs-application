import Link from 'next/link';
import { PER_PAGE } from '@/config/index';

export default function Pagination({ page, total }) {
  const pages = Math.ceil(total / PER_PAGE);
  return (
    <>
      {[...Array(pages)].map((a, i) => (
        <Link key={i} href={`/events?page=${i + 1}`}>
          <a className={`btn-page ${page === i + 1 ? 'btn-page--active' : ''}`}>
            {i + 1}
          </a>
        </Link>
      ))}
    </>
  );
}
