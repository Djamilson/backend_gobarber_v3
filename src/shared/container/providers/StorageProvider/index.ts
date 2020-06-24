import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import DiskStoreageProvider from './Implementations/DiskStoreageProvider';
import S3StoreageProvider from './Implementations/S3StoreageProvider';
import IStorageProvider from './models/IStorageProvider';

const providers = {
  disk: DiskStoreageProvider,
  s3: S3StoreageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
