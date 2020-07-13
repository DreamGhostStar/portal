import React, { useState, useEffect } from 'react'
import PersonShow from './PersonShow';
import Loading2 from '../common/Loading2';
import membersData from 'static/members.json'
import 'app/styles/homeSeconds/tableShowContent.scss'
const stylePrefix = 'home-tableShowContent';

interface tableShowContentDataConfig {
    clickColumnID: number,
    yearStr: string
}

interface membersConfig { id: number; realName: string; motto: string; year: string; }

export default function TableShowContent({ clickColumnID, yearStr }: tableShowContentDataConfig) {
    const [members, setMembers] = useState<membersConfig[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        let membersTemp: membersConfig[] = [];
        if (clickColumnID === 0) {
            membersTemp = membersData;
        } else {
            membersData.map((item, index) => {
                if (item.year === yearStr) {
                    membersTemp.push(item)
                }
                return index;
            });
        }
        setMembers(membersTemp)
        setLoading(false)
    }, [clickColumnID, yearStr])

    const judgeShowMember = () => {
        if (loading) {
            return <Loading2 />
        }

        let membersData: any = <div className={`${stylePrefix}-white`}>
            这一年度没有该方向的同学
        </div>

        if (members.length !== 0) {
            membersData = [];
            members.map((item, index) => {
                membersData.push(<PersonShow key={index} item={item} />)
                return null;
            })
        }

        return membersData;
    }
    return (
        <div className={`${stylePrefix}-layout`}>
            {
                judgeShowMember()
            }
        </div>
    )
}