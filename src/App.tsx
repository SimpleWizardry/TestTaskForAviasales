import React, { useState, useEffect, useMemo } from 'react';
import './App.scss';
import logo from './img/Logo.png';
//import s7logo from './img/S7 Logo.png'

type TChecked = {
    [key: string] : boolean
}

//type CallbackFunction = () => void;

interface ITicket {
    price: number;
    carrier: string;
    segments: [
        {
            origin: string;
            destination: string;
            date: string;
            stops: string[];
            duration: number;
        },
        {
            origin: string;
            destination: string;
            date: string;
            stops: string[];
            duration: number;
        }
    ]
}

interface IFormattedTicket {
    id: number
    price: string;
    logo: string;
    route: {
        to: {
            cities: string;
            date: string;
            duration: string;
            transfers: string;
            transferCities: string;
        },
        back: {
            cities: string;
            date: string;
            duration: string;
            transfers: string;
            transferCities: string;
        }
    }
}
interface IFormattedTickets extends Array<IFormattedTicket> {}
interface ITickets extends Array<ITicket> {}


const App: React.FC = () => {
    const [checkedItems, setCheckedItems] = useState({
        'All': false,
        'oneTransfer': false,
        'threeTransfers': false,
        'twoTransfers': false,
        'withoutTransfer': false,
    } as TChecked)
    const [filter, setFilter] = useState('')
    const [url, setURL] = useState('')
    const [tickets,setTickets] = useState<ITickets> ([])
    const [ticketsPack,setTicketsPack] = useState<ITickets> ([])
    const [stopSearch,setStopSearch] = useState(false)
    const [filteredTickets,setFilteredTickets] = useState<ITickets>([])
    const [ticketsToRender,setTicketsToRender] = useState<IFormattedTickets>([])
    const [showNext,setShowNext] = useState(1)

//ЗАПРОС КЛЮЧА ПОИСКА
    useEffect(() => {
        const getSearchID = async () => {
            let res = await fetch('https://front-test.beta.aviasales.ru/search')
            let obj = await res.json()
            setURL('https://front-test.beta.aviasales.ru/tickets?searchId=' + obj.searchId)
        };
        getSearchID();

    }, []);

    //const memoArray = useMemo(() => sortBy(filter), [filteredTickets]);

//ФОРМАТИРУЕМ НЕОБХОДИМОЕ КОЛИЧЕСТВО БИЛЕТОВ(отсортированных и отфильтрованных) ДЛЯ РЕНДЕРА
    useMemo(() => {
        let arr = filteredTickets.slice(0,5*showNext)
        console.log('rerender');
        let arrToRender: IFormattedTickets = arr.map((ticket) => {
            let dateTo = new Date(ticket.segments[0].date)
            let dateBack = new Date(ticket.segments[1].date)
            return {
                id: +dateTo + +dateBack + ticket.segments[0].duration,
                price: ticket.price + ' р',
                logo: '//pics.avs.io/99/36/' + ticket.carrier + '.png',
                route: {
                    to: {
                        cities: ticket.segments[0].origin + ' - ' + ticket.segments[0].destination,
                        date: String(dateTo.getHours()).padStart(2, "0") + ':' + String(dateTo.getMinutes()).padStart(2, "0"),
                        duration: String(Math.floor(ticket.segments[0].duration / 60)).padStart(2, "0") + 'ч ' + String(ticket.segments[0].duration % 60).padStart(2, "0") + 'м',
                        transfers: (ticket.segments[0].stops.length) ? ticket.segments[0].stops.length + ' ПЕРЕСАДКИ' : 'БЕЗ ПЕРЕСАДОК',
                        transferCities: ticket.segments[0].stops.join(', ')
                    },
                    back: {
                        cities: ticket.segments[1].origin + ' - ' + ticket.segments[1].destination,
                        date: String(dateBack.getHours()).padStart(2, "0") + ':' + String(dateBack.getMinutes()).padStart(2, "0"),
                        duration: String(Math.floor(ticket.segments[1].duration / 60)).padStart(2, "0") + 'ч ' + String(ticket.segments[1].duration % 60).padStart(2, "0") + 'м',
                        transfers: (ticket.segments[1].stops.length) ? ticket.segments[1].stops.length + ' ПЕРЕСАДКИ' : 'БЕЗ ПЕРЕСАДОК',
                        transferCities: ticket.segments[1].stops.join(', ')
                    }
                }


            }
        })
        setTicketsToRender(arrToRender)
    }, [filteredTickets,showNext]);  //ПЕРЕРИСОВКА БУДЕТ ЗАВИСЕТЬ ТОЛЬКО ОТ ФИЛЬТРОВАННОГО МАССИВА

    //РЕНДЕР ОТФОРМАТИРОВАННЫХ БИЛЕТОВ(вынести в презентационный компонент)
    const ticketsList = ticketsToRender.map((ticket) =>
        <div key={ticket.id} className='row main-content_holder--ticket'>
            <div className='row main-content_holder--ticket__top-line'>
                <span className='ticket-price'>{ticket.price}</span>
                <div className='col l4'>
                </div>
                <img src={ticket.logo} alt='s7-logo' />
            </div>
            <div className='row ticket-info'>
                <div className='col s4 m4 l4'>
                    <span className='ticket-info_title'>
                        {ticket.route.to.cities}
                    </span>
                    <br />
                    <span className='ticket-info_value'>
                        {ticket.route.to.date}
                    </span>
                </div>
                <div className='col s4 m4 l4'>
                    <span className='ticket-info_title'>
                        В ПУТИ
                    </span>
                    <br />
                    <span className='ticket-info_value'>
                        {ticket.route.to.duration}
                    </span>
                </div>
                <div className='col s4 m4 l4'>
                    <span className='ticket-info_title'>
                        {ticket.route.to.transfers}
                    </span>
                    <br />
                    <span className='ticket-info_value'>
                        {ticket.route.to.transferCities}
                    </span>
                </div>
            </div>
            <div className='row ticket-info'>
                <div className='col s4 m4 l4'>
                    <span className='ticket-info_title'>
                        {ticket.route.back.cities}
                    </span>
                    <br />
                    <span className='ticket-info_value'>
                        {ticket.route.back.date}
                    </span>
                </div>
                <div className='col s4 m4 l4'>
                    <span className='ticket-info_title'>
                        В ПУТИ
                    </span>
                    <br />
                    <span className='ticket-info_value'>
                        {ticket.route.back.duration}
                    </span>
                </div>
                <div className='col s4 m4 l4'>
                    <span className='ticket-info_title'>
                        {ticket.route.back.transfers}
                    </span>
                    <br />
                    <span className='ticket-info_value'>
                        {ticket.route.back.transferCities}
                    </span>
                </div>
            </div>
        </div>
    )

//ФУНКЦИЯ СОРТИРОВКИ
    const sortBy = (arrToSort: ITickets,filterName:string) => {
        //МОЖНО ДОБАВИТЬ ПРОВЕРКУ НА ДЛИНУ ФИЛЬТРОВАННОГО МАССИВА,ЕСЛИ ФИЛЬТРАЦИЯ ЕЩЕ НЕ ОСУЩЕСТВЛЯЛАСЬ,СОРТИРОВАТЬ ВЕСЬ МАССИВ БИЛЕТОВ
        let sortedArr = arrToSort;

        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ПОПРАВИТЬ return
        if (filterName === 'cheap') {
            sortedArr.sort(function (prevTicket,nextTicket) {
                return prevTicket.price - nextTicket.price
            })
        } else if (filterName === 'fast') {
            sortedArr.sort(function(prevTicket,nextTicket) {
                return (prevTicket.segments[0].duration + prevTicket.segments[1].duration) - (nextTicket.segments[0].duration + nextTicket.segments[1].duration)
            })
        } else if (filterName === 'optimal') {
            let maxPrice = 0;
            let maxDuration = 0;
            sortedArr.forEach((ticket) => {
                if (ticket.price > maxPrice) {
                    maxPrice = ticket.price
                }
                if (ticket.segments[0].duration + ticket.segments[1].duration > maxDuration) {
                    maxDuration = ticket.segments[0].duration + ticket.segments[1].duration
                }
            })
            sortedArr.sort(function(prevTicket,nextTicket) {
                let prevPriceFraction = prevTicket.price / maxPrice
                let nextPriceFraction = nextTicket.price / maxPrice
                let prevDurFraction = (prevTicket.segments[0].duration + prevTicket.segments[1].duration) / maxDuration
                let nextDurFraction = (nextTicket.segments[0].duration + nextTicket.segments[1].duration) / maxDuration
                return (prevPriceFraction + prevDurFraction) - (nextPriceFraction + nextDurFraction)
            })
        }
        setFilteredTickets(sortedArr)
    }

//ФУНКЦИЯ ФИЛЬТРАЦИИ
    const filterBy = (transfers: TChecked ) => {
        setShowNext(1)
        let transfersAmount:number[] = []

        for (let key in transfers) {
            if (transfers[key]) {
                if (key === 'All') {
                    transfersAmount = []
                    break;
                } else if (key === 'twoTransfers') {
                    transfersAmount.push(2)
                } else if (key === 'oneTransfer') {
                    transfersAmount.push(1)
                } else if (key === 'threeTransfers') {
                    transfersAmount.push(3)
                } else {
                    transfersAmount.push(0)
                }
            }
        }

        //ФИЛЬТРУЕМ ВСЕГДА ИЗНАЧАЛЬНЫЙ МАССИВ
        //let arr = tickets;

        let filteredArr: ITickets = tickets.filter(function(ticket) {
            if (transfersAmount.length) {
                return (transfersAmount.indexOf(ticket.segments[0].stops.length + ticket.segments[1].stops.length) !== -1)
            } else {
                return true
            }
        })

        if (filter) {
            sortBy(filteredArr,filter)
        } else {
            setFilteredTickets(filteredArr)
        }
    }

    useEffect(() => {
        filterBy(checkedItems)
    },[checkedItems,tickets.length]) //ПОДПИСЫВАЕМСЯ НА ИЗМЕНЕНИЯ ПАРАМЕТРОВ ФИЛЬТРАЦИИ И,ЕСЛИ БИЛЕТЫ ЕЩЕ СКАЧИВАЮТСЯ,НА ИЗМЕНЕНИЯ МАССИВА БИЛЕТОВ

    useEffect(() => {
        sortBy([...filteredTickets],filter)  //ПЕРЕДАЕМ КОПИЮ МАССИВА,ЧТОБЫ РЕАКТ МОГ СВЕРИТЬ С ПРЕДЫДУЩИМ НЕОТСОРТИРОВАННЫМ ЗНАЧЕНИЕМ
    },[filter,tickets.length]) //АНАЛОГИЧНО,НО В ДОПОЛНЕНИЕ НЕОБХОДИМО ПРОВЕРЯТЬ ИЗМЕНЕНИЕ ОТФИЛЬТРОВАННОГО МАССИВА,ЧТО БЫ СОРТИРОВАТЬ ИМЕННО ЕГО

    useEffect(() => {
        setTickets(tickets.concat(ticketsPack))
    },[ticketsPack.length]) //ПРИНИМАЕМ ПАЧКИ И ОБНОВЛЯЕМ ОБЩИЙ МАССИВ БИЛЕТОВ С КАЖДОЙ НОВОЙ ПАЧКОЙ

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ПРЕРВАТЬ СОЕДИНЕНИЕ ОКОНЧАТЕЛЬНО ПОСЛЕ ОТВЕТА STOP
    useEffect(() => {
        if (url) {
            const subscribe = async () => {
                let response = await fetch(url);

                if (response.status === 502) {
                    await subscribe();
                } else if (response.status !== 200) {
                    if (response.status === 404) {
                        setURL('');
                    }
                    await new Promise(resolve => setTimeout(resolve, 500));
                    await subscribe();
                } else {
                    let res = await response.json();
                    if (!res.stop) {
                        setTicketsPack(res.tickets);
                        await subscribe();
                    } else {
                        console.log('Vse')
                        setStopSearch(false);
                    }
                }
            }
            subscribe().catch();
        }
    },[url,stopSearch])

    /*
    // МОЖЕТ НЕ ПОНАДОБИТЬСЯ
    //ХУК ДЭНА АБРАМОВА КОТОРЫЙ ПОДХОДИТ ДЛЯ ПОЛЛИНГА
    function useInterval(callback: CallbackFunction , delay:number) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }
    //========================================================
    */



//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ПЕРЕПИСАТЬ ТАБЫ ПОД ФОРМУ
    const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        setFilter(e.target.id)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedItems({...checkedItems, [e.target.name] : e.target.checked });
    }

    const checkboxes = [
        {
            name: 'All',
            key: 'all',
            label: 'Все',
        },
        {
            name: 'withoutTransfer',
            key: 'withouttransfer',
            label: 'Без пересадок',
        },
        {
            name: 'oneTransfer',
            key: 'onetransfer',
            label: '1 пересадка',
        },
        {
            name: 'twoTransfers',
            key: 'twotransfers',
            label: '2 пересадки',
        },
        {
            name: 'threeTransfers',
            key: 'threetransfers',
            label: '3 пересадка',
        }
    ]


  return (
    <div className='screen'>
        <div className='container main'>
            <div className='row logo-holder'>
                <img src={logo} alt='logo' />
            </div>
            <div className='container row main-content_holder'>
                <div className='col s4 m4 l4'>
                    <div className='main-content_holder--input_block'>
                        <p>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
                        <form>
                            {
                                checkboxes.map(item => (
                                    <p key={item.key}>
                                        <label>
                                            <input
                                                name={item.name}
                                                className="checkbox-input filled-in"
                                                type="checkbox"
                                                checked={checkedItems[item.name]}
                                                onChange={handleChange}
                                            />
                                            <span>{item.label}</span>
                                        </label>
                                    </p>
                                ))

                            }
                        </form>
                    </div>
                </div>
                <div className='col s8 m8 l8'>
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

                        {ticketsList}
                        {/*
                        <div className='row main-content_holder--ticket__top-line'>
                            <span className='ticket-price'>13 400 р</span>
                            <div className='col l4'>
                            </div>
                            <img src={s7logo} alt='s7-logo' />
                        </div>
                        <div className='row ticket-info'>
                            <div className='col s4 m4 l4'>
                                <span className='ticket-info_title'>
                                    MOW - HKT
                                </span>
                                <br />
                                <span className='ticket-info_value'>
                                    10:45 - 08:45
                                </span>
                            </div>
                            <div className='col s4 m4 l4'>
                                <span className='ticket-info_title'>
                                    В ПУТИ
                                </span>
                                <br />
                                <span className='ticket-info_value'>
                                    21ч 15м
                                </span>
                            </div>
                            <div className='col s4 m4 l4'>
                                <span className='ticket-info_title'>
                                    2 ПЕРЕСАДКИ
                                </span>
                                <br />
                                <span className='ticket-info_value'>
                                    HKG, JNB
                                </span>
                            </div>

                        </div>
                        <div className='row ticket-info'>
                            <div className='col s4 m4 l4'>
                                <span className='ticket-info_title'>
                                    MOW - HKT
                                </span>
                                <br />
                                <span className='ticket-info_value'>
                                    10:45 - 08:45
                                </span>
                            </div>
                            <div className='col s4 m4 l4'>
                                <span className='ticket-info_title'>
                                    В ПУТИ
                                </span>
                                <br />
                                <span className='ticket-info_value'>
                                    21ч 15м
                                </span>
                            </div>
                            <div className='col s4 m4 l4'>
                                <span className='ticket-info_title'>
                                    2 ПЕРЕСАДКИ
                                </span>
                                <br />
                                <span className='ticket-info_value'>
                                    HKG, JNB
                                </span>
                            </div>
                        </div>
                        */}
                    {(filteredTickets.length) ? (<div onClick={() => setShowNext(prev => prev + 1)} className='row main-content_holder--show-more_btn'>ПОКАЗАТЬ БОЛЬШЕ</div>) : null
                    }
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
