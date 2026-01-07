'use client'

import React from 'react';
import { useEffect, useState } from 'react';
import { TableOfContentsItem } from '@/lib/mdx';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>();

  // Filter for only h2 headings
  const mainHeadings = items.filter(item => item.level === 2);

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0
    });

    mainHeadings.forEach((heading) => {
      const element = document.getElementById(heading.url.slice(1));
      if (element) {
        observer.observe(element);
      }
    });

    // Check if we're at the top of the page and select first heading
    const handleScroll = () => {
      if (window.scrollY < 200 && mainHeadings.length > 0) {
        const firstHeadingId = mainHeadings[0].url.slice(1);
        setActiveId(firstHeadingId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mainHeadings]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (mainHeadings.length === 0) {
    return null;
  }

  return (
    <nav className="space-y-1 text-sm">
      {mainHeadings.map((heading) => {
        const isActive = `#${activeId}` === heading.url;

        return (
          <a
            key={heading.url}
            href={heading.url}
            onClick={(e) => scrollToSection(e, heading.url.slice(1))}
            className={`
              block py-1 flex items-center gap-2
              [transition:color_600ms_ease-in-out]
              ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground'}
              hover:text-foreground
            `}
          >
            <div className="w-4 flex justify-center [transition:width_1000ms_ease-in-out]">
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
              )}
            </div>
            <div className="flex-1">
              {heading.title}
            </div>
          </a>
        );
      })}
    </nav>
  );
}







