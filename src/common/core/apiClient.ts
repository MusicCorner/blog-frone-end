export enum ResponseFormat {
  ARRAY_BUFFER = 'arrayBuffer',
  BLOB = 'blob',
  JSON = 'json',
  TEXT = 'text',
  FORM_DATA = 'formData',
}

export type ResponseFormatLiteral = `${ResponseFormat}`;

export type DefaultHeaders = Record<string, string | number>;

export interface APIClientProps {
  defaultHeaders?: DefaultHeaders;
  defaultResponseFormat?: ResponseFormat;
  baseUrl?: string;
}

export type MethodedRequestProps = Omit<RequestInit, 'method'>;

export type MethodedRequestPropsWithBody<T = Record<string, any>> = Omit<
  MethodedRequestProps,
  'body'
> & { body?: T };

export interface _GetRequestProps extends MethodedRequestProps {
  params: Record<string, string | number>;
}

export type GetRequestProps = Omit<_GetRequestProps, 'body'>;

export type MakeRequestArgs = [string, RequestInit];

export class APIClient {
  private defaultHeaders: DefaultHeaders;

  private defaultResponseFormat: ResponseFormatLiteral;

  private baseUrl?: string;

  async makeRequest<R = unknown, E extends Error = Error>(
    url: string,
    props: RequestInit
  ) {
    const headers = { ...this.defaultHeaders, ...props.headers } as Record<
      string,
      string
    >;

    const body: RequestInit['body'] =
      headers['Content-Type'] === 'application/json'
        ? JSON.stringify(props.body)
        : props.body;

    const requestProps = { ...props, headers };

    if (props.method !== 'GET') {
      requestProps.body = body;
    }

    const requestUrl = `${this.baseUrl || ''}/${url}`;

    const responseObject = await fetch(requestUrl, requestProps);

    const formattedResponse = responseObject[this.defaultResponseFormat]();
    if (responseObject.ok) {
      return formattedResponse as Promise<R>;
    }

    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw (await formattedResponse) as unknown as E;
  }

  get<R = unknown, E extends Error = Error>(
    url: string,
    props: GetRequestProps
  ) {
    const { params: _params, ...requestProps } = props;
    const params = Object.entries(_params || {}).reduce(
      (accum, [key, param]) => ({ ...accum, [key]: `${param}` }),
      {}
    );

    const urlParamsString = new URLSearchParams(params).toString();
    const urlWithParams = `${url}?${urlParamsString}`;
    return this.makeRequest<R, E>(urlWithParams, requestProps);
  }

  post<R = unknown, E extends Error = Error, T = unknown>(
    url: string,
    props: MethodedRequestPropsWithBody<T>
  ) {
    return this.makeRequest<R, E>(url, {
      ...props,
      method: 'POST',
    } as RequestInit);
  }

  put<R = unknown, E extends Error = Error, T = unknown>(
    url: string,
    props: MethodedRequestPropsWithBody<T>
  ) {
    return this.makeRequest<R, E>(url, {
      ...props,
      method: 'PUT',
    } as RequestInit);
  }

  patch<R = unknown, E extends Error = Error, T = unknown>(
    url: string,
    props: MethodedRequestPropsWithBody<T>
  ) {
    return this.makeRequest<R, E>(url, {
      ...props,
      method: 'PATCH',
    } as RequestInit);
  }

  delete<R = unknown, E extends Error = Error, T = unknown>(
    url: string,
    props: MethodedRequestPropsWithBody<T>
  ) {
    return this.makeRequest<R, E>(url, {
      ...props,
      method: 'DELETE',
    } as RequestInit);
  }

  constructor(props?: APIClientProps) {
    this.defaultHeaders = props?.defaultHeaders || {};
    this.defaultResponseFormat = props?.defaultResponseFormat || 'json';
    this.baseUrl = props?.baseUrl || '';
  }
}
