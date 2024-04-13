// @ts-ignore
import clipboardScript from "./scripts/clipboard.inline"
import clipboardStyle from "./styles/clipboard.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Body: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return <div id="quartz-body">{children}</div> <!-- Google Tag Manager (noscript) --> <noscript> <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5SQGR8PM" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> <!-- End Google Tag Manager (noscript) -->
}

Body.afterDOMLoaded = clipboardScript
Body.css = clipboardStyle

export default (() => Body) satisfies QuartzComponentConstructor
