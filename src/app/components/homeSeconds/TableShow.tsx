import React, { useState } from 'react'
import TableShowContent from './TableShowContent';
import ColumnPiece from './ColumnPiece';
import { getYearStr } from '../common/config';
import '../../styles/homeSeconds/TableShow.scss'
import years from 'static/memberYear.json'
import FreeScrollBar from 'react-free-scrollbar';

export default function TableShow() {
    const [clickColumnID, setClickColumnID] = useState(0)
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
    return (
        <div className='tableShow'>
            <div className='tableShow_piece'>
                <div>
                    <TableShowContent
                        clickColumnID={clickColumnID}
                        yearStr={yearStr}
                    />
                </div>
                <div className='tableShow_sider'>
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
