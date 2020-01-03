declare module '@airhelp/runtime-env' {
  export const env: {
    API_GATEWAY_URL: string
  }

  export const setupEnv: () => Promise<void>
}
