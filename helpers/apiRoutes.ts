import baseUrl from "./baseUrl";

type RouteId = string | string[] | undefined;

const toRouteId = (id: RouteId) => String(id);

const apiRoutes = {
  users: {
    signin: `${baseUrl}/users/signin`,
    register: `${baseUrl}/users/register`,
    signout: `${baseUrl}/users/signout`,
  },
  products: {
    all: `${baseUrl}/products/all`,
    byId: (id: RouteId) => `${baseUrl}/products/${toRouteId(id)}`,
    create: `${baseUrl}/products/new`,
    update: (id: RouteId) => `${baseUrl}/products/update/${toRouteId(id)}`,
    delete: (id: RouteId) => `${baseUrl}/products/delete/${toRouteId(id)}`,
  },
  orders: {
    byId: (id: RouteId) => `${baseUrl}/orders/${toRouteId(id)}`,
    all: `${baseUrl}/orders/all`,
    create: `${baseUrl}/orders/create`,
    update: (id: RouteId) => `${baseUrl}/orders/update/${toRouteId(id)}`,
    delete: (id: RouteId) => `${baseUrl}/orders/delete/${toRouteId(id)}`,
  },
  subscriptions: {
    subscribe: `${baseUrl}/subscriptions/subscribe`,
  },
} as const;

export default apiRoutes;
