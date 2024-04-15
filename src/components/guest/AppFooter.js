import { faClock, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function AppFooter() {
  return (
    <div className='appFooter'>
      <h5><span style={{ color: '#FF041F', fontWeight: '700' }}>&copy; AR Home Car Wash.</span> All Rights Reserved 2024.</h5>
      <h5>Made with <i className="fa-solid fa-code"></i> by <a href='https://17h4ck3r11-portfolio.netlify.app/' rel="noreferrer" target='_blank'>Amit Kumar Gupta (17h4ck3r11)</a></h5>
      <div className='footerContact'>
          <a href='mailto:contact.arhomecarwash@gmail.com' rel="noreferrer" target='_blank'><li><FontAwesomeIcon icon={faEnvelope} /> contact.arhomecarwash@gmail.com</li></a>
          <a href='telephone:9415109484' rel="noreferrer" target='_blank'><li><FontAwesomeIcon icon={faPhone} />+91 94151 09484</li></a>
          <a rel='noreferrer' href='/'><li><FontAwesomeIcon icon={faClock} />Mon - Sun: 24/7</li></a>
      </div>
      <a rel="noreferrer" href='https://www.google.com/maps/place/Prayag+Railway+Station+Rd,+Karanpur,+Allen+Ganj,+Prayagraj,+Uttar+Pradesh+211002' target='_blank'><li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><FontAwesomeIcon icon={faLocationDot} />Near Prayag Station, Prayagraj, Uttar Pradesh, 211002</li></a>
    </div>
  )
}

export default AppFooter
