import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

import "./index.less";

import "github-markdown-css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const Vue: React.FC = () => {
  const [mdContent, setMdContent] = useState("");
  useEffect(() => {
    fetch("/vue3/README.md")
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsText(blob, "GB3212");
        reader.onload = () => {
          setMdContent(reader.result as string);
        };
      });
  });

  type NavTitle = {
    id: number;
    title: string;
    type: string;
  };

  useEffect(() => {
    const md = document.getElementsByClassName("markdown-body")[0];
    const navBox = document.getElementsByClassName("markdown-nav")[0];
    if (!md) return;
    let eid = 0;
    const navTitles: NavTitle[] = [];
    for (const mdElement of md.childNodes) {
      if (mdElement.nodeName === "H2" || mdElement.nodeName === "H2" || mdElement.nodeName === "H3") {
        navTitles.push({
          id: eid,
          title: (mdElement as HTMLDivElement).innerText || "",
          type: mdElement.nodeName,
        });
        let a = document.createElement("a");
        a.setAttribute("id", `${eid}`);
        mdElement.appendChild(a);
        eid++;
      }
    }
    navTitles.forEach((item, index) => {
      let aTag = document.createElement("a");
      aTag.setAttribute("href", `/#/vue/#${item.id}`);
      aTag.innerText = item.title;
      aTag.setAttribute("name", item.type);
      if (!index) {
        aTag.setAttribute("class", "md-nav md-nav-act");
      } else {
        aTag.setAttribute("class", "md-nav");
      }
      aTag.onclick = (e) => {
        e.preventDefault();
        (document.getElementById(`${item.id}`) as HTMLDivElement).scrollIntoView({
          block: "center",
          behavior: "smooth",
          inline: "center",
        });
        [...document.getElementsByClassName("md-nav")].forEach((nodeItem) => {
          nodeItem.classList.remove("md-nav-act");
        });
        (e.target as HTMLElement).classList.add("md-nav-act");
      };
      navBox.appendChild(aTag);
    });
  });

  return (
    <div className="markdown-box">
      <div className="markdown-nav" />
      <ReactMarkdown
        className="markdown-body"
        children={mdContent}
        components={{
          // eslint-disable-next-line react/no-unstable-nested-components
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

export default Vue;
