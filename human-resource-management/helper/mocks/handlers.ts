import { http, HttpResponse } from 'msw';

const SERVER_URL = Bun.env.SERVER_URL;

export const handlers = [
  http.get(`${SERVER_URL}/employees`, () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),
];
