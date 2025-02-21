# Mobile multi-page application

移动端多页面项目

# Vue 3 + Typescript + Vite 6 + vw

vue@3.x + typescript@6.x + vite@5.x + (router@4.x + vuex@4.x + axios)

## 注意
每个页面 必须要有main.ts 入口文件

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.
