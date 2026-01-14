import type {MenuItem} from "../types/Ui";

export const menuItems: Record<string, MenuItem[]> = {
  Demos: [
    { label: 'Demos 1', href: '#' },
    { label: 'Demos 2', href: '#' },
  ],
  Post: [
    { label: 'Post Header', href: '#' },
    { label: 'Post Layout', href: '#' },
    { label: 'Share Buttons', href: '#' },
    { label: 'Gallery Post', href: '#' },
    { label: 'Video Post', href: '#' },
  ],
  Features: [
    { label: 'Typography', href: '#' },
    { label: 'Buttons', href: '#' },
  ],
  Categories: [
    { label: 'Travel', href: '#' },
    { label: 'Lifestyle', href: '#' },
  ],
  Shop: [
    { label: 'Products', href: '#' },
    { label: 'Cart', href: '#' },
  ],
}