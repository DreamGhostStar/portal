import React from 'react'
import TechF5ve from '../../../images/TechF5ve.png'
import '../../styles/homeSeconds/footer.scss'

export default function Footer() {
    return (
        <div className='footer'>
            <div className='footer_text'>Build Ver. 6.187.1</div>
            <div className='footer_text footer_textRight'>
                <span>Built with Pan and Ma for</span>
                <img src={TechF5ve} alt="TechF5ve" className='footer_image' />
            </div>
        </div>
    )
}