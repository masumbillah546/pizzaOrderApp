import {FETCH_TYPES} from '@/constants/app';
import {encodeQuery} from '../utils/helpers';
import request from '../utils/request';
import {API_ROUTES} from '@/constants/rest_api';

export default class UserService {
  static async getDashboardData(params: any) {
    const response = await request(API_ROUTES.GET_DASHBOARD_DATA, {
      method: FETCH_TYPES.GET,
    });
    return response;
  }

  static getProducts = async (query: string) => {
    const queryParam = encodeQuery(query);
    const response = await request(API_ROUTES.GET_PRODUCTS + queryParam, {
      method: FETCH_TYPES.GET,
    });
    return response;
  };

  static getSuppliers = async (query: string) => {
    const queryParam = encodeQuery(query);
    const response = await request(API_ROUTES.GET_SUPPLIERS + queryParam, {
      method: FETCH_TYPES.GET,
    });
    return response;
  };

  static getPartsModel = async (query: string) => {
    const queryParam = encodeQuery(query);
    const response = await request(API_ROUTES.GET_PARTS + queryParam, {
      method: FETCH_TYPES.GET,
    });
    return response;
  };

  static getProductStatus = async (query: string) => {
    const queryParam = encodeQuery(query);
    const response = await request(API_ROUTES.GET_PRODUCT_STATUS + queryParam, {
      method: FETCH_TYPES.GET,
    });
    return response;
  };

  static status_update = async (query: string) => {
    const option = {
      method: FETCH_TYPES.POST,
      body: query,
    };
    const response = await request(API_ROUTES.EDIT_PRODUCT_STATUS, option);
    return response;
  };

  static getInterventions = async (query: string) => {
    const queryParam = encodeQuery(query);
    const response = await request(API_ROUTES.GET_INTERVENTIONS + queryParam, {
      method: FETCH_TYPES.GET,
    });
    return response;
  };

  static get_openIntervention_required_fields = async (query: string) => {
    const response = await request(API_ROUTES.REQUIRED_FIELDS, {
      method: FETCH_TYPES.POST,
      body: query,
    });
    return response;
  };

  static submit_intervention = async (SUBMIT_VALUES: any) => {
    const formData = new FormData();
    Object.keys(SUBMIT_VALUES).forEach(key => {
      if (SUBMIT_VALUES[key]) {
        if (Array.isArray(SUBMIT_VALUES[key])) {
          SUBMIT_VALUES[key].forEach(item => {
            formData.append(key + '[]', item);
          });
        } else {
          if (key.startsWith('file_')) {
            formData.append(key, {
              uri: SUBMIT_VALUES[key],
              name: SUBMIT_VALUES[key],
              type: 'image/jpeg',
            });
          } else {
            formData.append(key, SUBMIT_VALUES[key]);
          }
        }
      }
    });

    const option = {
      method: FETCH_TYPES.POST,
      body: formData,
    };
    const token = true;
    const isFormData = true;
    const response = await request(
      API_ROUTES.SUBMIT_INTERVENTION,
      option,
      token,
      isFormData,
    );
    return response;
  };

  static ViewClosedInterventions = async (query: string) => {
    const queryParam = encodeQuery(query);
    const response = await request(API_ROUTES.VIEW_INTERVENTIONS + queryParam, {
      method: FETCH_TYPES.GET,
    });
    return response;
  };

  static async getProfileData(params: any) {
    const response = await request(API_ROUTES.USER_PROFILE_VIEW, {
      method: 'GET',
    });
    return response;
  }

  static async updateProfile({
    photo,
    password,
  }: {
    photo?: string;
    password?: string;
  }) {
    const formData = new FormData();
    if (password) {
      formData.append('password', password);
    }
    if (photo) {
      formData.append('photo', {
        uri: photo,
        name: 'profile_picture.jpg',
        type: 'image/jpeg',
      });
    }

    const token = true;
    const isFormData = true;
    const option = {
      method: FETCH_TYPES.POST,
      body: formData,
    };

    const response = await request(
      API_ROUTES.USER_PROFILE_EDIT,
      option,
      token,
      isFormData,
    );
    return response;
  }
}
