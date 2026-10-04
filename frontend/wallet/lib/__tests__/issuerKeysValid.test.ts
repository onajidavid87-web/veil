import { TextEncoder, TextDecoder } from 'util'
Object.assign(globalThis, { TextEncoder, TextDecoder })

import { StrKey } from '@stellar/stellar-sdk'
import { ASSET_REGISTRY, USDY_MAINNET_ISSUER, USDT0_MAINNET_ISSUER } from '../assets'

describe('Issuer Keys Ed25519 Validity Check', () => {
  it('validates every issuer key in ASSET_REGISTRY', () => {
    Object.values(ASSET_REGISTRY).forEach((asset) => {
      expect(StrKey.isValidEd25519PublicKey(asset.issuer)).toBe(true)
    })
  })

  it('validates USDY and USDT0 exported issuers', () => {
    expect(StrKey.isValidEd25519PublicKey(USDY_MAINNET_ISSUER)).toBe(true)
    expect(StrKey.isValidEd25519PublicKey(USDT0_MAINNET_ISSUER)).toBe(true)
  })

  it('confirms the invalid keys reported in PR review are rejected', () => {
    expect(StrKey.isValidEd25519PublicKey('GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335WFGCCHVTLF2CCZAK27ZQQ625')).toBe(false)
    expect(StrKey.isValidEd25519PublicKey('GDHU6WR2KCEVDLWBVRWXZVH2AZ3ZX4BH4AXSSOQNTFQC2V3CQE37K3VC')).toBe(false)
  })
})
