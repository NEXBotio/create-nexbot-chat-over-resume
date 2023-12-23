

import dynamic from 'next/dynamic';

const MarkdownLatex = dynamic(() => import('@/components/MarkdownLatex'), { ssr: false });
const MarkdownLatexDynamicClient = ({children}:{children:React.ReactNode}) => {
    // return (<MarkdownLatex onRendered={onRendered}>
    return (<MarkdownLatex>
         {typeof children === 'string' ? children : ""}
        </MarkdownLatex>)
};

export default MarkdownLatexDynamicClient;