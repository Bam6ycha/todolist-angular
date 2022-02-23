import { ResponseCodes } from '../types/enums/responseCodes';
import { CorsDefaultInterface } from '../types/interfaces/interfaces';

export const corsOptions: CorsDefaultInterface = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: ResponseCodes.NO_CONTENT,
};
