import { defineConfig } from 'vitest/config'
import solid from 'vite-plugin-solid'
console.log(123)
export default defineConfig({
  test: {
    environment: 'jsdom',
    transformMode: {
      web: [/.[jt]sx?/],
    },
    deps: {
      inline: [/solid-js/],
    },
    threads: false,
    isolate: false,
  },
  plugins: [solid()],
  resolve: {
    conditions: ['development', 'browser'],
  },
})
