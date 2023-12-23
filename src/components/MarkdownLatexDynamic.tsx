// MarkdownLatexDynamic.tsx
import dynamic from 'next/dynamic';

const MarkdownLatex = dynamic(() => import('@/components/MarkdownLatex'), { ssr: false });
const MarkdownLatexDynamic = ({children}:{children:React.ReactNode}) => {
    return (<MarkdownLatex >
         {typeof children === 'string' ? children : ""}
        </MarkdownLatex>)
};

export default MarkdownLatexDynamic;
