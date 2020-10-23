import React, {useContext} from 'react'

import {useGlobalSpinnerContext} from '../../context/GlobalSpinnerContext'

const GlobalSpinner = props => {
  const isGlobalSpinnerOn = useGlobalSpinnerContext
  return isGlobalSpinnerOn ? (
    <div className="global-spinner-overlay">
      <p>Loading AHHHH...</p>
    </div>
  ) : null
}

export default GlobalSpinner