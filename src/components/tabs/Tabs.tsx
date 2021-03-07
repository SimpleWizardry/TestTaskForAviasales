import React from "react";

export interface ITabProps {
    filter: string,
    clickHandler: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const Tabs = ({filter,clickHandler}:ITabProps) => {
    return (
        <div className='row main-content_holder--filter_tabs'>
            <ul className="tabs">
                <li className="tab col s4">
                    <div
                        onClick={clickHandler}
                        id='cheap'
                        className={(filter === 'cheap') ? 'active' : ''}
                    >
                        САМЫЙ ДЕШЕВЫЙ
                    </div>
                </li>
                <li className="tab col s4">
                    <div
                        onClick={clickHandler}
                        id='fast'
                        className={(filter === 'fast') ? 'active' : ''}
                    >
                        САМЫЙ БЫСТРЫЙ
                    </div>
                </li>
                <li className="tab col s4">
                    <div
                        onClick={clickHandler}
                        id='optimal'
                        className={(filter === 'optimal') ? 'active' : ''}
                    >
                        ОПТИМАЛЬНЫЙ
                    </div>
                </li>
            </ul>
        </div>
    )
}