import { Loader } from "google-maps";

const GOOGLE_API_URL = process.env.REACT_APP_GOOGLE_API_KEY as string;

export const googleMapsLoader = new Loader(GOOGLE_API_URL);