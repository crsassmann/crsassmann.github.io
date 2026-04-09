/**
 * Utility functions for handling image URLs
 */

export function getOptimizedImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  
  // Handle GitHub blob URLs
  if (url.includes('github.com') && url.includes('/blob/')) {
    return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
  }
  
  return url;
}
