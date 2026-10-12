"use client"
import {tss} from '../../components/common/theme';
import {Title, Subtitle, Subheading, Body} from '../../components/common/typography';
import {BLOCKS} from './registry';

// Logic copied from klive-dashboard/dashboard/lib/blocks/render-nodes.tsx; styling is the site's own.

// Only these schemes are ever safe to render as a public-facing href — an unsanitized
// href could otherwise carry a javascript: URL straight through from the editor.
const SAFE_HREF_SCHEMES = ["http:", "https:", "mailto:"];

function safeHref(href) {
    if(typeof href !== "string" || !href) return null;
    try {
        // A relative URL (no scheme) resolves against this dummy base and is safe by
        // construction — only an absolute URL's scheme needs checking.
        const scheme = new URL(href, "https://example.com").protocol;
        return SAFE_HREF_SCHEMES.includes(scheme)? href : null;
    } catch {
        return null;
    }
}

const useStyles = tss.create(({theme}) => ({
    // Vertical rhythm for a run of blocks: 20px between blocks, 5px under headings so a
    // title/type/date stack reads as one header group.
    flow: {
        "& > *": {
            marginBottom: "20px"
        },
        "& > .heading": {
            marginBottom: "5px"
        },
        "& > :last-child": {
            marginBottom: 0
        }
    },
    title: {
        color: theme.secondary.accent.hex()
    },
    paragraph: {
        fontSize: "1.1rem",
        textWrap: "pretty"
    },
    link: {
        color: theme.secondary.accent.hex(),
        textDecoration: "underline"
    },
    inlineCode: {
        fontFamily: "var(--code-font, monospace)",
        fontSize: "0.9em",
        padding: "0 4px",
        backgroundColor: theme.neutral.shadow.alpha(0.25).hexa()
    },
    list: {
        paddingLeft: "24px",
        "& li > *": {
            marginBottom: "5px"
        }
    },
    blockquote: {
        paddingLeft: "20px",
        borderLeft: `3px solid ${theme.secondary.accent.hex()}`
    },
    codeBlock: {
        margin: 0,
        padding: "20px",
        overflowX: "auto",
        fontFamily: "var(--code-font, monospace)",
        fontSize: "0.85rem",
        lineHeight: 1.5,
        color: theme.secondary.onContainer.hex(),
        backgroundColor: theme.neutral.shadow.alpha(0.25).hexa()
    }
}));

/** A vertical run of rendered nodes with the site's block spacing. */
export function Flow({nodes, ctx}) {
    const {classes} = useStyles();
    return <div className={classes.flow}>{renderNodeList(nodes, ctx)}</div>;
}

function Link({href, target, children}) {
    const {classes} = useStyles();
    return <a className={classes.link} href={href} target={target?? undefined} rel="noopener noreferrer">{children}</a>;
}

function InlineCode({children}) {
    const {classes} = useStyles();
    return <code className={classes.inlineCode}>{children}</code>;
}

function renderMarks(text, marks = []) {
    let node = text;
    for(const mark of marks) {
        if(mark.type === "bold") node = <strong>{node}</strong>;
        else if(mark.type === "italic") node = <em>{node}</em>;
        else if(mark.type === "strike") node = <s>{node}</s>;
        else if(mark.type === "code") node = <InlineCode>{node}</InlineCode>;
        else if(mark.type === "underline") node = <u>{node}</u>;
        else if(mark.type === "link") {
            const href = safeHref(mark.attrs?.href);
            if(href) node = <Link href={href} target={mark.attrs?.target}>{node}</Link>;
        }
    }
    return node;
}

function renderInline(nodes = []) {
    return nodes.map((node, i) => {
        if(node.type === "text") return <span key={i}>{renderMarks(node.text, node.marks)}</span>;
        if(node.type === "hardBreak") return <br key={i} />;
        return null;
    });
}

function Paragraph({content}) {
    const {classes} = useStyles();
    return <Body className={classes.paragraph}>{renderInline(content)}</Body>;
}

// h1 matches the old project popup's accent-colored Title, h2 its Subtitle.
function Heading({level, content}) {
    const {classes, cx} = useStyles();
    if(level === 1) return <Title className={cx(classes.title, "heading")}>{renderInline(content)}</Title>;
    if(level === 2) return <Subtitle className="heading">{renderInline(content)}</Subtitle>;
    return <Subheading className="heading">{renderInline(content)}</Subheading>;
}

function List({ordered, items, ctx}) {
    const {classes} = useStyles();
    const Tag = ordered? "ol" : "ul";
    return (
        <Tag className={classes.list}>
            {(items?? []).map((item, i) => <li key={i}>{renderNodeList(item.content, ctx)}</li>)}
        </Tag>
    );
}

function Blockquote({content, ctx}) {
    const {classes} = useStyles();
    return <blockquote className={classes.blockquote}><Flow nodes={content} ctx={ctx} /></blockquote>;
}

function CodeBlock({content}) {
    const {classes} = useStyles();
    return <pre className={classes.codeBlock}><code>{(content?? []).map(node => node.text).join("")}</code></pre>;
}

/**
 * Recursively renders a Tiptap JSON node — dispatches registered klive block types to
 * their Preview component, and falls back to a small built-in prose renderer for plain
 * StarterKit nodes. `ctx` is `{config, assetsById}`.
 */
export function renderNode(node, ctx, key) {
    if(!node) return null;
    const block = BLOCKS[node.type];
    if(block) {
        const Preview = block.Preview;
        // Deep-merge so a render-config saved before a schema addition still gets the
        // newer fields' defaults.
        const config = {...block.configDefaults, ...(ctx.config?.[block.key]?? {})};
        return <Preview key={key} attrs={node.attrs?? {}} config={config} assetsById={ctx.assetsById} content={node.content} ctx={ctx} />;
    }

    switch(node.type) {
        case "doc":
            return <Flow key={key} nodes={node.content} ctx={ctx} />;
        case "paragraph":
            return <Paragraph key={key} content={node.content} />;
        case "heading":
            return <Heading key={key} level={node.attrs?.level?? 2} content={node.content} />;
        case "bulletList":
            return <List key={key} items={node.content} ctx={ctx} />;
        case "orderedList":
            return <List key={key} ordered items={node.content} ctx={ctx} />;
        case "blockquote":
            return <Blockquote key={key} content={node.content} ctx={ctx} />;
        case "codeBlock":
            return <CodeBlock key={key} content={node.content} />;
        default:
            return null;
    }
}

export function renderNodeList(nodes = [], ctx) {
    return (nodes?? []).map((node, i) => renderNode(node, ctx, i));
}
