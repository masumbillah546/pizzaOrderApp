import { FETCH_TYPES } from '@/constants/app';
import { encodeQuery } from '../utils/helpers';
import request from '../utils/request';
import { API_ROUTES } from '@/constants/rest_api';
import { SERVER_URL_TECHNICIAN } from '@/config';

export default class TechnicianProfileService {
  static baseUrl = SERVER_URL_TECHNICIAN;

  static getProfile = async (query?: string) => {
    const queryParam = encodeQuery(query);
    const response = await request(
      this.baseUrl + API_ROUTES.GET_TECHNICIAN_PROFILE + queryParam,
      {
        method: FETCH_TYPES.GET,
      },
    );
    return response;
  };

  static setTechnicianPresence = async (body?: any) => {
    const response = await request(
      this.baseUrl + API_ROUTES.PATCH_TECHNICIAN_PRESENCE,
      {
        method: FETCH_TYPES.PATCH,
        body,
      },
    );
    return response;
  };

  static getProfessionalEntities = async (professional_entity_id: string) => {
    const response = await request(
      this.baseUrl +
        API_ROUTES.GET_PROFESSIONAL_ENTITY +
        professional_entity_id,
      {
        method: FETCH_TYPES.GET,
      },
    );
    return response;
  };

  static getProfessionalEntitiesDocuments = async (
    professional_entity_id: string,
  ) => {
    const response = await request(
      this.baseUrl +
        API_ROUTES.GET_PROFESSIONAL_ENTITY +
        professional_entity_id +
        '/documents',
      {
        method: FETCH_TYPES.GET,
      },
    );
    return response;
  };

  static updateProfile = async (body?: any) => {
    const response = await request(
      this.baseUrl + API_ROUTES.PATCH_TECHNICIAN_PROFILE,
      {
        method: FETCH_TYPES.PATCH,
        body,
      },
    );
    return response;
  };

  static updateProfileEntity = async (body?: any) => {
    const response = await request(
      this.baseUrl +
        API_ROUTES.PATCH_PROFESSIONAL_ENTITY.replace(
          '{{professional_entity_id}}',
          body?.professional_entity_id,
        ),
      {
        method: FETCH_TYPES.PATCH,
        body,
      },
    );
    return response;
  };

  static presenceStatus = async (body?: any) => {
    const response = await request(
      this.baseUrl + API_ROUTES.PATCH_TECHNICIAN_PRESENCE,
      {
        method: FETCH_TYPES.PATCH,
        body,
      },
    );
    return response;
  };

  static async putCategories(body: any) {
    const response = await request(
      this.baseUrl + API_ROUTES.PUT_TECHNICIAN_CATEGORIES,
      {
        method: FETCH_TYPES.PUT,
        body,
      },
    );
    return response;
  }

  static async putDevices(body: any) {
    const response = await request(
      this.baseUrl + API_ROUTES.PUT_TECHNICIAN_DEVICES,
      {
        method: FETCH_TYPES.PUT,
        body,
      },
    );
    return response;
  }

  static async putWorkingAvailability(body: any) {
    const response = await request(
      this.baseUrl + API_ROUTES.PUT_TECHNICIAN_AVAILABILITY,
      {
        method: FETCH_TYPES.PUT,
        body,
      },
    );
    return response;
  }

  static async putLocation(body: any) {
    const response = await request(
      this.baseUrl + API_ROUTES.PUT_TECHNICIAN_LOCATION,
      {
        method: FETCH_TYPES.PUT,
        body,
      },
    );
    return response;
  }

  static async putSkills(body: any) {
    const response = await request(
      this.baseUrl + API_ROUTES.PUT_TECHNICIAN_SKILLS,
      {
        method: FETCH_TYPES.PUT,
        body,
      },
    );
    return response;
  }

  static async postOnboardTerms(body: any) {
    const response = await request(
      this.baseUrl + API_ROUTES.POST_ONBOARDING_TERMS,
      {
        method: FETCH_TYPES.POST,
        body,
      },
    );
    return response;
  }
}
