export interface GetUserByIdRequestPayload {
  userId: number;
}

export interface GetUserByIdErrorPayload extends GetUserByIdRequestPayload {
  error: unknown;
}
