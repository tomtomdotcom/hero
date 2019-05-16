export class FoundError extends Error {
  constructor(path: string) {
    super(`Path: ${path} return an error`);
  }

  public get type(): string {
    return 'pathNotFound';
  }
}
