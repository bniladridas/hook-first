'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypePrism from 'rehype-prism-plus';
import { ComponentProps } from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

type CodeProps = ComponentProps<'code'> & {
  inline?: boolean;
};

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypePrism]}
        components={{
          h1: ({ ...props }) => <h1 className="text-2xl font-bold mb-4" {...props} />,
          h2: ({ ...props }) => <h2 className="text-xl font-bold mb-3" {...props} />,
          h3: ({ ...props }) => <h3 className="text-lg font-bold mb-2" {...props} />,
          p: ({ ...props }) => <p className="mb-4" {...props} />,
          ul: ({ ...props }) => <ul className="list-disc ml-6 mb-4" {...props} />,
          ol: ({ ...props }) => <ol className="list-decimal ml-6 mb-4" {...props} />,
          li: ({ ...props }) => <li className="mb-1" {...props} />,
          code: ({ inline, ...props }: CodeProps) => 
            inline ? (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props} />
            ) : (
              <code className="block bg-muted p-4 rounded-lg overflow-x-auto" {...props} />
            ),
          pre: ({ ...props }) => (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic mb-4" {...props} />
          ),
          a: ({ ...props }) => (
            <a className="text-primary hover:underline" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
