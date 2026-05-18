export const FETCH_TYPES = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

// 1. Typed status messages
export const codeMessage: Record<number, string> = {
  200: 'The server successfully returned the requested data.',
  201: 'New or modified data is successful.',
  202: 'A request has entered the background queue (asynchronous task).',
  204: 'The data was deleted successfully.',
  400: 'The request was made with an error...',
  401: 'Invalid credentials.',
  403: 'Access is forbidden.',
  404: 'Record does not exist.',
  405: 'Unsupported request method.',
  406: 'Request format not available.',
  410: 'Resource permanently deleted.',
  422: 'Validation error.',
  500: 'Server error.',
  502: 'Gateway error.',
  503: 'Service unavailable.',
  504: 'Gateway timeout.',
};
