import React, { useEffect } from 'react'
import '../../styles/homeSeconds/firstContent.scss'
import { goToElement } from '../common/utils'
import WaveController from 'app/components/common/wave'

export default function FirstContent() {
    useEffect(() => {
        WaveController.start();
    }, [])
    return (
        <div className='firstContent' id='firstContent' >
            <canvas id='canvas' className='canvas' ></canvas>
            <div className='info-layout'>
                <h1 className='title' >SOUNDS</h1>
                <p>WHAT IS NOT VISIBLE IS NOT INVISIBLE</p>
                <p>[ 尝试科技与设计的工作室 APPLICATION/SECURITY/DESIGN ]</p>
                <button className='btn' onClick={() => goToElement('service')} >了解更多</button>
            </div>
        </div>
    )
}