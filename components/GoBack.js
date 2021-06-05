import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';

export default function GoBack({ href = '/events' }) {
  return (
    <Link href={href}>
      <a className='back'>
        <BiArrowBack className='back-icon' /> Go Back
      </a>
    </Link>
  );
}
