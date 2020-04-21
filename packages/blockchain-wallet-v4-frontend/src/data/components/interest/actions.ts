import * as AT from './actionTypes'
import { CoinType } from 'core/types'
import {
  InterestAccountBalanceType,
  InterestEligibleType,
  InterestInstrumentsType,
  InterestLimitsType,
  InterestPaymentAccountType
} from 'core/network/api/interest/types'
import { InterestActionTypes } from './types'

export const fetchInterestBalance = () => ({
  type: AT.FETCH_INTEREST_BALANCE
})

export const fetchInterestBalanceFailure = (
  error: string
): InterestActionTypes => ({
  type: AT.FETCH_INTEREST_BALANCE_FAILURE,
  payload: {
    error
  }
})

export const fetchInterestBalanceLoading = (): InterestActionTypes => ({
  type: AT.FETCH_INTEREST_BALANCE_LOADING
})

export const fetchInterestBalanceSuccess = (
  interestAccountBalance: InterestAccountBalanceType
): InterestActionTypes => ({
  type: AT.FETCH_INTEREST_BALANCE_SUCCESS,
  payload: {
    interestAccountBalance
  }
})

export const fetchInterestEligible = () => ({
  type: AT.FETCH_INTEREST_ELIGIBLE
})
export const fetchInterestEligibleFailure = (
  error: string
): InterestActionTypes => ({
  type: AT.FETCH_INTEREST_ELIGIBLE_FAILURE,
  payload: {
    error
  }
})
export const fetchInterestEligibleLoading = (): InterestActionTypes => ({
  type: AT.FETCH_INTEREST_ELIGIBLE_LOADING
})
export const fetchInterestEligibleSuccess = (
  interestEligible: InterestEligibleType
): InterestActionTypes => ({
  type: AT.FETCH_INTEREST_ELIGIBLE_SUCCESS,
  payload: {
    interestEligible
  }
})

export const fetchInterestInstruments = () => ({
  type: AT.FETCH_INTEREST_INSTRUMENTS
})
export const fetchInterestInstrumentsFailure = (
  error: string
): InterestActionTypes => ({
  type: AT.FETCH_INTEREST_INSTRUMENTS_FAILURE,
  payload: {
    error
  }
})
export const fetchInterestInstrumentsLoading = (): InterestActionTypes => ({
  type: AT.FETCH_INTEREST_INSTRUMENTS_LOADING
})
export const fetchInterestInstrumentsSuccess = (
  interestInstruments: InterestInstrumentsType
): InterestActionTypes => ({
  type: AT.FETCH_INTEREST_INSTRUMENTS_SUCCESS,
  payload: {
    interestInstruments
  }
})

export const fetchInterestLimits = () => ({
  type: AT.FETCH_INTEREST_LIMITS
})
export const fetchInterestLimitsFailure = (
  error: string
): InterestActionTypes => ({
  type: AT.FETCH_INTEREST_LIMITS_FAILURE,
  payload: {
    error
  }
})
export const fetchInterestLimitsLoading = (): InterestActionTypes => ({
  type: AT.FETCH_INTEREST_LIMITS_LOADING
})
export const fetchInterestLimitsSuccess = (
  interestLimits: InterestLimitsType
): InterestActionTypes => ({
  type: AT.FETCH_INTEREST_LIMITS_SUCCESS,
  payload: {
    interestLimits
  }
})

export const fetchInterestPaymentAccount = (cryptoCurrency: CoinType) => ({
  type: AT.FETCH_INTEREST_PAYMENT_ACCOUNT,
  cryptoCurrency
})
export const fetchInterestPaymentAccountFailure = (
  error: string
): InterestActionTypes => ({
  type: AT.FETCH_INTEREST_PAYMENT_ACCOUNT_FAILURE,
  payload: {
    error
  }
})
export const fetchInterestPaymentAccountLoading = (): InterestActionTypes => ({
  type: AT.FETCH_INTEREST_PAYMENT_ACCOUNT_LOADING
})
export const fetchInterestPaymentAccountSuccess = (
  account: InterestPaymentAccountType
): InterestActionTypes => ({
  type: AT.FETCH_INTEREST_PAYMENT_ACCOUNT_SUCCESS,
  payload: {
    account
  }
})

export const initializeInterest = (coin: CoinType) => ({
  payload: {
    coin
  },
  type: AT.INITIALIZE_INTEREST
})
