import { CardVariant } from '../../../shared/enums/card-variant.enum';

/**
 * Represents one statistics card.
 */
export interface StatisticCard {
  /**
   * Card title.
   */
  readonly title: string;

  /**
   * Display value.
   */
  readonly value: string | number;

  /**
   * PrimeNG icon.
   */
  readonly icon: string;

  /**
   * Visual appearance.
   */
  readonly variant: CardVariant;
}
