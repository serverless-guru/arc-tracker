import { randomBytes, pbkdf2Sync } from 'crypto'

export function generateSalt() {
  return randomBytes(64).toString('hex')
} 

export function hashPassword (password, salt) {
  const iterations = 100000
  const keylen = 64
  const digest = 'sha512'
  return pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex')
};