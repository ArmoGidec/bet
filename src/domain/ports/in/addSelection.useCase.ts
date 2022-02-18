import { AddSelectionCommand } from "./addSelection.command";

export interface AddSelectionUseCase {
  addSelection(addSelectionCommand: AddSelectionCommand): Promise<boolean>;
}
