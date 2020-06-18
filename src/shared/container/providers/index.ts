import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProvider/Implementations/DiskStoreageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
