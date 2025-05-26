/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FACEBOOK_PIXEL_ID: string
  readonly VITE_FACEBOOK_API_VERSION: string
  readonly FACEBOOK_ACCESS_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 