import { languages } from "monaco-editor";
// 标题
export const titles = [
  {
    label: "# 一级标题",
    kind: languages.CompletionItemKind.Keyword,
    insertText: " ",
  },
  {
    label: "## 二级标题",
    kind: languages.CompletionItemKind.Keyword,
    insertText: "# ",
  },
  {
    label: "### 三级标题",
    kind: languages.CompletionItemKind.Keyword,
    insertText: "## ",
  },
  {
    label: "#### 四级标题",
    kind: languages.CompletionItemKind.Keyword,
    insertText: "### ",
  },
  {
    label: "##### 五级标题",
    kind: languages.CompletionItemKind.Keyword,
    insertText: "#### ",
  },
  {
    label: "###### 六级标题",
    kind: languages.CompletionItemKind.Keyword,
    insertText: "##### ",
  },
];
// 流程图
export const mermaids = [
  {
    label: "```mermaid.flowchart[流程图]",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `\`\`mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
\`\`\`
`,
  },
  {
    label: "```mermaid.sequenceDiagram[序列图]",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `\`\`mermaid
sequenceDiagram
participant web as Web Browser
participant blog as Blog Service
participant account as Account Service
participant mail as Mail Service
participant db as Storage

Note over web,db: The user must be logged in to submit blog posts
web->>+account: Logs in using credentials
account->>db: Query stored accounts
db->>account: Respond with query result

alt Credentials not found
    account->>web: Invalid credentials
else Credentials found
  account->>-web: Successfully logged in

  Note over web,db: When the user is authenticated, they can now submit new posts
  web->>+blog: Submit new post
  blog->>db: Store post data

  par Notifications
    blog--)mail: Send mail to blog subscribers
    blog--)db: Store in-site notifications
  and Response
    blog-->>-web: Successfully posted
  end
end
\`\`\`
`,
  },
  {
    label: "```mermaid.gantt[甘特图]",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `\`\`mermaid
gantt
dateFormat  YYYY-MM-DD
title Adding GANTT diagram to mermaid
excludes weekdays 2014-01-10

section A section
Completed task            :done,    des1, 2014-01-06,2014-01-08
Active task               :active,  des2, 2014-01-09, 3d
Future task               :         des3, after des2, 5d
Future task2               :         des4, after des3, 5d
\`\`\`
`,
  },
  {
    label: "```mermaid.classDiagram[类图]",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `\`\`mermaid
classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
Class08 <--> C2: Cool label
\`\`\`
`,
  },
  {
    label: "```mermaid.gitGraph[git分支图]",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `\`\`mermaid
gitGraph
  commit
  commit
  branch develop
  commit
  commit
  commit
  checkout main
  commit
  commit
\`\`\`
`,
  },
  {
    label: "```mermaid.erDiagram[实体关系图]",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `\`\`mermaid
erDiagram
CUSTOMER ||--o{ ORDER : places
ORDER ||--|{ LINE-ITEM : contains
CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
\`\`\`
`,
  },
  {
    label: "```mermaid.journey[用户流程图]",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `\`\`mermaid
journey
title My working day
section Go to work
  Make tea: 5: Me
  Go upstairs: 3: Me
  Do work: 1: Me, Cat
section Go home
  Go downstairs: 5: Me
  Sit down: 5: Me
\`\`\` `,
  },
  {
    label: "```pseudocode[伪代码块]",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `\`\`pseudocode
\\begin{algorithm}
\\caption{Example Pseudocode}
\\begin{algorithmic}
  \\STATE $x\\gets0$
  \\STATE $y\\gets\\sqrt{x}+1$
  \\STATE $z\\gets\\dfrac{x}{y}$
\\end{algorithmic}
\\end{algorithm}
\`\`\` `,
  },
  // {
  //   label: "```mermaid.flowchart[]",
  //   kind: languages.CompletionItemKind.Keyword,
  //   insertText: `\`\`\`mermaid
  // graph TD;
  //   A-->B;
  //   A-->C;
  //   B-->D;
  //   C-->D;
  // \`\`\` `,
  // },
];

export const pseudocode = [
  {
    label: "\\begin{algorithm} 程序块",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `begin{algorithm}
\\end{algorithm}
`,
  },
  {
    label: "\\begin{algorithm} 程序块",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `begin{algorithm}
\\end{algorithm}
`,
  },
  {
    label: "\\caption{} 标题注释",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `caption{注释}`,
  },
  {
    label: "\\STATE 代码行",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `STATE `,
  },
  {
    label: "\\COMMENT 注释",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `COMMENT {注释}`,
  },
  {
    label: "\\IF 分支",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `IF {}
\\ELIF {}
\\ELSE
\\ENDIF`,
  },
  {
    label: "\\FUNCTION 函数",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `FUNCTION {name}{params}
\\RETURN {a}
\\ENDFUNCTION`,
  },
  {
    label: "\\WHILE 循环",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `WHILE{<condition>}
\\ENDWHILE`,
  },
  {
    label: "\\FOR 循环",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `FOR {$j = p$ \\TO $r - 1$}
\\ENDFOR`,
  },
  {
    label: "\\PROCEDURE 过程",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `PROCEDURE {Partition}{$A, p, r$}
\\STATE $x = A[r]$
\\STATE $i = p - 1$
\\ENDPROCEDURE`,
  },
  {
    label: "\\AND 与",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `AND`,
  },
  {
    label: "\\OR 或",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `OR`,
  },
  {
    label: "\\TO 到",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `TO`,
  },
  {
    label: "\\NOT 非",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `NOT`,
  },
  {
    label: "\\TRUE 真",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `TRUE`,
  },
  {
    label: "\\FALSE 假",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `FALSE`,
  },
  {
    label: "\\CALL 调用函数",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `CALL {fname} {params}`,
  },
  {
    label: "\\RETURN 返回",
    kind: languages.CompletionItemKind.Keyword,
    insertText: `RETURN`,
  },
];
