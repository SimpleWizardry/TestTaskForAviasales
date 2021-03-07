export interface IFormattedTicket {
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
export interface IFormattedTickets extends Array<IFormattedTicket> {}