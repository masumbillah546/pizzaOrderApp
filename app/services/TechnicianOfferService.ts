import { FETCH_TYPES } from '@/constants/app';
import { encodeQuery } from '../utils/helpers';
import request from '../utils/request';
import { API_ROUTES } from '@/constants/rest_api';
import { SERVER_URL_MATCHING } from '@/config';

export default class TechnicianOfferService {
  static baseUrl = SERVER_URL_MATCHING;

  static getMatchesOffers = async (query?: any) => {
    const queryParam = encodeQuery(query);
    const response = await request(
      this.baseUrl + API_ROUTES.GET_TECHNICIAN_MATCHES + queryParam,
      {
        method: FETCH_TYPES.GET,
      },
    );
    return response;
  };

  static getOfferDetails = async (id?: any) => {
    const response = await request(
      this.baseUrl + API_ROUTES.GET_TECHNICIAN_OFFERS + id,
      {
        method: FETCH_TYPES.GET,
      },
    );
    return response;
  };

  static async offerAccept(body: any) {
    const response = await request(
      this.baseUrl +
        API_ROUTES.POST_TECHNICIAN_OFFER_ACCEPT.replace(
          '{{order_id}}',
          body.technician_offer_id,
        ),
      {
        method: FETCH_TYPES.POST,
        body,
      },
    );
    return response;
  }

  static async offerDecline(body: any) {
    const response = await request(
      this.baseUrl +
        API_ROUTES.POST_TECHNICIAN_OFFER_DECLINE.replace(
          '{{order_id}}',
          body.technician_offer_id || body.order_id,
        ),
      {
        method: FETCH_TYPES.POST,
        body,
      },
    );
    return response;
  }
}
