import { bootstrap } from '@/main/bootstrap.ts'

async function main() {
  const app = await bootstrap()

  const PORT = process.env.PORT || 3333
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

main().catch((err) => {
  console.error('Failed to start application:', err)
})
