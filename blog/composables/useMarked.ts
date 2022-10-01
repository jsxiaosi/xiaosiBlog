import hljs from 'highlight.js'
import { marked } from 'marked'
import 'highlight.js/styles/monokai-sublime.css'

interface TocItem {
  anchor: string
  level: number
  text: string
  children?: TocItem[]
}

export function useMarked() {
  const tocItems = ref<TocItem[]>([])
  const index = ref<number>(0)

  const add = (text: string, level: number) => {
    const anchor = `toc${level}${++index.value}`
    const item = { anchor, level, text }
    const items: TocItem[] = tocItems.value
    if (items.length === 0) {
      // 第一个 item 直接 push
      items.push(item)
    }
    else {
      let lastItem = items[
        items.length > 0 ? items.length - 1 : items.length
      ] as TocItem // 最后一个 item

      if (item.level > lastItem.level) {
        // item 是 lastItem 的 children
        for (let i = lastItem.level + 1; i <= 2; i++) {
          const { children } = lastItem
          if (!children) {
            // 如果 children 不存在
            lastItem.children = [item]
            break
          }

          lastItem = children[
            children.length > 0 ? children.length - 1 : children.length
          ] as TocItem // 重置 lastItem 为 children 的最后一个 item

          if (item.level <= lastItem.level) {
            // item level 小于或等于 lastItem level 都视为与 children 同级
            children.push(item)
            break
          }
        }
      }
      else {
        // 置于最顶级
        items.push(item)
      }
    }

    return anchor
  }
  const renderer = new marked.Renderer()
  renderer.heading = function (text, level, _raw) {
    const anchor = add(text, level)
    return `<a id=${anchor} name=${anchor} class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }

  marked.setOptions({
    renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    breaks: true,
    smartLists: true,
    smartypants: false,
    highlight(code) {
      return hljs.highlightAuto(code).value
    },
  })

  return { marked, tocItems }
}
