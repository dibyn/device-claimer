import Link from 'next/link';
import React, { ReactNode } from 'react';

type Props = {
  privilege: String | undefined;
};

const Header = ({ privilege }: Props) => {
  const links: JSX.Element[] = [
    privilege === 'admin' && { label: 'Create user', href: '/create/user' },
    !privilege && { label: 'Sign in', href: '/auth/signin' },
    privilege === 'admin' && { label: 'View users', href: '/' },
    privilege && { label: 'View devices', href: '/devices' },
    privilege && { label: 'Signout', href: '/auth/signout' },
  ]
    .filter((link) => link)
    .map(({ label, href }) => {
      return (
        <li key={label}>
          <Link href={href}>
            <a href="">{label}</a>
          </Link>
        </li>
      );
    });
  return (
    <>
      <Link href="/">
        <a className="" href="">
          Device claimer
        </a>
      </Link>
      <div id="navbarColor01">
        <ul>{links}</ul>
      </div>
    </>
  );
};

export default Header;
