import MarkdownIt from "markdown-it";
import container from "markdown-it-container";

const uses = (md: MarkdownIt) => {
  //@ts-ignore
  md.use(...createContainer("tip", "提示"))
    //@ts-ignore
    .use(...createContainer("warning", "注意"))
    //@ts-ignore
    .use(...createContainer("danger", "警告"))
    // explicitly escape Vue syntax
    .use(container, "v-pre", {
      render: (tokens: any, idx: any) => (tokens[idx].nesting === 1 ? `<div v-pre>\n` : `</div>\n`),
    })
    .use(container, "vue", {
      render: (tokens: any, idx: any) =>
        tokens[idx].nesting === 1 ? `<pre class="vue-container"><code>` : `</code></pre>`,
    });
};

function createContainer(klass: string, defaultTitle: string) {
  return [
    container,
    klass,
    {
      render(tokens: any, idx: any) {
        const token = tokens[idx];
        const info = token.info.trim().slice(klass.length).trim();
        if (token.nesting === 1) {
          return `<div class="${klass} custom-block"><p class="custom-block-title">${info || defaultTitle}</p>\n`;
        } else {
          return `</div>\n`;
        }
      },
    },
  ];
}

export default function useMarkContainer(edit: MarkdownIt) {
  uses(edit);
}
