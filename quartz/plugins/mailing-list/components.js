import { h } from "preact"

const excludedSlugs = new Set([
  "index",
  "about",
  "why-musings",
  "map-of-the-garden",
  "learning",
  "ideas-and-observations",
  "work-and-practice",
  "experiments",
  "people-and-public-engagement",
  "portfolio",
])

function shouldRenderSignup(fileData) {
  return (
    Boolean(fileData.slug) &&
    !excludedSlugs.has(fileData.slug) &&
    !fileData.slug.endsWith("/index")
  )
}

export function MailingList() {
  const Signup = ({ displayClass, fileData }) => {
    if (!shouldRenderSignup(fileData)) return null

    return h(
      "section",
      {
        class: [displayClass, "musings-signup"].filter(Boolean).join(" "),
        "aria-labelledby": "musings-signup-title",
      },
      h("div", { class: "musings-signup-intro" }, [
        h("p", { class: "musings-signup-kicker" }, "FROM THE GARDEN"),
        h("h2", { id: "musings-signup-title" }, "Keep in touch"),
        h(
          "p",
          null,
          "Get occasional notes when something new grows here. No noise; just ideas, questions and reflections worth returning to.",
        ),
      ]),
      h("div", { class: "ml-embedded", "data-form": "HMfSnR" }),
    )
  }

  Signup.css = `
.musings-signup {
  margin-top: 2.5rem;
  padding: 1.5rem;
  border: 1px solid var(--lightgray);
  border-radius: 0.8rem;
  background: color-mix(in srgb, var(--lightgray) 54%, transparent);
}

.musings-signup-intro {
  margin-bottom: 1.25rem;
}

.musings-signup-kicker {
  margin: 0 0 0.25rem;
  color: var(--secondary);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.09em;
}

.musings-signup h2 {
  margin: 0;
  color: var(--dark);
  font-size: 1.45rem;
}

.musings-signup-intro > p:last-child {
  margin: 0.4rem 0 0;
  color: var(--darkgray);
}
`

  return Signup
}
