import fs from "node:fs"
import path from "node:path"
import HTMLtoJSX from "htmltojsx"

const inputFile = process.argv[2]
const outputFile = process.argv[3]
const pageName = process.argv[4] || "Page"
const title = process.argv[5] || "Villa Aurelia | Boutique Luxury Sanctuary"

if (!inputFile || !outputFile) {
  console.error(
    "Usage: node convert-html.mjs <input.html> <output.tsx> [PageName] [title]"
  )
  process.exit(1)
}

let html = fs.readFileSync(inputFile, "utf-8")

// Extract body content
const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
let body = bodyMatch ? bodyMatch[1] : html

// Remove the embedded header and footer since we have shared ones
body = body
  .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "")
  .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "")

// Convert HTML to JSX
const converter = new HTMLtoJSX({ createClass: false })
let jsx = converter.convert(body)

// Post-process
jsx = jsx
  // htmltojsx converts class to className and handles escaping well
  // Strip inline event handlers — interactivity must be implemented in React later
  .replace(/\s(onclick|onsubmit|onchange|oninput|onfocus|onblur|onkeydown|onkeyup|onload|onerror|onmouseover|onmouseout|onmouseenter|onmouseleave)="[^"]*"/gi, "")
  // but it may leave inline style as strings; ensure JSX style objects work
  .replace(/style="([^"]*)"/g, (match, styles) => {
    const styleObj = {}
    const rules = styles.match(/(?:[^;']|'[^']*')+/g) || []
    rules.forEach((rule) => {
      const colonIdx = rule.indexOf(":")
      if (colonIdx > 0) {
        const key = rule.slice(0, colonIdx).trim()
        let value = rule.slice(colonIdx + 1).trim()
        if (!key || !value) return
        const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
        styleObj[camelKey] = value
      }
    })
    const entries = Object.entries(styleObj)
      .map(([k, v]) => `${k}: "${v}"`)
      .join(", ")
    return `style={{${entries}}}`
  })

const output = `import Link from "next/link"

export const metadata = {
  title: "${title}",
  description:
    "Where Tuscan travertine meets sun-drenched terraced hills and slow Mediterranean living.",
}

export default function ${pageName}() {
  return (
    <div className="bg-surface">
${jsx
  .split("\n")
  .map((line) => (line.trim() ? "      " + line : ""))
  .join("\n")}
    </div>
  )
}
`

fs.mkdirSync(path.dirname(outputFile), { recursive: true })
fs.writeFileSync(outputFile, output)
console.log(`Converted ${inputFile} -> ${outputFile}`)
