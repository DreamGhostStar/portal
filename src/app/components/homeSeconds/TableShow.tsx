import React, { useState, useEffect } from 'react'
import axios from "axios"
import TableShowContent from './TableShowContent';
import ColumnPiece from './ColumnPiece';
import { getYearStr } from '../common/config';
import '../../styles/homeSeconds/TableShow.scss'

export default function TableShow() {
    const [isMouse, setIsMouse] = useState(false)
    const [clickColumnID, setClickColumnID] = useState(0)
    const [years, setYears] = useState<any[]>([])
    const [yearStr, setYearStr] = useState('')

    const handleColumnClick = (id: number) => {
        if (id !== clickColumnID) {
            const yearStr = getYearStr(years, id)

            if (!yearStr) {
                setYearStr('')
                return;
            }

            setClickColumnID(id);
            setYearStr(yearStr)
        }
    }

    useEffect(() => {
        axios.get('/data/memberYear.json').then(res => {
            let years: any[] = [];

            res.data.map((item: any, index: any) => {
                years.push(item);
                return index;
            });

            setYears(years)
        })
    }, [])
    return (
        <div className='tableShow'>
            <div className='tableShow_piece'>
                <div>
                    <TableShowContent
                        clickColumnID={clickColumnID}
                        yearStr={yearStr}
                    />
                </div>
                <div
                    style={{
                        overflowY: (isMouse ? 'scroll' : 'hidden')
                    }}
                    className='tableShow_sider'
                    onMouseOver={() => { setIsMouse(true) }}
                    onMouseOut={() => { setIsMouse(false) }}
                >
                    {
                        years.map((item, index) => {
                            return <ColumnPiece
                                key={index}
                                item={item}
                                clickColumnID={clickColumnID}
                                id={item.id}
                                handleColumnClick={handleColumnClick}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
