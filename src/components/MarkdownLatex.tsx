"use client"
import {components} from '@/components/MDXComponents'
import React from 'react';
import ReactMarkdown from 'react-markdown';
import RemarkMathPlugin from 'remark-math';
import "@/styles/mdx.css"
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { synthwave84,  atomDark  } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';
import {BlockMath, InlineMath} from 'react-katex'
import { useTheme } from 'next-themes';
import CopyButton from './CopyButton';

interface MarkdownLatexProps {
  value?: string;
  inline?: boolean;
  // onRendered: () => void;
  senderType?:'ai'|'human'
    children?: string;
}
interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: string;
}


const CodeBlock: React.FC<CodeBlockProps> = ( props ) => {
  const {resolvedTheme} = useTheme()
  const {inline, className, children} = props;
  const match = /language-(\w+)/.exec(className || '');
  let lang = "python";
  if (match && match[1]) {
    lang = match[1];
  }


// If the language is latex, render with BlockMath
if (lang === "latex") {
const latexCode = Array.isArray(children) ? children.join('') : children;
return (
  <div style={{textAlign: 'left'}}>
      <BlockMath>{latexCode}</BlockMath>
  </div>
);
}


  return !inline && match ? (
    <div className="relative">
        <CopyButton value={String(children).replace(/\n$/, '')} />

      <SyntaxHighlighter 
      style={resolvedTheme=='dark'?synthwave84:atomDark} 
      language={lang} 
      PreTag="div" 
      customStyle={{ padding: '40px' ,borderRadius:'15px'}} 
       {...props}>{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
       </div>

  ) : (
      <code className={className} {...props}>{children}</code>
  );
};


const componentsWithCode = {...components, code: CodeBlock as any,blockquote:CodeBlock as any};
// const MarkdownLatex: React.FC<MarkdownLatexProps> = ({children, onRendered}) => {
  const MarkdownLatex: React.FC<MarkdownLatexProps> = ({children}) => {
  // const MarkdownLatex: React.FC<MarkdownLatexProps> = ({children}) => {
  const newProps = {
    remarkPlugins: [
        RemarkMathPlugin,
        gfm
      ],
      components: {...componentsWithCode,
        math: (props: MarkdownLatexProps) => 
          <BlockMath math={props.value || ''} />,
        inlineMath: (props: MarkdownLatexProps) =>
          <InlineMath math={props.value || ''} />
      }
  };


//   React.useLayoutEffect(() => {
//     if (onRendered) {
//       console.log('onRendered')
//       onRendered();
//   }
// }, [children, onRendered]); // Re-run this effect if children or onRendered changes

return (
  <ReactMarkdown skipHtml={false} {...newProps} remarkPlugins={newProps.remarkPlugins}>
    {typeof children === 'string' ? children : ""}
  </ReactMarkdown>
);
};




export default React.memo(MarkdownLatex);