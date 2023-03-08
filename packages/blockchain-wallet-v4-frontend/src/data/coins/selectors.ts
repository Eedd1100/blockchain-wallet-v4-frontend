import { defineMessage } from 'react-intl'
import { any, isEmpty, isNil, map, values } from 'ramda'

import { Remote } from '@core'
import { CoinType, InvitationsType, RemoteDataType } from '@core/types'
import { selectors } from 'data'
import { CoinAccountSelectorType } from 'data/coins/types'
import { SwapAccountType } from 'data/components/swap/types'
import { RootState } from 'data/rootReducer'

import { selectors as custodialSelectors } from './accountTypes/custodial'
import { selectors as dynamicSelfCustodySelectors } from './accountTypes/dynamicSelfCustody'
import { selectors as erc20Selectors } from './accountTypes/erc20'
import { selectors as nonCustodialSelectors } from './accountTypes/nonCustodial'

export const getNonCustodialKey = (coin: CoinType) => {
  if (selectors.core.data.coins.getErc20Coins().includes(coin)) {
    return 'ERC20'
  }

  return 'NON_CUSTODIAL'
}

export const getKey = (coin: CoinType) => {
  if (selectors.core.data.coins.getErc20Coins().includes(coin)) {
    return 'ERC20'
  }
  if (selectors.core.data.coins.getDynamicSelfCustodyCoins().includes(coin)) {
    return 'DYNAMIC_SELF_CUSTODY'
  }
  return 'NON_CUSTODIAL'
}

// retrieves introduction text for coin on its transaction page
const getIntroductionText = (coin: string) => {
  switch (coin) {
    case 'ARS':
      return defineMessage({
        defaultMessage: 'Store Argentine peso in your wallet and use it to Buy crypto.',
        id: 'coins.ars.intro'
      })
    case 'BCH':
      return defineMessage({
        defaultMessage: 'Bitcoin Cash (BCH) is a fork of Bitcoin built for everyday transactions.',
        id: 'coins.bch.intro'
      })
    case 'BTC':
      return defineMessage({
        defaultMessage:
          'Bitcoin (BTC) is the original crypto and the internet’s premier digital currency.',
        id: 'coins.btc.intro'
      })
    case 'ETH':
      return defineMessage({
        defaultMessage:
          'Ethereum (ETH) is a currency and platform for execution of decentralized smart contracts.',
        id: 'coins.eth.intro'
      })
    case 'EUR':
      return defineMessage({
        defaultMessage: 'Store Euros in your wallet and use it to Buy crypto.',
        id: 'coins.eur.intro'
      })
    case 'GBP':
      return defineMessage({
        defaultMessage: 'Store British pounds in your wallet and use it to Buy crypto.',
        id: 'coins.gbp.intro'
      })
    case 'USD':
      return defineMessage({
        defaultMessage: 'Store U.S. dollars in your wallet and use it to Buy crypto.',
        id: 'coins.usd.intro'
      })
    case 'XLM':
      return defineMessage({
        defaultMessage:
          'Stellar (XLM) connects banks, payments and you to the Stellar Payment network.',
        id: 'coins.xlm.intro'
      })
    default:
      return null
  }
}

const accountTypes = {
  CUSTODIAL: custodialSelectors,
  DYNAMIC_SELF_CUSTODY: dynamicSelfCustodySelectors,
  ERC20: erc20Selectors,
  NON_CUSTODIAL: nonCustodialSelectors
}

// generic selector that should be used by all features to request their desired
// account types for their coins
const getCoinAccounts = (state: RootState, ownProps: CoinAccountSelectorType) => {
  const getCoinAccountsR = (state: RootState) => {
    const coinList = ownProps?.coins

    // dynamically create account selectors via passed in coin list
    const accounts =
      isEmpty(coinList) || isNil(coinList)
        ? Remote.of({})
        : coinList.reduce((accounts, coin) => {
            const accountType = getKey(coin)
            accounts[coin] = accountTypes[accountType].getAccounts(state, { coin, ...ownProps })
            return accounts
          }, {})

    const isNotLoaded = (coinAccounts) => Remote.Loading.is(coinAccounts)
    if (any(isNotLoaded, values(accounts))) return Remote.Loading

    // @ts-ignore
    return Remote.of(
      map(
        (coinAccounts: RemoteDataType<string, typeof accounts>) =>
          (isEmpty(coinAccounts) && []) || (coinAccounts ? coinAccounts.getOrElse([]) : []),
        accounts
      ) as any
    )
  }

  const accountsR: RemoteDataType<string, { [key in CoinType]: Array<SwapAccountType> }> =
    getCoinAccountsR(state)

  return accountsR?.getOrElse({}) || {}
}

const getStxSelfCustodyAvailability = (state): boolean => {
  const isDoubleEncrypted = selectors.core.wallet.isSecondPasswordOn(state) as boolean
  if (isDoubleEncrypted) return false

  const featureFlagsR = selectors.core.walletOptions.getFeatureFlags(state)
  const tagsR = selectors.modules.profile.getBlockstackTag(state)
  const invitationsR = selectors.core.settings.getInvitations(state)

  const featureFlags = featureFlagsR.getOrElse({
    stxSelfCustodyEnableAirdrop: false,
    stxSelfCustodyEnableAll: false
  })
  const tag = tagsR.getOrElse(false)
  const invitations = invitationsR.getOrElse({ stxSelfCustody: true } as InvitationsType)

  if (invitations.stxSelfCustody) {
    if (tag && featureFlags.stxSelfCustodyEnableAirdrop) {
      return true
    }
    return featureFlags.stxSelfCustodyEnableAll
  }

  return false
}

export { getCoinAccounts, getIntroductionText, getStxSelfCustodyAvailability }
