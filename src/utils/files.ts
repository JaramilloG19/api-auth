export const removeExtension = (filename: string): string => { //  filename = 'get.r.ts'
  return filename.split('.').shift() as string // filename.split('.') = ['get', 'r', 'ts']
}
