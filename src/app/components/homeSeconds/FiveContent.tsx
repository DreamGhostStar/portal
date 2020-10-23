import React from 'react'
import RelationCard from './RelationCard';
import staticData from 'static/relation.json'
import 'app/styles/homeSeconds/fiveContent.scss'
import { isMobile } from '../common/utils';
import PointImg from 'images/point.png'
const stylePrefix = 'home-fiveContent'

export default function FiveContent() {
    return (
        <div style={{
            height: isMobile() ? 'auto' : '600px',
            backgroundColor: '#f0f2f4'
        }} id='five'>
            <div className={`${stylePrefix}-title`}>
                <span className={`${stylePrefix}-word1`}>有机会</span>
                <span className={`${stylePrefix}-word2`}>一定要</span>
                <span>联系我们!</span>
            </div>
            <img src={PointImg} alt="" className={`${stylePrefix}-point`}/>
            <div className={`${stylePrefix}-cards-layout`}>
                {
                    staticData.map((item, index) => {
                        return <RelationCard key={index} data={item} />
                    })
                }
            </div>
        </div>
    )
}