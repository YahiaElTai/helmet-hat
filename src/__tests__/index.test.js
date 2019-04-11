import React from 'react';
import { Helmet } from 'react-helmet';
import { shallow } from 'enzyme';

import HelmetHat from '../lib';
import helmetPropsFunc from '../lib/helmetProps';

const helmetToUse = {
  base: 'http://example.com',
  description: 'description text',
  favicon: {
    ico: '/favicon.ico',
    s16: '/favicon-16.png',
    s70: '/favicon-70.png',
    s144: '/favicon-144.png',
  },
  image: '/image.jpg',
  link: [
    { rel: 'link rel', href: 'link href' },
    { rel: 'canonical', href: '/canonical' },
    { rel: 'apple-touch-startup-image', href: 'my image' },
  ],
  meta: [{ name: 'meta name', content: 'meta content' }],
  og: {
    k1: 'v1',
  },
  property: {
    ns: {
      k2: 'v2',
    },
  },
  siteName: 'site name',
  title: 'page title',
  twitter: {
    k3: 'v3',
  },
  url: '/page.url',
};

it('helmetPropsFunc returns the correct react-helmet tags', () => {
  expect(helmetPropsFunc({ helmetProps: helmetToUse })).toEqual({
    base: { href: 'http://example.com' },
    defaultTitle: 'site name',
    link: [
      { rel: 'link rel', href: 'link href' },
      { rel: 'canonical', href: '/canonical' },
      { rel: 'apple-touch-startup-image', href: 'my image' },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-16.png',
        sizes: '16x16',
      },
      {
        rel: 'apple-touch-icon-precomposed',
        href: '/favicon-144.png',
        sizes: '144x144',
      },
    ],
    meta: [
      { name: 'meta name', content: 'meta content' },
      { name: 'msapplication-TileImage', content: '/favicon-144.png' },
      { name: 'msapplication-square70x70logo', content: '/favicon-70.png' },
      { name: 'application-name', content: 'site name' },
      { name: 'description', content: 'description text' },
      { property: 'og:site_name', content: 'site name' },
      { property: 'og:title', content: 'page title' },
      { property: 'og:description', content: 'description text' },
      { property: 'og:image', content: '/image.jpg' },
      { property: 'og:url', content: '/page.url' },
      { property: 'og:k1', content: 'v1' },
      { property: 'twitter:title', content: 'page title' },
      { property: 'twitter:description', content: 'description text' },
      { property: 'twitter:image', content: '/image.jpg' },
      { property: 'twitter:url', content: '/page.url' },
      { property: 'twitter:k3', content: 'v3' },
      { property: 'ns:k2', content: 'v2' },
    ],
    title: 'page title',
  });
});

it('renders the passed components with correct helmet tags', () => {
  const Layout = ({ children }) => (
    <div>
      <header>
        <h2>This is the Header</h2>
      </header>
      <main>{children}</main>
      <footer>
        <p>All rights reserved to this component!</p>
      </footer>
    </div>
  );

  const Component = () => (
    <div>
      <p>I'm the Component and all rights are reserved to me!</p>
      <p>Do not underestimate me! I'm a very powerful Component</p>
    </div>
  );

  const wrapper = shallow(
    <HelmetHat
      render={({ helmetPropsFunc }) => (
        <React.Fragment>
          <Helmet {...helmetPropsFunc({ helmetProps: helmetToUse })} />
          <Layout>
            <Component />
          </Layout>
        </React.Fragment>
      )}
    />,
  );

  expect(
    wrapper.contains(
      <React.Fragment>
        <Helmet {...helmetPropsFunc({ helmetProps: helmetToUse })} />
        <Layout>
          <Component />
        </Layout>
      </React.Fragment>,
    ),
  ).toEqual(true);
});
