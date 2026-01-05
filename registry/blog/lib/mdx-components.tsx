import { HTMLAttributes } from 'react';
import Image from 'next/image'

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const components = {
  Image,
  h2: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(children?.toString() || '');
    return (
      <h2 id={id} {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(children?.toString() || '');
    return (
      <h3 id={id} {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(children?.toString() || '');
    return (
      <h4 id={id} {...props}>
        {children}
      </h4>
    );
  },
};

export default components;




