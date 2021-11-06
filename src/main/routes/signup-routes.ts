import { Router } from 'express'

const router = Router()

router.post('/signup', (req, res) => {
  return res.json({ ok: 'ok' })
})

export default router
