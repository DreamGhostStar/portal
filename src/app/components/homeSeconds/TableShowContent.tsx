import React, { useState, useEffect } from 'react'
import PersonShow from './PersonShow';
import Loading2 from '../common/Loading2';
import membersData from 'static/members.json'
import 'app/styles/homeSeconds/tableShowContent.scss'
import PersonDetailShow from '../common/PersonDetailShow';
const stylePrefix = 'home-tableShowContent';

interface tableShowContentDataConfig {
    clickColumnID: number,
    yearStr: string
}

export interface membersConfig { id: number; realName: string; motto: string; year: string; }

export default function TableShowContent({ clickColumnID, yearStr }: tableShowContentDataConfig) {
    const [members, setMembers] = useState<membersConfig[]>([])
    const [loading, setLoading] = useState(false)
    const [memberDetail, setMemberDetail] = useState<membersConfig | null>(null) // 展示的成员信息
    const [showDetail, setShowDetail] = useState(false); // 是否打开成员展示

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

    // 打开成员展示组件
    const openMemberDetail = (member: membersConfig) => {
        setMemberDetail(member);
        setShowDetail(true)
    }

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
                membersData.push(<PersonShow key={index} item={item} showDetail={openMemberDetail} />)
                return null;
            })
            membersData.push(
                <>
                    <div
                        style={{
                            opacity: (showDetail ? 0.1 : 0),
                            display: (showDetail ? 'block' : 'none'),
                        }}
                        className={`${stylePrefix}-shadow`}
                    ></div>
                    {
                        showDetail
                            ? <div style={{
                                display: (showDetail ? 'block' : 'none')
                            }}>
                                <PersonDetailShow item={(memberDetail as membersConfig)} cancelShowDetail={() => setShowDetail(false)} />
                            </div>
                            : <div></div>
                    }
                </>
            )
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