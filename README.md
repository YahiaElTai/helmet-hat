# helmet-hat

[![Build Status](https://travis-ci.com/YahiaElTai/helmet-hat.svg?branch=master)](https://travis-ci.com/YahiaElTai/helmet-hat) [![dependencies Status](https://david-dm.org/YahiaElTai/helmet-hat/status.svg)](https://david-dm.org/YahiaElTai/helmet-hat) [![devDependencies Status](https://david-dm.org/YahiaElTai/helmet-hat/dev-status.svg)](https://david-dm.org/YahiaElTai/helmet-hat?type=dev) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A React component that automatically fills meta tags including og / twitter with a render props to allow you to render any kind of page.
You just need to wrap your pages with `helmet-hat` through the render props and give it your desired helmet tags, and voila!

- This component will make your code DRY by giving you a simple top-level way to add `react-helmet` props.
- The render props will also give you the ability to render any kind of page and if you like you can create a few reusable layouts
  to use them across your web application.

### Install

```
npm install  helmet-hat
```

or

```
yarn add  helmet-hat
```

### Usage

```javascript
import React from 'react';
import { Helmet } from 'react-helmet';
import HelmetHat from 'helmet-hat';

const myHelmetConfig = {
  base: 'http://example.com', // or {"target": "_blank", "href": "http://mysite.com/"}
  title: 'page title',
  description: 'description text',
  favicon: {
    ico: '/favicon.ico',
    s16: '/favicon-16.png',
    ...
  },
  image: '/image.jpg',
  link: [
    { rel: 'link rel', href: 'link href' },
    ...
  ],
  meta: [
    { name: 'meta name', content: 'meta content' },
    ...
  ],
  og: {
    title: 'og title',
    image: '/og_image.jpg',
  },
  twitter: {
    title: ' twitter title',
    image: '/twitter_image.jpg',
  },

  url: '/page.url',
  htmlAttributes: {
    lang: 'en'
  },
  script: [
    {"type": "text/javascript", "src": "http://mysite.com/js/test1.js"},
    {"type": "text/javascript", "src": "http://mysite.com/js/test2.js"}
  ],
  style: [
    {type: 'text/css', cssText: 'div{ display: block; color: blue;}' }
  ],
};

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

  const Content = () => (
    <div>
      <p>Im the Component and all rights are reserved to me</p>
      <p>Do not underestimate me! Im a very powerful Component</p>
    </div>
  );

const HomePage = (
  <HelmetHat
    render={({ helmetPropsFunc }) => (
      <React.Fragment>
        <Helmet {...helmetPropsFunc({ helmetProps: myHelmetConfig })} />
        <Layout>
          <Content />
        </Layout>
      </React.Fragment>
    )}
  />
);

export default HomePage;
```

### Important Notes

1. `react-helmet` is required as a peerDependency.

2. All `react-helmet` props are optional.

3. if you provide `title`, it will be used as default title for the open graph protocol and twitter title meta tags unless you provide them separately (eg: `og: {title: 'og specific title'}`) .same goes for `description`, `image` and `url` props.

4. if `application-name` meta tag is not provided the `sitename` will be used if the latter is provided.

5. if `canonical` link tag is not provided the `url` will be used if the latter is provided.

6. quick reminder for twitter
   - Twitter Title Max Length = `70`;
   - Twitter Desc Max Length = `200`;

### LICENSE

MIT
