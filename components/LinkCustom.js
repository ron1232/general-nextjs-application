import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LinkCustom({
  pathname,
  title,
  iconPosition = 'left',
  children,
}) {
  const router = useRouter();

  return (
    <Link href={pathname}>
      <a className={router.pathname === pathname && 'active'}>
        {children && iconPosition === 'left' && children} {title}
        {children && iconPosition === 'right' && children}
      </a>
    </Link>
  );
}
