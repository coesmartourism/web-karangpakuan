/// <reference types="../../worker-configuration" />
// @ts-expect-error cloudflare:workers disediakan saat runtime oleh Cloudflare Vite plugin
import { env } from 'cloudflare:workers'

export function getDB(): D1Database {
  return (env as unknown as { DB: D1Database }).DB
}