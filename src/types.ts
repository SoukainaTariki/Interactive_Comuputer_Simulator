/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type JSZip from 'jszip';

export interface ZipFileEntry {
  id: string; // unique ID
  path: string; // full path (e.g., "src/components/Button.tsx")
  name: string; // filename (e.g., "Button.tsx")
  parentPath: string; // containing folder (e.g., "src/components")
  isDirectory: boolean;
  uncompressedSize: number; // in bytes
  compressedSize: number; // in bytes
  lastModified: Date;
  extension: string; // lowercase extension with dot (e.g., ".tsx")
  rawEntry: JSZip.JSZipObject;
}

export type FileFilterType = 'all' | 'folders' | 'text' | 'images' | 'other';

export interface ZipStats {
  fileName: string;
  totalSize: number; // sum of uncompressed sizes
  compressedSize: number; // sum of compressed sizes
  fileCount: number;
  dirCount: number;
}
