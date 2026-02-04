import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"

interface Options {
  folderSlug: string
  className?: string
  showTimestamp?: boolean // Toggle for the date
}

const CustomBlock: QuartzComponentConstructor = (opts?: Options) => {
  const CustomBlock: QuartzComponent = ({ allFiles, displayClass, cfg }: QuartzComponentProps) => {
    const contentFile = allFiles.find((f) => f.slug === opts?.folderSlug)

    if (!contentFile) {
      console.warn(`[CustomBlock] Content file for slug "${opts?.folderSlug}" not found.`)
      return "null"
    }

    const content = contentFile.contentData?.componentData ?? null
    
    // Extract and format the date if requested
    // Quartz stores dates in contentFile.dates
    const lastModified = contentFile.dates?.modified
    const locale = cfg.locale ?? "en-US"
    
    const containerClass = `custom-block-container ${displayClass ?? ""} ${opts?.className ?? ""}`.trim()
    
    console.log("Looking for:", opts?.folderSlug, "Available slugs:", allFiles.map(f => f.slug))
    
    return (
      <div className={containerClass}>
        <div className="custom-block-content">
          {content}
        </div>
        {opts?.showTimestamp && lastModified && (
          <p className="custom-block-timestamp">
            {i18n(locale).components.contentMeta.lastUpdated}: {lastModified.toLocaleDateString(locale, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        )}
      </div>
    )
  }

  return CustomBlock
}

export default CustomBlock