import React from 'react'
import TechF5ve from '../../../images/logo/TechF5ve.png'
import '../../styles/homeSeconds/footer.scss'
import { isMobile } from '../common/utils'

export default function Footer() {
    return (
        <div style={{
            height: isMobile() ? 230 : 'auto',
            backgroundColor: '#000'
        }}>
            <div className='footer'>
                {
                    isMobile()
                        ? <>
                            <div className='footer_text'>Build Ver. 6.187.1</div>
                            <div className='footer_text'>Built with Pan and Ma for</div>
                            <img src={TechF5ve} alt="TechF5ve" className='footer_image' />
                        </>
                        : <>
                            <div className='footer_text'>Build Ver. 6.187.1</div>
                            <div className='footer_text footer_textRight'>
                                <span>Built with Pan and Ma for</span>
                                <img src={TechF5ve} alt="TechF5ve" className='footer_image' />
                            </div>
                        </>
                }
            </div>
        </div>
    )
}