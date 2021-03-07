import React from "react";
import {IFormattedTickets} from "../../models/interfaces";


export interface IProps {
    ticketsToRender: IFormattedTickets
}

export const TicketsList = ({ticketsToRender}:IProps) => {

    return <>
        {
            ticketsToRender.map((ticket) =>
                <div key={ticket.id} className='row main-content_holder--ticket'>
                    <div className='row main-content_holder--ticket__top-line'>
                        <span className='ticket-price'>{ticket.price}</span>
                        <div className='col l4'>
                        </div>
                        <img src={ticket.logo} alt='s7-logo'/>
                    </div>
                    <div className='row ticket-info'>
                        <div className='col s4 m4 l4'>
                        <span className='ticket-info_title'>
                            {ticket.route.to.cities}
                        </span>
                            <br/>
                            <span className='ticket-info_value'>
                            {ticket.route.to.date}
                        </span>
                        </div>
                        <div className='col s4 m4 l4'>
                        <span className='ticket-info_title'>
                            В ПУТИ
                        </span>
                            <br/>
                            <span className='ticket-info_value'>
                            {ticket.route.to.duration}
                        </span>
                        </div>
                        <div className='col s4 m4 l4'>
                        <span className='ticket-info_title'>
                            {ticket.route.to.transfers}
                        </span>
                            <br/>
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
                            <br/>
                            <span className='ticket-info_value'>
                            {ticket.route.back.date}
                        </span>
                        </div>
                        <div className='col s4 m4 l4'>
                        <span className='ticket-info_title'>
                            В ПУТИ
                        </span>
                            <br/>
                            <span className='ticket-info_value'>
                            {ticket.route.back.duration}
                        </span>
                        </div>
                        <div className='col s4 m4 l4'>
                        <span className='ticket-info_title'>
                            {ticket.route.back.transfers}
                        </span>
                            <br/>
                            <span className='ticket-info_value'>
                            {ticket.route.back.transferCities}
                        </span>
                        </div>
                    </div>
                </div>
            )
        }
    </>
}