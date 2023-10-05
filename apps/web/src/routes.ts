export enum ScopeType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum LayoutType {
  MAIN = 'MAIN',
  UNAUTHORIZED = 'UNAUTHORIZED',
  MARKET = 'MARKET',
}

export enum RoutePath {
  // Private paths
  Home = '/',
  Profile = '/profile',
  Marketplace = '/marketplace',
  YourProducts = '/your-products',
  Cart = '/cart',
  CartHistory = '/cart/history',
  CartMyCart = '/cart/my-cart',
  Stripe = '/stripe',
  PaymentCompleted = '/payment-completed',

  // Auth paths
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  ForgotPassword = '/forgot-password',
  ResetPassword = '/reset-password',
  ExpireToken = '/expire-token',

  NotFound = '/404',
}

type RoutesConfiguration = {
  [routePath in RoutePath]: {
    scope?: ScopeType;
    layout?: LayoutType;
  };
};

export const routesConfiguration: RoutesConfiguration = {
  // Private routes
  [RoutePath.Home]: {
    scope: ScopeType.PRIVATE,
    layout: LayoutType.MAIN,
  },
  [RoutePath.Profile]: {
    scope: ScopeType.PRIVATE,
    layout: LayoutType.MAIN,
  },
  [RoutePath.Marketplace]: {
    scope: ScopeType.PRIVATE,
    layout: LayoutType.MARKET,
  },
  [RoutePath.YourProducts]: {
    scope: ScopeType.PRIVATE,
    layout: LayoutType.MARKET,
  },
  [RoutePath.Cart]: {
    scope: ScopeType.PRIVATE,
    layout: LayoutType.MARKET,
  },
  [RoutePath.CartHistory]: {
    scope: ScopeType.PRIVATE,
    layout: LayoutType.MARKET,
  },
  [RoutePath.CartMyCart]: {
    scope: ScopeType.PRIVATE,
    layout: LayoutType.MARKET,
  },
  [RoutePath.Stripe]: {
    scope: ScopeType.PRIVATE,
    layout: LayoutType.MARKET,
  },
  [RoutePath.PaymentCompleted]: {
    scope: ScopeType.PRIVATE,
    layout: LayoutType.MARKET,
  },

  // Auth routes
  [RoutePath.SignIn]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.UNAUTHORIZED,
  },
  [RoutePath.SignUp]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.UNAUTHORIZED,
  },
  [RoutePath.ForgotPassword]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.UNAUTHORIZED,
  },
  [RoutePath.ResetPassword]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.UNAUTHORIZED,
  },
  [RoutePath.ExpireToken]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.UNAUTHORIZED,
  },

  [RoutePath.NotFound]: {},
};
