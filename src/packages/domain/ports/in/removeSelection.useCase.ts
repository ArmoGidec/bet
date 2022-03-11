import { RemoveSelectionCommand } from './removeSelection.command';

export interface RemoveSelectionUseCase {
  removeSelection(
    removeSelectionCommand: RemoveSelectionCommand,
  ): Promise<boolean>;
}
