import React from 'react'
import RelationCard from './RelationCard';
import staticData from 'static/relation.json'

export default function FiveContent() {
    return (
        <div>
            <div style={{
                paddingTop: 30,
                textAlign: 'center',
                fontSize: 30,
                paddingBottom: 80,
                fontWeight: 700
            }}>
                <span style={{
                    textDecoration: 'line-through',
                    color: '#bbb',
                    fontSize: 20
                }}>有机会</span>
                <span style={{
                    color: '#f00'
                }}>一定要</span>
                <span>联系我们!</span>
            </div>
            <div style={{
                width: 1200,
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                {
                    staticData.map((item, index) => {
                        return <RelationCard key={index} data={item}/>
                    })
                }
            </div>
        </div>
    )
}