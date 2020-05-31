import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { IoIosArrowForward, IoMdOpen } from 'react-icons/io';
import { RoundImage, ParagraphWithoutWrap, H2, Anchor, Ul, Li } from './styles';

interface SectionInterface {
    title?: string;
    href?: string;
    attachReferrer?: boolean;
}

export const Section = (props: PropsWithChildren<SectionInterface>) => {
    if (props.href) {
        const child = props.href.startsWith('/')
            ? (
                <H2>
                    <InternalAnchor href={props.href}>
                        {props.title}
                        <IoIosArrowForward style={{ verticalAlign: 'middle' }} />
                    </InternalAnchor>
                </H2>
            )
            : (
                <H2>
                    <ExternalAnchor href={props.href} attachReferrer={props.attachReferrer}>
                        {props.title}
                    </ExternalAnchor>
                </H2>
            )
        return <section style={{ marginBottom: '1em' }}>{child}</section>;
    } else {
        return (
            <section>
                {props.title && <H2>{props.title}</H2>}
                {props.children}
            </section>
        );
    }
};

interface LocalImageProps {
    src: string;
    alt?: string;
    width?: string;
    height?: string;
    isRounded?: boolean;
}

export const LocalImage = (props: LocalImageProps) => {
    // Get name from the path.
    // Note: `path.parse()` cannot be used,
    //     for node-libs-browser (webpack's dependency) uses old path-browserify.
    //     This won't be fixed for a while. https://github.com/webpack/node-libs-browser/pull/79
    const base = props.src.split('/')[props.src.split('/').length - 1];
    const name = base.split('.').slice(0, -1).join('.');
    if (props.isRounded !== true) { // undefined (default) or false
        return <img
            src={props.src}
            alt={props.alt ? props.alt : name}
            width={props.width}
            height={props.height}
        />;
    } else {
        return <RoundImage
            src={props.src}
            alt={props.alt ? props.alt : name}
            width={props.width}
            height={props.height}
        />;
    }
};

interface CustomWordBreakProps {
    separator?: string;
}

export const CustomWordBreak = (props: PropsWithChildren<CustomWordBreakProps>) => {
    const childrenString = props.children?.toString();
    const separator = props.separator || '\\'; // Actually '\'
    const elements = childrenString?.split(separator).map(str => <>
        <span>{str}</span>
        <wbr />
    </>);
    return <ParagraphWithoutWrap>{elements}</ParagraphWithoutWrap>;
};

export const UnorderedList = (props: { list: any[]; }) => (
    <Ul>
        {props.list.map((li, i) => <Li key={i}>{li}</Li>)}
    </Ul>
);

export const InternalAnchor = (props: PropsWithChildren<{ href: string; }>) => (
    <Link href={props.href}>
        <Anchor>{props.children}</Anchor>
    </Link>
);

interface ExternalAnchorInterface {
    href: string;
    openInNewTab?: boolean;
    attachReferrer?: boolean;
}

export const ExternalAnchor = (props: PropsWithChildren<ExternalAnchorInterface>) => {
    const openInNewTab = props.openInNewTab === undefined ? true : props.openInNewTab;
    const attachReferrer = props.attachReferrer === undefined ? false : props.attachReferrer;
    const target = openInNewTab ? '_blank' : undefined;
    const rel = attachReferrer ? 'noopener' : 'noreferrer'; // https://web.dev/external-anchors-use-rel-noopener/
    return (
        <Anchor href={props.href} target={target} rel={rel} >
            {props.children}
            <IoMdOpen style={{verticalAlign: 'text-bottom', marginLeft: '.2em'}} />
        </Anchor>
    );
};