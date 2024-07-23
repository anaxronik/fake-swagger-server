import { FileParams } from "./createJsonFiles";
import { getSwaggerContent } from "./getSwaggerContent";
import { replaceDynamicParamsInUrl } from "./replaceDynamicParamsInUrl";

/** JSON c конфигурацией SWAGER */
export type SwaggerConfig = {
  paths: Record<string, SwaggerPath>;
};
export type SwaggerPath = {
  [key in SwaggerHttpMethod]?: SwaggerMethodConfig;
};
export type SwaggerMethodConfig = {
  responses: {
    [key in SwaggerHttpResponseCodes]?: {
      content?: {
        [key in SwaggerHttpResponseTypes]?: {
          schema: SwaggerResponseSchema;
        };
      };
    };
  };
};

export type SwaggerResponseSchema = {};

export type SwaggerHttpMethod = "get" | "post" | "put" | "delete";
export type SwaggerHttpResponseCodes = "200" | "201";
export type SwaggerHttpResponseTypes = "application/json";

export function readSwaggerConfig(config: SwaggerConfig): FileParams[] {
  const result: FileParams[] = [];
  Object.entries(config.paths).forEach(([path, pathConfig]) => {
    Object.entries(pathConfig).forEach(([method, methodConfig]) => {
      console.log({ method, methodConfig });
      result.push({
        filePath: replaceDynamicParamsInUrl(
          `${path}/${method.toUpperCase()}.json`
        ),
        content: getSwaggerContent(methodConfig),
      });
    });
  });
  return result;
}
