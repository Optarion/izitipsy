import React from 'react'
import Main from './components/Main'
import './scss/index.scss'
import '../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const config = {
  defaultBaseBankFee: 0.3,
  defaultAdditionalBankFees: 2.9
}

function HomePage () {
  const [bankFee, setBankFee] = React.useState(config.defaultBaseBankFee)
  const [additionalBankFee, setAdditionalBankFee] = React.useState(config.defaultAdditionalBankFees / 100)

  const onChangeBankFee = event => {
    setBankFee(event.target.value)
  }

  const displayAdditionalBankFee = additionalBankFee => {
    return additionalBankFee * 100
  }

  const onChangeAdditionalFee = event => {
    setAdditionalBankFee(event.target.value / 100)
  }

  return (
    <>
      <div className='app-title'>Symplik - Profit by ticket price</div>

      <aside className='app-aside'>
        Bank fees:
        <input type='text' value={bankFee} onChange={onChangeBankFee} />$ +
        <input type='text' value={displayAdditionalBankFee(additionalBankFee)} onChange={onChangeAdditionalFee} />%
      </aside>

      <Main bankFee={bankFee} additionalBankFee={additionalBankFee} />
    </>
  )
}

export default HomePage
