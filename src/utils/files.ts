export const removeExtension = (filename: string): string => {
  return filename.split('.').shift() as string
}
