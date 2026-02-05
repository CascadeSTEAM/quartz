import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { htmlToJsx } from "../util/jsx"

interface Options {
  targetSlug: string
}

export default ((opts?: Options) => {
  const DocumentContent: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
    const targetSlug = opts?.targetSlug
    
    // Find the specific document
    const targetFile = allFiles.find((f) => f.slug === targetSlug)

    // Safety checks: 
    // 1. Does the file exist?
    // 2. Has the markdown been parsed into HTML/JSX yet?
    if (!targetFile || !targetFile.htmlAst) {
      return null 
    }

    // We use htmlToJsx on the target file's path and its AST
    // We also provide a fallback to ensure filePath exists
    const content = htmlToJsx(targetFile.filePath ?? fileData.filePath!, targetFile.htmlAst)

    return (
      <div className={`injected-content slug-${targetSlug?.replace(/\//g, "-")}`}>
        {content}
      </div>
    )
  }

  return DocumentContent
}) satisfies QuartzComponentConstructor