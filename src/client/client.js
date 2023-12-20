import  {createClient}  from '@sanity/client';
import imageUrlBuilder from "@sanity/image-url";


export const client = createClient({
  projectId: "zgxlw4nx",
  dataset: "production",
  useCdn: true,
  token: process.env.SANITY_TOKEN,
  apiVersion:'2022-03-10',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);