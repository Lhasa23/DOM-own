window.dom = {
    create(HTMLStr) {
        const container = document.createElement('template')
        container.innerHTML = HTMLStr.trim()
        return container.content.firstChild
    },
    after(node1, node2) {
        dom.parent(node1).insertBefore(node2, node1.nextSibling)
    },
    before(node1, node2) {
        dom.parent(node1).insertBefore(node2, node1)
    },
    append(parent, node) {
        parent.appendChild(node)
    },
    wrap(previous, wrapperNode) {
        dom.before(previous, wrapperNode)
        dom.append(wrapperNode, previous)
    },
    remove(node) {
        dom.parent(node).removeChild(node)
        return node
    },
    empty(node) {
        const { childNodes } = node
        let arr = []
        for (let i = childNodes.length -1; i >= 0; i--) {
            arr.push(dom.remove(childNodes[i]))
        }
        return arr
    },
    attr(node, name, value) {
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else  if (arguments.length === 2){
            return node.getAttribute(name)
        }
    },
    text(node, string) {
        if (arguments.length === 2){
            if ('innerText' in node) {
                node.innerText = string
            } else {
                node.textContent = string
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },
    html(node, string) {
        if (arguments.length === 2){
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    style(node, obj, style) {
        if (arguments.length === 3) {
            node.style[obj] = style
        } else if (arguments.length === 2) {
            if (typeof obj === 'string') {
                return node.style[obj]
            } else if (obj instanceof Object) {
                for (let key in obj) {
                    node.style[key] = obj[key]
                }
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    find(selector, target) {
        return (target || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    siblings(node) {
        return Array.from(dom.parent(node).children).filter(n => n !== node)
    },
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        const list = dom.children(dom.parent(node))
        for (let i = 0; i < list.length; i++) {
            if (list[i] === node) {
                return i
            }
        }
    }
}
