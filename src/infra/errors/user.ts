export class UserNotFoundError extends Error {
  constructor(userId: string) {
    super(`User not found with id ${userId}`);
    this.name = 'UserNotFound';
  }
}
