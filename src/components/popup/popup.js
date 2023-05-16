import ClickAwayListener from 'react-click-away-listener'
import CloseIcon from '@mui/icons-material/Close';
import './popup.scss'

const Popup = ({
  children = null,
  className = '',
  hidePopup,
  popupId,
  closeOnClickOutside = true,
  hideCloseIcon = false,
  closeIcon
}) => {

  const handleClickAway = e => {
    if (closeOnClickOutside) {
      hidePopup(popupId, { onClickAway: true })
    }
  }
  return (
    <div className={`popup-overlay ${className}`}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={'popup'}>
          {hideCloseIcon ? '' :
            <div className="close-icon" onClick={() => {
              hidePopup(popupId)
            }}>
              {closeIcon || <CloseIcon />}
            </div>}
          {children}
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default Popup
