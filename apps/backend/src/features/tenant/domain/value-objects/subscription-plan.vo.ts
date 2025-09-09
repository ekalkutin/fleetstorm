export class SubscriptionPlan {
  private constructor() {}

  public static create(): SubscriptionPlan {
    return new SubscriptionPlan();
  }
}
