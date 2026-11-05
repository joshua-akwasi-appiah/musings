import { h } from "preact"

function shouldRenderComments(fileData) {
  const setting = fileData.frontmatter?.comments
  return setting !== false && setting !== "false"
}

export function CommentBox(options) {
  const projectId = options?.projectId
  if (!projectId) {
    throw new Error("CommentBox requires a projectId")
  }

  const Comments = ({ displayClass, fileData }) => {
    if (!shouldRenderComments(fileData)) return null

    return h(
      "section",
      { class: [displayClass, "musings-comments"].filter(Boolean).join(" ") },
      h("div", { class: "musings-comments-intro" }, [
        h("p", { class: "musings-comments-kicker" }, "THOUGHTS?"),
        h("h2", null, "Continue the conversation"),
        h(
          "p",
          null,
          "Share a thought, a connection or a different perspective. Please be kind.",
        ),
      ]),
      h("div", { class: "commentbox" }),
    )
  }

  const escapedProjectId = JSON.stringify(projectId)
  Comments.afterDOMLoaded = `
const mountCommentBox = () => {
  const container = document.querySelector(".commentbox")
  if (!container || container.dataset.commentboxMounted === "true") return

  const initialise = () => {
    if (typeof window.commentBox !== "function") return
    window.commentBox(${escapedProjectId}, { className: "musings-commentbox" })
    container.dataset.commentboxMounted = "true"
  }

  if (typeof window.commentBox === "function") {
    initialise()
    return
  }

  const existing = document.querySelector("script[data-commentbox-script]")
  if (existing) {
    existing.addEventListener("load", initialise, { once: true })
    return
  }

  const script = document.createElement("script")
  script.src = "https://unpkg.com/commentbox.io/dist/commentBox.min.js"
  script.async = true
  script.dataset.commentboxScript = "true"
  script.addEventListener("load", initialise, { once: true })
  document.head.appendChild(script)
}

document.addEventListener("nav", mountCommentBox)
document.addEventListener("render", mountCommentBox)
mountCommentBox()
`

  Comments.css = `
.musings-comments {
  margin-top: 2.5rem;
  padding: 1.5rem;
  border: 1px solid var(--lightgray);
  border-radius: 0.8rem;
  background: color-mix(in srgb, var(--lightgray) 54%, transparent);
}

.musings-comments-intro {
  margin-bottom: 1.25rem;
}

.musings-comments-kicker {
  margin: 0 0 0.25rem;
  color: var(--secondary);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.09em;
}

.musings-comments h2 {
  margin: 0;
  color: var(--dark);
  font-size: 1.45rem;
}

.musings-comments-intro > p:last-child {
  margin: 0.4rem 0 0;
  color: var(--darkgray);
}

.commentbox {
  min-height: 10rem;
}
`

  return Comments
}
