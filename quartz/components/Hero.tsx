// ============================================================
// NetYeti Forest Theme — Hero.tsx
// Location in repo: quartz/components/Hero.tsx
// NEW FILE — renders the jumbotron hero on landing pages.
//
// Usage in quartz.layout.ts:
//   import { Hero } from "./quartz/components"
//   ...
//   beforeBody: [Component.Hero()],   // only shows on hero-page cssclass
//
// Usage in your index.md frontmatter:
//   ---
//   cssclasses: [hero-page]
//   hero:
//     eyebrow: "Journal of"
//     title: "The NetYeti"
//     titleAccent: "Yeti"        # word to italicize in title
//     tagline: "DevOps · Education · Community · Technology from the forest floor to the cloud"
//     cta_primary:
//       label: "Explore the Knowledge Base"
//       url: "/Knowledge-Base"
//     cta_secondary:
//       label: "About Garth"
//       url: "/about"
//   ---
// ============================================================

import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import style from "./styles/hero.scss"

interface HeroFrontmatter {
  eyebrow?: string
  title?: string
  titleAccent?: string
  tagline?: string
  cta_primary?: { label: string; url: string }
  cta_secondary?: { label: string; url: string }
}

export default (() => {
  function Hero({ fileData, displayClass }: QuartzComponentProps) {
    const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
    const isHeroPage = cssClasses.includes("hero-page")

    if (!isHeroPage) return null

    const hero = (fileData.frontmatter?.hero ?? {}) as HeroFrontmatter

    const eyebrow   = hero.eyebrow   ?? "Journal of"
    const title     = hero.title     ?? "The NetYeti"
    const accent    = hero.titleAccent ?? "Yeti"
    const tagline   = hero.tagline   ?? "Technology from the forest floor to the cloud"
    const priLabel  = hero.cta_primary?.label ?? "Explore the Knowledge Base"
    const priUrl    = hero.cta_primary?.url   ?? "/Knowledge-Base"
    const secLabel  = hero.cta_secondary?.label ?? "About Garth"
    const secUrl    = hero.cta_secondary?.url   ?? "/"

    // Split title so we can wrap the accent word in <em>
    const titleParts = title.split(accent)
    const titleJSX = titleParts.length === 2
      ? <>{titleParts[0]}<em>{accent}</em>{titleParts[1]}</>
      : <>{title}</>

    return (
      <div class={classNames(displayClass, "hero-banner")}>
        {eyebrow && <div class="hero-eyebrow">{eyebrow}</div>}
        <h1 class="hero-title">{titleJSX}</h1>
        {tagline && <p class="hero-tagline">{tagline}</p>}
        <div class="hero-cta-row">
          <a href={priUrl} class="btn-primary">{priLabel}</a>
          <a href={secUrl} class="btn-secondary">{secLabel}</a>
        </div>
      </div>
    )
  }

  Hero.css = style
  return Hero
}) satisfies QuartzComponentConstructor
