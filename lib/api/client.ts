import { CompanyProfile, Quote, KeyMetrics } from '../../types/api';

const API_KEY = process.env.API_KEY || 'YOUR_FMP_API_KEY_HERE'; // Fallback for local dev
const BASE_URL = 'https://financialmodelingprep.com/api/v3';

async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 15000);

  if (!API_KEY || API_KEY === 'YOUR_FMP_API_KEY_HERE') {
    throw new Error("API key is not configured. Please set the API_KEY environment variable.");
  }
  
  const urlWithKey = typeof input === 'string' 
    ? `${input}${input.includes('?') ? '&' : '?'}apikey=${API_KEY}`
    : input;

  try {
    const res = await fetch(urlWithKey, { ...init, signal: controller.signal });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
    }
    const jsonResponse = await res.json();
    if (jsonResponse && (jsonResponse['Error Message'] || jsonResponse['Note'])) {
        throw new Error(jsonResponse['Error Message'] || jsonResponse['Note']);
    }

    return jsonResponse as T;
  } finally {
    clearTimeout(id);
  }
}

export const getCompanyProfile = (ticker: string): Promise<CompanyProfile[]> => {
  return fetchJson<CompanyProfile[]>(`${BASE_URL}/profile/${ticker}`);
};

export const getQuote = (ticker: string): Promise<Quote[]> => {
  return fetchJson<Quote[]>(`${BASE_URL}/quote/${ticker}`);
};

export const getKeyMetrics = (ticker: string): Promise<KeyMetrics[]> => {
    return fetchJson<KeyMetrics[]>(`${BASE_URL}/key-metrics-ttm/${ticker}`);
}
