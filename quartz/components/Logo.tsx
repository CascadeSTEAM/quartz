import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { joinSegments } from "../util/path"

interface Options {
  width?: string
  height?: string
  src?: string
}

const defaultOptions: Options = {
  width: "600px",
  height: "178px",
  src: "assets/fragments/site_logo.svg", // New default path
}

export default ((opts?: Options) => {
  const Logo: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const options = { ...defaultOptions, ...opts }
    
    // Using a leading slash / ensures the browser looks at the root 
    // regardless of what folder the current page is in.
    const logoPath = `/${options.src}`.replace(/\/+/g, '/') 

    return (
      <div className={`${displayClass ?? ""} logo`}>
        <a href="/">
          <img
            src={logoPath}
            alt="Site Logo"
            width={options.width}
            height={options.height}
          />
        </a>
      </div>
    )
  }

  Logo.css = `
  .logo {
    padding: 1rem;
    text-align: center;
    & img {
      max-width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
  `

  return Logo
}) satisfies QuartzComponentConstructor