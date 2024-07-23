export function getSwaggerContent(
  obj: any,
  options: {
    path: string;
    method: string;
  }
) {
  return {
    status: "ok",
    ...options,
  };
}
