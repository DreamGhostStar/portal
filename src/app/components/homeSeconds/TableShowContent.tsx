import React, { useState, useEffect } from 'react'
import axios from "axios"
import PersonShow from './PersonShow';
import Loading2 from '../common/Loading2';

interface tableShowContentDataConfig {
    clickColumnID: number,
    yearStr: string
}

export default function TableShowContent({clickColumnID, yearStr}: tableShowContentDataConfig) {
    const [members, setMembers] = useState([])
    const [clickColumnIDInState, setClickColumnIDInState] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios.get('/data/members.json').then(res => {
            let members = [];
            members = res.data;
            setMembers(members)
        })
        
        if (clickColumnID === clickColumnIDInState) {
            return;
        }

        if(!loading){
            setLoading(true)
        }

        axios.get('/data/members.json').then(res => {
            let members = [];

            if (clickColumnID === 0) {
                members = res.data;
            } else {
                res.data.map((item: { year: any; }, index: any) => {
                    if (item.year === yearStr) {
                        members.push(item)
                    }
                    return index;
                });
            }

            setClickColumnIDInState(clickColumnID)
            setMembers(members)
            setLoading(false)
        })
    }, [clickColumnID, clickColumnIDInState, loading, yearStr])
    
    const judgeShowMember = () => {
        if (loading) {
            return <Loading2 />
        }

        let membersData: any = <div style={{
            color: '#bbb',
            fontSize: 30,
            textAlign: 'center',
            lineHeight: '550px',
            width: '100%',
            height: '100%'
        }}>
            嘤嘤嘤，这一年度没有该方向的同学
        </div>

        if (members.length !== 0) {
            membersData = [];
            members.map((item, index) => {
                membersData.push(<PersonShow key={index} item={item} />)
                return index;
            })
        }

        return membersData;
    }
    return (
        <div style={{
            width: 1050,
            height: 550,
            backgroundColor: '#fff',
            display: 'flex',
            flexWrap: 'wrap'
        }}>
            {
                judgeShowMember()
            }
        </div>
    )
}