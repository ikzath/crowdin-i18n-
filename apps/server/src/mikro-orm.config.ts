import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const config = {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  clientUrl: process.env.MONGO_URL || 'mongodb://localhost:27017',
  // 'mongodb+srv://lawlift:FnRr9UIeNOBoeavi@cluster0.2gejh.mongodb.net/?retryWrites=true&w=majority',
  type: 'mongo',
  ensureIndexes: true,
  dbName: process.env.MONGO_NAME || 'lawlift',
  metadataProvider: TsMorphMetadataProvider,
};

export default config;
