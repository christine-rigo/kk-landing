import { createClient } from '@supabase/supabase-js';
import { auth } from '@root/auth';

// Types for API responses
type ApiSuccessResponse<T> = {
  status: 200;
  response: T;
};

type ApiErrorResponse = {
  status: number;
  error: {
    code: number;
    message: string;
    [key: string]: any;
  };
};

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Error handling types
type ApiErrorDetails = {
  status: number;
  code: number;
  message: string;
  details?: Record<string, any>;
};

// API resource types
export type Game = {
  name: string;
  code: string;
  description: string;
  free: boolean;
  charged: boolean;
  provider: string;
  subStudioProvider: string;
  image: {
    url: string;
  };
  category: string;
  device: string;
};

export type Provider = {
  name: string;
  games: Game[];
};

export type GameListResponse = {
  providers: Provider[];
};

export type Wallet = {
  id: string;
  status: 'new' | 'active' | 'inactive';
  currency_code: string;
  address?: string;
  balance: number;
  created_at: string;
  userId: string;
};

export type Wallets = {
  wallets: Wallet[];
};

export type Transaction = {
  id: string;
  type: 'deposit' | 'withdrawal' | 'bonus' | 'refund' | 'internal';
  wallet_id: string;
  currency_code: string;
  amount: number;
  created_at: string;
};

export type GameSession = {
  token: string;
  game_reference: string;
  currency_code: string;
  created_at: string;
};

export type GameTransaction = {
  type: 'bet' | 'win' | 'refund';
  session_token: string;
  game_reference: string;
  id: string;
  round_id: string;
  amount: number;
  refunded_id: string;
  created_at: string;
};

export type UserInfo = {
  id: string;
  login_name: string;
};

// Base configuration
const API_BASE_URL = 'https://api.kalokalo.workers.dev';

// Check if we're on the client side
const isClient = typeof window !== 'undefined';

// Utility function to get the auth token
const getAuthToken = async (): Promise<string | null> => {
  const session = await auth();
  return session?.user?.accessToken || null;
};

// Error factory function
const createApiError = (status: number, error: { code: number; message: string; [key: string]: any }): ApiErrorDetails => {
  const { code, message, ...otherDetails } = error;
  return {
    status,
    code,
    message,
    details: Object.keys(otherDetails).length > 0 ? otherDetails : undefined
  };
};

// Main API client
export const apiClient = {
  async request<T>(
    endpoint: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      body?: any;
      params?: Record<string, string>;
      requiresAuth?: boolean;
    } = {}
  ): Promise<T> {
    const {
      method = 'GET',
      body,
      params,
      requiresAuth = true
    } = options;

    try {
      // If we're on the client and this is an authenticated request, use the local API route
      if (isClient && requiresAuth) {
        // Ensure the endpoint starts with a slash and doesn't have multiple consecutive slashes
        const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        
        // Log the request URL for debugging
        console.log('Making client-side request to:', `/api${normalizedEndpoint}`);
        
        const response = await fetch(`/api${normalizedEndpoint}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
          console.error('Client-side API error:', {
            status: response.status,
            statusText: response.statusText
          });
          
          const errorData = await response.json().catch(() => ({
            status: response.status,
            error: { code: response.status, message: response.statusText }
          }));
          
          throw createApiError(
            errorData.status || response.status,
            errorData.error || { code: response.status, message: 'API request failed' }
          );
        }

        const data: ApiResponse<T> = await response.json();
        
        if ('error' in data) {
          throw createApiError(data.status, data.error);
        }

        return data.response;
      }

      // Server-side or unauthenticated requests go directly to the API
      const url = new URL(`${API_BASE_URL}${endpoint}`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (requiresAuth) {
        const token = await getAuthToken();
        if (!token) {
          throw createApiError(401, { code: 401, message: 'Authentication required' });
        }
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url.toString(), {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          status: response.status,
          error: { code: response.status, message: response.statusText }
        }));
        throw createApiError(
          errorData.status || response.status,
          errorData.error || { code: response.status, message: 'API request failed' }
        );
      }

      const data: ApiResponse<T> = await response.json();

      if ('error' in data) {
        throw createApiError(data.status, data.error);
      }

      return data.response;

    } catch (error) {
      console.error('API request error:', error);
      
      if (error && typeof error === 'object' && 'status' in error) {
        throw error;
      }

      if (error instanceof Error) {
        throw createApiError(500, {
          code: 500,
          message: error.message || 'Network error occurred'
        });
      }

      throw createApiError(500, {
        code: 500,
        message: 'An unexpected error occurred'
      });
    }
  },

  games: {
    list: (currency?: string) => 
      apiClient.request<GameListResponse>('/games', { 
        requiresAuth: false,
        params: currency ? { currency } : undefined 
      }),
    
    start: (id: string, options: { 
      type: 'FREE' | 'CHARGED';
      lang?: string;
      test?: boolean;
    }) =>
      apiClient.request<{
        game_id: string;
        player_ip: string;
        response: {
          type: 'url' | 'html';
          game_launcher: string;
        };
      }>(`/games/${id}`, {
        method: 'POST',
        body: options
      }),
  },

  user: {
    info: () => 
      apiClient.request<UserInfo>('/user'),

    wallets: {
      list: () => 
        apiClient.request<Wallets>('/user/wallets'),
      
      create: (currencyCode: string) =>
        apiClient.request<Wallet>('/user/wallets', {
          method: 'POST',
          body: { currency_code: currencyCode }
        }),
    },

    transactions: {
      list: (forceCheck?: boolean) =>
        apiClient.request<Transaction[]>('/user/transactions', {
          params: forceCheck ? { force_check: 'true' } : undefined
        }),

      create: (data: {
        type: 'deposit' | 'withdrawal' | 'refund';
        wallet_id: string;
        amount: number;
        destination_address?: string;
      }) =>
        apiClient.request<Transaction>('/user/transactions', {
          method: 'POST',
          body: data
        }),
    },

    gameSessions: {
      list: () =>
        apiClient.request<GameSession[]>('/user/game_sessions'),
    },

    gameTransactions: {
      list: () =>
        apiClient.request<GameTransaction[]>('/user/game_transactions'),
    },
  },
};

// Error handling utility
export const handleApiError = (error: unknown) => {
  if (error && typeof error === 'object' && 'message' in error) {
    return {
      message: error.message as string,
      status: 'status' in error ? (error.status as number) : undefined
    };
  }
  return {
    message: 'An unexpected error occurred'
  };
};
